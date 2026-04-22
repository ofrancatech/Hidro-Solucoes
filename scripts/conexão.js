// ==============================
// 1. CONEXÃO MQTT
// ==============================
const BrokerECItec = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
const estabelecimento = BrokerECItec;


// ==============================
// 2. CONEXÃO AO BROKER
// ==============================
const wifioff = document.getElementById("WifiStatusOff");
const wifion = document.getElementById("WifiStatusOn");

function BrokerConectado() {
  wifioff.classList.add("invisivel");
  wifion.classList.remove("invisivel");
}

function BrokerDesconectado() {
  wifioff.classList.remove("invisivel");
  wifion.classList.add("invisivel");
}

estabelecimento.on("connect", BrokerConectado);
["close", "offline", "error"].forEach((evt) => {
  estabelecimento.on(evt, BrokerDesconectado);
});

window.addEventListener("offline", BrokerDesconectado);
window.addEventListener("online", () => {
  BrokerConectado();
});


// ==============================
// 3. EVENTOS DE MENSAGEM
// ==============================
const exibestatus = document.getElementById("status");
const DiivStatus = document.getElementById("divstatus");

var timerOffline = null;
const TEMPO_MAX_SEM_MSG = 3000; // 3 segundos

estabelecimento.on("message", function (topic, message) {
  mensagemrecebida = message.toString();
  console.log(mensagemrecebida);

  // Sempre que receber mensagem, reseta o timer
  resetarTimerOffline();

  // Atualiza status imediatamente
  verificarStatus();
});

function resetarTimerOffline() {
  if (timerOffline) {
    clearTimeout(timerOffline);
  }

  timerOffline = setTimeout(() => {
    esp32Desconectada();
  }, TEMPO_MAX_SEM_MSG);
}

function verificarStatus() {
  if (mensagemrecebida === "Conectado") {
    exibestatus.textContent = "Conectado";
    DiivStatus.style.backgroundColor = "#31ff3f";
  }
}

function esp32Desconectada() {
  mensagemrecebida = null;
  exibestatus.textContent = "Desconectado";
  DiivStatus.style.backgroundColor = "#ff3131";
}
setInterval(() => {
  if (mensagemrecebida === "Conectado") {
    exibestatus.textContent = "Conectado";
    DiivStatus.style.backgroundColor = "#31ff3f";
  }
}, 1000);


// ==============================
// 4. SUBSCRIÇÕES (TÓPICOS)
// ==============================

// Tópico: Porta
estabelecimento.subscribe("arm/0001/recebe/porta", function (err) {
  if (!err) {
    // console.log("Inscrito no tópico porta!");
  }
});

// Tópico: Botão de pânico
estabelecimento.subscribe("arm/0001/recebe/panico", function (err) {
  if (!err) {
    // console.log("Inscrito no tópico pânico!");
  }
});

// Tópico: Status
estabelecimento.subscribe("arm/0001/recebe/status", function (err) {
  if (!err) {
    // console.log("Inscrito no tópico status!");
  }
});
