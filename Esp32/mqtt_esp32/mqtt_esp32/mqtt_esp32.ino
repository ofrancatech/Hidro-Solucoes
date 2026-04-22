#include <WiFi.h>
#include <PubSubClient.h>
#define LED 2
#define Sensor 15

const char* ssid = "Felipesantox_";
const char* password = "Fe280820@@";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

// =========================================
// Configurações do WiFi
// =========================================
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

// =========================================
// FICA VERIFICANDO SE TEM MENSAGEM
// =========================================
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Comando recebido [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // =========================================
  // FUNÇÃO PARA O DASHBOARD
  // =========================================
  if ((char)payload[0] == 'u') {
    snprintf(msg, MSG_BUFFER_SIZE, "Umidade");
    Serial.print("Umidade detectada ");
    Serial.println(msg);
    client.publish("arm/0001/recebe/panico", msg);
  }
}

// =========================================
// RECONEXÃO
// =========================================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    String clientId = "ECI_Tecnologia_MQTT";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println(" Sistema conectado");
      //client.subscribe("arm/0001/envia");
      Serial.print("A conexão falhou, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos.");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(Sensor, INPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

}
// =========================================
// LED POWER
// =========================================
long inicioTimeLED = 0;
long IntervaloLED = 200;
void ledpower() {
  if (millis() - inicioTimeLED >= IntervaloLED) {
    inicioTimeLED = millis();
    digitalWrite(LED, !digitalRead(LED));
  }
}
void loop() {
  ledpower();
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // =========================================
  // BOTÃO PÂNICO
  // =========================================
  int estadoSensor = digitalRead(Sensor);

  bool sensorativo = false;
  
  long inicioTimesensor = 0;
  long intervalosensor = 500;

  if (estadoSensor == 1) {
      sensorativo = true;
      if (sensorativo == true) {
        if (millis() - inicioTimesensor >= intervalosensor) {
          inicioTimesensor = millis();
          client.publish("arm/0001/envia", "U");
          sensorativo = false;
        }
        
      }
  }

  // =========================================
  // ENVIA STATUS DE CONEXÃO
  // =========================================
  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf(msg, MSG_BUFFER_SIZE, "Conectado", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("arm/0001/recebe/status", msg);
  }
}