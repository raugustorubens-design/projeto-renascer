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
   FLUXO
================================ */
iniciarBtn.onclick = () => {
  telaPlayer.classList.add("oculto");
  telaVortice.classList.remove("oculto");

  setTimeout(() => {
    telaVortice.classList.add("oculto");
    telaNarrativa.classList.remove("oculto");
    escreverTexto(narrativaTexto);
  }, 3000);
};

avancarBtn.onclick = () => {
  alert("Próxima fase: Python FREE");
};

/* ===============================
   NARRATIVA
================================ */
const narrativaTexto = `
Quando o mundo perdeu sua linguagem,
o conhecimento foi fragmentado.

Os antigos criadores selaram o saber
em estruturas chamadas Sistemas.

Poucos conseguem atravessar o Vórtice.
Menos ainda retornam com domínio.

Hoje, você foi chamado.

Não como aluno.
Mas como arquiteto do próprio renascer.
`;

/* ===============================
   EFEITO DE ESCRITA
================================ */
function escreverTexto(texto) {
  textoNarrativo.textContent = "";
  let i = 0;

  const intervalo = setInterval(() => {
    textoNarrativo.textContent += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, 35);
}

/* ===============================
   BOOT
================================ */
carregarPlayers();
