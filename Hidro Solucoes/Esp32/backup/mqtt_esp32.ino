#include <WiFi.h>
#include <PubSubClient.h>

#define trava 4

const char* ssid = "FRANCA";
const char* password = "93085622";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

char panico;

// --------------------------------------------------------------- Configurações do WiFi ----------------------
void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Conectando ");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("Conectado a:");
  Serial.println(ssid);
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// ------------------------------------------- Fica verificando se tem mensagem ---
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Comando recebido [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  // --------------------------------- Função para abrir a porta no modo princiapl ---
  if ((char)payload[0] == 'F') {
    digitalWrite(trava, HIGH);
    snprintf(msg, MSG_BUFFER_SIZE, "Fechada");
    Serial.print("A porta foi: ");
    Serial.println(msg);
    client.publish("ECI_Tecnologia/recebe/porta", msg);
  }
  if ((char)payload[0] == 'A') {
    digitalWrite(trava, LOW);
    snprintf(msg, MSG_BUFFER_SIZE, "Aberta");
    Serial.print("A porta foi: ");
    Serial.println(msg);
    client.publish("ECI_Tecnologia/recebe/porta", msg);
  }
  // ---------------------- Função para abrir a porta no modo garagem ---
  if ((char)payload[0] == 'G') {
      digitalWrite(trava, LOW);
      snprintf(msg, MSG_BUFFER_SIZE, "Aberta");
      Serial.print("A porta foi: ");
      Serial.println(msg);
      client.publish("ECI_Tecnologia/recebe/porta", msg);
    }
  }
  // ----------------------- Aciona pânico ---
  if ((char)payload[0] == 'P') {
    snprintf(msg, MSG_BUFFER_SIZE, "Pânico");
    Serial.print("Acionaram o botão ");
    Serial.println(msg);
    client.publish("ECI_Tecnologia/recebe/panico", msg);
  }
}

// -------------------------------------------------------------------- Reconexão ------------------------
void reconnect() {
  // Repita o processo até que a conexão seja restabelecida
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    String clientId = "ECI_Tecnologia_MQTT";
    clientId += String(random(0xffff), HEX);
    // Tentativa de conexão
    if (client.connect(clientId.c_str())) {
      Serial.println(" Sistema conectado");
      client.subscribe("ECI_Tecnologia/envia");
      Serial.print("A conexão falhou, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos.");
      delay(5000);
    }
  }
}

unsigned long duracaoG = 5000;
unsigned long anteriorG;
bool estadoBaixoAtivo = false;

void setup() {
  pinMode(trava, OUTPUT);
  panico = 15;
  pinMode(panico, INPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  // ------------------------ Botão pânico ---
  int estadopanico = digitalRead(panico);

  bool panicoativo = false;
  int tempopanico = 500;
  if (estadopanico == 1) {
    if (digitalRead(trava) == 1) {
      panicoativo = true;
      if (panicoativo == true) {
        client.publish("ECI_Tecnologia/envia", "P");
        panicoativo = false;
        delay(tempopanico);
      }
    }
  }
  // Envia Status conectado -----------------------
  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf(msg, MSG_BUFFER_SIZE, "Conectado", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("ECI_Tecnologia/recebe", msg);
  }
}
