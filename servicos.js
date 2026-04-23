const botaozap = document.getElementById('whatsapp')

function chamarwhatsapp() {
  var telefone = "5509885759009";
  var mensagem = "Olá, gostaria de saber mais e contratar o serviço.";
  var url = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);
  window.location.href = url;
}
botaozap.addEventListener('click', chamarwhatsapp);