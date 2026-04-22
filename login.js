// ========================================================
// LOGIN
// ========================================================
const credenciais = {
  email: "hidro@gmail.com",
  senha: "1234",
};
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("loginok");
  btn.addEventListener("click", function () {
    validarLogin();
  });
});
function validarLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === credenciais.email && senha === credenciais.senha) {
    window.location.href = "sensores.html";
  } else {
    alert("Acesso negado");
  }
}

// ========================================================
// ALTERNA ENTRE LOGIN E CADASTRO
// ========================================================
const Articlecredenciais = document.getElementById("articlecredenciais");
const Logomarca = document.getElementById("logomarca");
const Divlogin = document.getElementById("divformulariologin");
const Divcadastro = document.getElementById("divformulariocadastro");
const BTescolha1 = document.getElementById("divbotaocadastrar");
const BTescolha2 = document.getElementById("divbotaologin");
const Pergunta = document.getElementById("pergunta");
const Textologin = document.getElementById("textologin");
const Textocadastrar = document.getElementById("textocadastrar");
const Divbotaologin = document.getElementById("divbotaologin");
const Divbotaocadastrar = document.getElementById("divbotaocadastrar");
const Titleacao = document.getElementById("titleacao");
const Botaologinok = document.getElementById("loginok");
const Botaocadastrook = document.getElementById("botaocadastrook");
const Divsobre = document.getElementById("divsobre");

function mudarparacadastro() {
  Logomarca.classList.add("invisivel");
  Articlecredenciais.className = "cadastro";
  Divlogin.classList.add("invisivel");
  Divcadastro.classList.remove("invisivel");
  Pergunta.textContent = "Não é cliente?";
  // Pergunta.classList.add('invisivel');
  Titleacao.textContent = "Cadastre-se";
  Textologin.className = "txinativo";
  Textocadastrar.className = "txativo";
  Divbotaologin.className = "inativo";
  Divbotaocadastrar.className = "ativo";
  Botaologinok.classList.add("invisivel");
  Botaocadastrook.classList.remove("invisivel");
  Divsobre.classList.add("invisivel");
}
BTescolha1.addEventListener("click", mudarparacadastro);

function mudarparalogin() {
  Logomarca.classList.remove("invisivel");
  Articlecredenciais.className = "login";
  Divlogin.classList.remove("invisivel");
  Divcadastro.classList.add("invisivel");
  Pergunta.textContent = "Já é nosso cliente?";
  // Pergunta.classList.remove('invisivel');
  Titleacao.textContent = "Faça login";
  Textologin.className = "txativo";
  Textocadastrar.className = "txinativo";
  Divbotaologin.className = "ativo";
  Divbotaocadastrar.className = "inativo";
  Botaologinok.classList.remove("invisivel");
  Botaocadastrook.classList.add("invisivel");
  Divsobre.classList.remove("invisivel");
}
BTescolha2.addEventListener("click", mudarparalogin);
// ========================================================
// VAI PARA A TELA SOBRE NÓS
// ========================================================
const botaosobre = document.getElementById("psobre");
function sobre() {
  window.location.href = "sobre.html";
  console.log("SOBRE");
}
botaosobre.addEventListener("click", sobre);
