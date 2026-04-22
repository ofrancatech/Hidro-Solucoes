// ======================================
// ALTERNA ENTRE MODO PRINCIPAL E GARAGEM ========================
// ======================================
const modoprincipal = document.getElementById("btmodoprincipal");
const modogaragem = document.getElementById("btmodogaragem");
const botaogaragem = document.getElementById("botaogaragem");
const botaoprincipal = document.getElementById("botaoprincipal");
const statusdaporta = document.getElementById("statusdaporta");

// ==============================
// MUDA PARA GARAGEM ------------
function mudarparagaragem() {
  estabelecimento.publish("arm/0001/envia", "g", {retain: true});

  estabelecimento.on("message", function (topic, message) {
    const mensagemmodo = message.toString();

    if (mensagemmodo === "Garagem") {
      modoprincipal.classList.add("invisivel");
      modogaragem.classList.remove("invisivel");
      botaogaragem.classList.remove("invisivel");
      botaoprincipal.classList.add("invisivel");
      statusdaporta.textContent = "Fechado";
    }
  });
}
modoprincipal.addEventListener("click", mudarparagaragem);
// ==============================
// MUDA PARA PRINCIPAL ----------
function mudaparaprincipal() {
  estabelecimento.publish("arm/0001/envia", "p", {retain: true});

  estabelecimento.on("message", function (topic, message) {
    const mensagemmodo = message.toString();

    if (mensagemmodo === "Principal") {
      modoprincipal.classList.remove("invisivel");
      modogaragem.classList.add("invisivel");
      statusdaporta.textContent = "Aberto";

      if (principalaberta.classList.contains("invisivel")) {
        principalaberta.classList.remove("invisivel");
        principalfechada.classList.add("invisivel");
      }
    }
  });
}
modogaragem.addEventListener("click", mudaparaprincipal);

// ==============================
// ALTERNA O MODO DE ACORDO COM O RETAIN ========================
// ==============================
function alternretain() {
  estabelecimento.on("message", function (topic, message) {
    const mensageminicial = message.toString();

    if (mensageminicial === "Garagem") {
      modoprincipal.classList.add("invisivel");
      modogaragem.classList.remove("invisivel");
      botaogaragem.classList.remove("invisivel");
      botaoprincipal.classList.add("invisivel");
      statusdaporta.textContent = "Fechado";
    }
    if (mensageminicial === "Principal") {
      modoprincipal.classList.remove("invisivel");
      modogaragem.classList.add("invisivel");
      botaogaragem.classList.add("invisivel");
      botaoprincipal.classList.remove("invisivel");
      statusdaporta.textContent = "Aberto";
    }
  });
}
alternretain();

// ==============================
// ABRE E FECHA PORTA (PRINCIPAL) ========================
// ==============================
const principalaberta = document.getElementById("principalaberta");
const principalfechada = document.getElementById("principalfechada");
// ==============================
// FECHA PORTA ------------------
function fecharprincipal() {
  estabelecimento.publish("arm/0001/envia", "F");

  estabelecimento.on("message", function (topic, message) {
    const mensagemprincipal = message.toString();

    if (mensagemprincipal === "Fechada") {
      principalaberta.classList.add("invisivel");
      principalfechada.classList.remove("invisivel");
      statusdaporta.textContent = "Fechado";
    }
  });
}
principalaberta.addEventListener("click", fecharprincipal);
// ==============================
// ABRE PORTA -------------------
function abrirprincipal() {
  estabelecimento.publish("arm/0001/envia", "A");

  estabelecimento.on("message", function (topic, message) {
    const mensagemprincipal = message.toString();

    if (mensagemprincipal === "Aberta") {
      principalaberta.classList.remove("invisivel");
      principalfechada.classList.add("invisivel");
      statusdaporta.textContent = "Aberto";
    }
  });
}
principalfechada.addEventListener("click", abrirprincipal);

// ==============================
// ABRE PORTA (GARAGEM) ========================
// ==============================
const garagemfechada = document.getElementById("garagemfechada");
const garagemaberta = document.getElementById("garagemaberta");

function abrirgaragem() {
  estabelecimento.publish("arm/0001/envia", "G");

  estabelecimento.on("message", function (topic, message) {
    const mensagemgaragem = message.toString();

    if (mensagemgaragem === "Aberta") {
      garagemfechada.classList.remove("visivel");
      garagemaberta.classList.add("visivel");
      statusdaporta.textContent = "Aberto";
    }
    if (mensagemgaragem === "Fechada") {
      garagemfechada.classList.add("visivel");
      garagemaberta.classList.remove("visivel");
      statusdaporta.textContent = "Fechado";
      principalfechada.classList.add("invisivel");
      principalaberta.classList.remove("invisivel");
    }
  });
}
garagemfechada.addEventListener("click", abrirgaragem);

// ==========================
// FUNÇÃO PÂNICO =========================
// ==========================
const divPanico = document.getElementById("armazem");
const som = document.getElementById("sirene");

function alertapanico() {
  divPanico.style.backgroundColor = "var(--laranja)";
  som.play();
  som.loop = true;
}

function pararpanico() {
  divPanico.style.backgroundColor = "var(--azulclaro)";
  som.pause();
  som.currentTime = 0;
}

estabelecimento.on("message", function (topic, message) {
  const mensagempanico = message.toString();

  if (mensagempanico === "Pânico") {
    alertapanico();
  }

  if (mensagempanico === "Aberta") {
    pararpanico();
  }
});
