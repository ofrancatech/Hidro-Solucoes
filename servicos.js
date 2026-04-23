const botaozap = document.getElementById('whatsapp')

function chamarwhatsapp() {
  var telefone = "5509891798219";
  var mensagem = "Olá, gostaria de saber mais ou contrtar o serviço.";
  var url = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);
  window.location.href = url;
}
botaozap.addEventListener('click', chamarwhatsapp);