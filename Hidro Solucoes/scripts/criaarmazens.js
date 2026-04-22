// ====================================================================
// CRIA NOVOS ARMAZÉNS
// ====================================================================
let armazens = JSON.parse(localStorage.getItem("armazens")) || [];

function criarnovoarmazem(armazem) {
  
  const articlearmazens = document.getElementById("article");
  const novoarmazem = document.createElement("div");
  const novodivstatus = document.createElement("div");
  const novostatus = document.createElement("h3");
  const novobotaomodoP = document.createElement("button");
  const novobotaomodoG = document.createElement("button");
  const novonomearmazem = document.createElement("h3");
  const novadivstatusconect = document.createElement("div");
  const novostatusdaporta = document.createElement('h4');
  const novaimagenoff = document.createElement("img");
  const novaimagemon = document.createElement("img");
  const novadivbtprincipal = document.createElement("div");
  const novaimgprincipalaberta = document.createElement("img");
  const novaimgprincipalfechada = document.createElement("img");
  const novadivgaragem = document.createElement("div");
  const novaimggaragemfechada = document.createElement("img");
  const novaimggaragemaberta = document.createElement("img");


  // =======================================================
  // SOLICITA O NOME DO ARMAZÉM AO USUÁRIO
  let nomaarmazem = prompt("Digite o nome do armazém:");
  if (nomaarmazem) {
    novonomearmazem.textContent = nomaarmazem;
  } else {
    novonomearmazem.textContent = "Armazém sem nome";
  }

  if (articlearmazens) {
    novoarmazem.className = "armazem";
    novoarmazem.id = "armazem";

    novodivstatus.className = "divstatus";
    novodivstatus.id = "divstatus";

    novostatus.className = "status";
    novostatus.id = "status";
    novostatus.textContent = "Desconectado";

    novobotaomodoP.className = "btmodoprincipal";
    novobotaomodoP.id = "btmodoprincipal";
    novobotaomodoP.textContent = "Modo Principal";

    novobotaomodoG.className = "btmodogaragem invisivel";
    novobotaomodoG.id = "btmodogaragem";
    novobotaomodoG.textContent = "Modo Garagem";

    novonomearmazem.className = "nomeestabelecimento";
    novonomearmazem.id = "nomeestabelecimento";
    novonomearmazem.textContent = nomaarmazem;

    novadivstatusconect.className = "divwifistatus";

    novostatusdaporta.className = "statusdaporta";
    novostatusdaporta.id = "statusdaporta";
    novostatusdaporta.textContent = "Aberto";


    novaimagenoff.className = "wifistatus";
    novaimagenoff.id = "wifistatusoff";
    novaimagenoff.src = "/Imagens/WiFioff.png";
    novaimagenoff.alt = "wifi";

    novaimagemon.className = "wifistatus invisivel";
    novaimagemon.id = "wifistatuson";
    novaimagemon.src = "/Imagens/WiFion.png";
    novaimagemon.alt = "wifi";

    novadivbtprincipal.className = "botaoprincipal";
    novadivbtprincipal.id = "botaoprincipal";

    novaimgprincipalaberta.className = "principalaberta";
    novaimgprincipalaberta.id = "principalaberta";
    novaimgprincipalaberta.src = "/Imagens/Porta open.png";
    novaimgprincipalaberta.alt = "Porta Aberta";

    novaimgprincipalfechada.className = "principalfechada invisivel";
    novaimgprincipalfechada.id = "principalfechada";
    novaimgprincipalfechada.src = "/Imagens/Porta closed.png";
    novaimgprincipalfechada.alt = "Porta Fechada";

    novadivgaragem.className = "botaogaragem invisivel";

    novaimggaragemfechada.className = "garagemfechada invisivel";
    novaimggaragemfechada.id = "garagemfechada";
    novaimggaragemfechada.src = "/Imagens/Garagem close.png";
    novaimggaragemfechada.alt = "Porta Fechada";

    novaimggaragemaberta.className = "garagemaberta";
    novaimggaragemaberta.id = "garagemaberta";
    novaimggaragemaberta.src = "/Imagens/Garagem open.png";
    novaimggaragemaberta.alt = "Porta Aberta";

    articlearmazens.appendChild(novoarmazem);
    novoarmazem.appendChild(novodivstatus);
    novodivstatus.appendChild(novostatus);
    novoarmazem.appendChild(novobotaomodoP);
    novoarmazem.appendChild(novobotaomodoG);
    novoarmazem.appendChild(novonomearmazem);
    novoarmazem.appendChild(novadivstatusconect);
    novoarmazem.appendChild(novostatusdaporta);
    novadivstatusconect.appendChild(novaimagenoff);
    novadivstatusconect.appendChild(novaimagemon);
    novoarmazem.appendChild(novadivbtprincipal);
    novadivbtprincipal.appendChild(novaimgprincipalaberta);
    novadivbtprincipal.appendChild(novaimgprincipalfechada);
    novoarmazem.appendChild(novadivgaragem);
    novadivgaragem.appendChild(novaimggaragemfechada);
    novadivgaragem.appendChild(novaimggaragemaberta);
  }
}

const apagararmazem = document.getElementById("excluirlocalstorage");
apagararmazem.addEventListener("click", function() {
  localStorage.removeItem("armazens");
  armazens = [];
  renderizararmazens();
})
// ==============================
// CRIAR NOVO ARMAZÉM
// ==============================

function criararmazem() {
  const novoarmazem = {
    id: Date.now(),
    nome: 'Novo armazém',
    // status: "Desconectado",
    // modo: "Principal",
  };
  
  armazens.push(novoarmazem);
  localStorage.setItem("armazens", JSON.stringify(armazens));
  criarnovoarmazem();
}

// ==============================
// RENDERIZAR ARMAZÉNS EXISTENTES
// ============================== 

function renderizararmazens() {
  const articlearmazens = document.getElementById("article");
  articlearmazens.innerHTML = ""; // Limpa o conteúdo existente

  armazens.forEach(armazem => {
    criarnovoarmazem(armazem);
  });
}

renderizararmazens();