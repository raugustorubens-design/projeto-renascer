/* ===============================
   CONFIGURAÇÃO
================================ */
const PLAYER_PATH = "assets/personagens/players";
const TOTAL_PLAYERS = 10;
const STORAGE_KEY = "renascer_player";

/* ===============================
   ESTADO
================================ */
let playerSelecionado = null;
let blocoAtual = 0;

/* ===============================
   DOM
================================ */
const telaPlayer = document.getElementById("tela-player");
const telaVortice = document.getElementById("tela-vortice");
const telaNarrativa = document.getElementById("tela-narrativa");

const container = document.getElementById("players-container");
const iniciarBtn = document.getElementById("iniciarBtn");

const textoNarrativo = document.getElementById("texto-narrativo");
const avancarBtn = document.getElementById("avancarBtn");

/* ===============================
   PLAYERS
================================ */
function carregarPlayers() {
  for (let i = 1; i <= TOTAL_PLAYERS; i++) {
    const img = document.createElement("img");
    img.src = `${PLAYER_PATH}/${String(i).padStart(2, "0")}_${nomeArquivo(i)}.png`;
    img.className = "player-card";
    img.onclick = () => selecionarPlayer(i, img);
    container.appendChild(img);
  }
}

function nomeArquivo(i) {
  const nomes = {
    1: "Giu_jogadora",
    2: "Bi_jogadora",
    3: "Neto_jogador",
    4: "Jack_jogadora",
    5: "Carolina_jogadora",
    6: "vovo_jogador",
    7: "du_jogador",
    8: "douglas_jogador",
    9: "vovo_jogadora",
    10: "leo_jogador"
  };
  return nomes[i];
}

function selecionarPlayer(id, el) {
  document.querySelectorAll(".player-card")
    .forEach(p => p.classList.remove("selecionado"));

  el.classList.add("selecionado");
  playerSelecionado = id;
  iniciarBtn.disabled = false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ id }));
}

/* ===============================
   FLUXO PRINCIPAL
================================ */
iniciarBtn.onclick = () => {
  telaPlayer.classList.add("oculto");
  telaVortice.classList.remove("oculto");

  setTimeout(() => {
    telaVortice.classList.add("oculto");
    telaNarrativa.classList.remove("oculto");
    escreverBloco();
  }, 3000);
};

avancarBtn.onclick = () => {
  blocoAtual++;
  if (blocoAtual < narrativa.length) {
    escreverBloco();
  } else {
    alert("Fim do Prólogo.\nPróxima fase: Python FREE.");
  }
};

/* ===============================
   NARRATIVA CANÔNICA
================================ */
const narrativa = [
`Antes da fragmentação,
o conhecimento era contínuo.

Não havia linguagens separadas,
nem sistemas isolados.
Tudo conversava.`,

`Mas a complexidade cresceu.
E com ela, o caos.

Para conter o colapso,
os Arquitetos criaram estruturas.
Chamaram-nas de Sistemas.`,

`Cada Sistema exigia domínio.
Cada erro cobrava um preço.

Poucos aprenderam.
Muitos desistiram.
Quase todos copiaram.`,

`Com o tempo,
o ato de pensar foi substituído
pelo ato de repetir.`,

`O Projeto Renascer não nasceu
para ensinar comandos.

Ele existe para restaurar
a capacidade de construir,
entender e decidir.`,

`Se você atravessou o Vórtice,
não é por acaso.

A linguagem aguarda.
E ela não perdoa descuido.`
];

/* ===============================
   EFEITO DE ESCRITA
================================ */
function escreverBloco() {
  textoNarrativo.textContent = "";
  avancarBtn.disabled = true;

  let i = 0;
  const texto = narrativa[blocoAtual];

  const intervalo = setInterval(() => {
    textoNarrativo.textContent += texto[i];
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      avancarBtn.disabled = false;
    }
  }, 35);
}

/* ===============================
   BOOT
================================ */
carregarPlayers();
