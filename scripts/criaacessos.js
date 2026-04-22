// ------------------------------ ESTE BLOCO É REFERENTE À TELA DOS ACESSOS ---------------------------
// ==============================
// CONTROLE DE MENU LATERAL
// ==============================
const abremenu = document.getElementById("abremenuacesso");
const fechamenu = document.getElementById("fechamenuacesso");
const asidemenu = document.getElementById("asidemenuacesso");

function AbrirMenu() {
  abremenu.classList.add("invisivel");
  fechamenu.classList.remove("invisivel");
  asidemenu.classList.remove("invisivel");
}

function FecharMenu() {
  abremenu.classList.remove("invisivel");
  fechamenu.classList.add("invisivel");
  asidemenu.classList.add("invisivel");
}

if (abremenu && fechamenu && asidemenu) {
  abremenu.addEventListener("click", AbrirMenu);
  fechamenu.addEventListener("click", FecharMenu);
}

// ==============================
// ABA: CRIAR NOVO ACESSO
// ==============================
const abacria = document.getElementById("asidecriaacesso");
const asideacessos = document.getElementById("asideacessos");
const novoacesso = document.getElementById("criaracesso");
const numacesso = document.getElementById("numacesso");

function abrircriaacesso() {
  abacria.classList.remove("invisivel");
  abremenu.classList.remove("invisivel");
  fechamenu.classList.add("invisivel");
  asidemenu.classList.add("invisivel");
  asideacessos.classList.add("invisivel");
  numacesso.textContent = acessos.length + 1 + " ?";
}

if (novoacesso) {
  novoacesso.addEventListener("click", abrircriaacesso);
}

// ==============================
// FECHAR ABA CRIAR ACESSO
// ==============================
const botaoconfirma = document.getElementById("botaoconfirma");

function fecharabacria() {
  abacria.classList.add("invisivel");
  asideacessos.classList.remove("invisivel");
}

if (botaoconfirma) {
  botaoconfirma.addEventListener("click", function () {
    criaracesso();
    fecharabacria();
  });
}
// ==============================
// DADOS DE ACESSOS (LOCALSTORAGE)
// ==============================




























// ==============================
// CRIA BOTÃO DE ACESSO
// ==============================
let acessos = JSON.parse(localStorage.getItem("acessos")) || [];
function criarBotaoAcesso(acesso) {
  // ===================================================================
  // CRIA BOTÃO DO ACESSO ----------------------------------------------
  const teladeacessos = document.getElementById("teladeacessos");
  const divacessos = document.getElementById("divacesso");
  const botao = document.createElement("button");

  botao.className = "novoacesso";
  botao.textContent = acesso.nome;

  divacessos.appendChild(botao);
  divacessos.appendChild(document.createElement("br"));
  console.log(acesso.nome);

  // ====================================================================
  // CRIA TELA DO ACESSO ------------------------------------------------
  const dom = document.body;
  const novatela = document.createElement("section");
  const novocabecalho = document.createElement("header");
  const novotitulotela = document.createElement("h1");
  const novaimagemabremenu = document.createElement("img");
  const novaimagemfechamenu = document.createElement("img");
  const novoarticle = document.createElement("article");
  const novoasidemenu = document.createElement("aside");
  const botaoaddarmazem = document.createElement("button");
  const novovoltar = document.createElement("img");

  novatela.className = "modeloacesso invisivel";
  novatela.id = "modeloacesso";

  novocabecalho.className = "cabecalho";
  novocabecalho.id = "cabecalho";

  novotitulotela.className = "titulodatela";
  novotitulotela.id = "titulodatela";
  novotitulotela.textContent = acesso.nome;

  novaimagemabremenu.className = "abremenu";
  novaimagemabremenu.id = "abremenutela";
  novaimagemabremenu.src = "/Imagens/Menu.png";
  novaimagemabremenu.alt = "menu";

  novaimagemfechamenu.className = "fechamenu invisivel";
  novaimagemfechamenu.id = "fechamenutela";
  novaimagemfechamenu.src = "/Imagens/fechar menu.png";
  novaimagemfechamenu.alt = "menu";

  novoasidemenu.className = "asidemenu invisivel";
  novoasidemenu.id = "asidemenucadaacesso";

  botaoaddarmazem.className = "botaomenu";
  botaoaddarmazem.id = "cadastrararmazem";
  botaoaddarmazem.textContent = "Novo Armazém";

  novoarticle.className = "article invisivel";
  novoarticle.id = "article";

  novovoltar.className = "botaovoltar";
  novovoltar.id = "botaovoltar";
  novovoltar.src = "/Imagens/Voltar.png";
  novovoltar.alt = "voltar";

  dom.appendChild(novatela);
  novatela.appendChild(novocabecalho);
  novocabecalho.appendChild(novovoltar);
  novocabecalho.appendChild(novotitulotela);
  novocabecalho.appendChild(novaimagemabremenu);
  novocabecalho.appendChild(novaimagemfechamenu);
  novatela.appendChild(novoasidemenu);
  novoasidemenu.appendChild(botaoaddarmazem);
  novatela.appendChild(novoarticle);

  // ====================================================================
  // CLICK DO BOTÃO DE CADA ACESSO -----------------
  botao.addEventListener("click", () => {
    console.log("Clicou em:", acesso.nome);
    console.log("ID:", acesso.id);

    if (novatela) {
      novatela.classList.remove("invisivel");
      teladeacessos.classList.add("invisivel");
      FecharMenu();
    }
  });

  // ====================================================================
  // VOLTAR -----------------
  novovoltar.addEventListener("click", function () {
    novatela.classList.add("invisivel");
    teladeacessos.classList.remove("invisivel");
  });

  // ------------------------------ ESTE BLOCO É REFERENTE A TELA DE CADA ACESSO ---------------------------
  // ====================================================================
  // ABRE ABA MENU DE CADA ACESSO -----------------
  novaimagemabremenu.addEventListener("click", () => {
    if (novaimagemabremenu && novaimagemfechamenu && novoasidemenu) {
      novaimagemabremenu.classList.add("invisivel");
      novaimagemfechamenu.classList.remove("invisivel");
      novoasidemenu.classList.remove("invisivel");
    }
  });

  // ====================================================================
  // FECHA ABA MENU DE CADA ACESSO -----------------
  novaimagemfechamenu.addEventListener("click", () => {
    if (novaimagemabremenu && novaimagemfechamenu && novoasidemenu) {
      novaimagemabremenu.classList.remove("invisivel");
      novaimagemfechamenu.classList.add("invisivel");
      novoasidemenu.classList.add("invisivel");
    }
  });

  // ====================================================================
  // BOTÃO PARA CRIAR ARMAZÉN -----------------
  if (botaoaddarmazem) {
    botaoaddarmazem.addEventListener("click", function (){
      criarnovoarmazem();
      // criararmazem();
      novoasidemenu.classList.add("invisivel");
      novaimagemabremenu.classList.remove("invisivel");
      novaimagemfechamenu.classList.add("invisivel");
    });
  }
}


// ==============================
// CRIAR NOVO ACESSO
// ==============================

function criaracesso() {
  const novoAcesso = {
    id: Date.now(),
    nome: "Acesso " + (acessos.length + 1)
  };

  acessos.push(novoAcesso);
  localStorage.setItem("acessos", JSON.stringify(acessos));

  criarBotaoAcesso(novoAcesso);
}


// ==============================
// ATUALIZA VISIBILIDADE DO CONTAINER DOS ACESSOS
// ==============================

function atualizarVisibilidadecontaineracessos() {
  if (acessos.length > 0) {
    asideacessos.classList.remove("invisivel");
  } else {
    asideacessos.classList.add("invisivel");
  }
}

// ==============================
// CANCELAR CRIAÇÃO
// ==============================

const cancelar = document.getElementById("botaocancela");

function botaocancela() {
  abacria.classList.add("invisivel");

  if (acessos.length === 0) {
    asideacessos.classList.add("invisivel");
  } else {
    asideacessos.classList.remove("invisivel");
  }
}

if (cancelar) {
  cancelar.addEventListener("click", botaocancela);
}

// ==============================
// OCULTA ASIDE ACESSOS SE < 1
// ==============================
function ocultaaside() {
  if (acessos.length < 1) {
    asideacessos.classList.add("invisivel");
  }
}
// ==============================
// EXCLUIR UM ACESSO
// ==============================
const botaoexcluir = document.getElementById("excluiracesso");

function excluirAcesso(id) {
  acessos = acessos.filter((a) => a.id !== id);
  localStorage.setItem("acessos", JSON.stringify(acessos));
  renderizarAcessos();
}

function excluirPorPrompt() {
  if (acessos.length > 0) {
    const nome = prompt(
      "Digite o nome do acesso que deseja excluir (ex: Acesso 1):",
    );

    if (nome === null) {
      FecharMenu();
      return;
    }

    if (nome.trim() === "") {
      alert("Digite um nome válido.");
      return;
    }

    const acessoExiste = acessos.find((a) => a.nome === nome);

    if (!acessoExiste) {
      alert("Acesso não encontrado.");
      FecharMenu();
      return;
    }

    const confirmar = confirm(`Deseja realmente excluir "${nome}"?`);

    if (!confirmar) return;

    acessos = acessos.filter((a) => a.nome !== nome);
    localStorage.setItem("acessos", JSON.stringify(acessos));
    renderizarAcessos();

    alert("Acesso excluído com sucesso.");
    asidemenu.classList.add("invisivel");
    fechamenu.classList.add("invisivel");
    abremenu.classList.remove("invisivel");
    ocultaaside();
  } else {
    alert("Não há aceso para excluir.");
    FecharMenu();
  }
}

botaoexcluir.addEventListener("click", excluirPorPrompt);

// ==============================
// EXCLUIR TODOS OS ACESSOS
// ==============================

const apagatodosacessos = document.getElementById("excluiracessos");
function excluirtodosacessos() {
  localStorage.clear();
  asideacessos.classList.add("invisivel");
  FecharMenu();
}
apagatodosacessos.addEventListener("click", function () {
  if (acessos.length > 0) {
    const confirmar = confirm("Deseja realmente excluir todos os acessos?");
    excluirtodosacessos();
    window.location.reload();
  } else {
    alert("Não há acessos para excluir.");
    FecharMenu();
  }
});

// ==============================
// RENDERIZAR TODOS OS ACESSOS
// ==============================

function renderizarAcessos() {
  const dentrode = document.getElementById("divacesso");
  dentrode.innerHTML = "";

  acessos.forEach((acesso) => {
    criarBotaoAcesso(acesso);
  });

  
}

renderizarAcessos();
atualizarVisibilidadecontaineracessos();