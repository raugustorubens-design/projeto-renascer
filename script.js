/* ===============================
   CONFIGURAÇÃO
================================ */
const PLAYER_PATH = "assets/personagens/players";
const TOTAL_PLAYERS = 10;
const STORAGE_KEY = "renascer_player_selecionado";

/* ===============================
   ESTADO
================================ */
let playerSelecionado = null;

/* ===============================
   DOM
================================ */
const container = document.getElementById("players-container");
const iniciarBtn = document.getElementById("iniciarBtn");

/* ===============================
   CARREGAR PLAYERS
================================ */
function carregarPlayers() {
  for (let i = 1; i <= TOTAL_PLAYERS; i++) {
    const img = document.createElement("img");

    img.src = `${PLAYER_PATH}/${String(i).padStart(2, "0")}_${nomeArquivo(i)}.png`;
    img.alt = `Player ${i}`;
    img.classList.add("player-card");

    img.onclick = () => selecionarPlayer(i, img);

    container.appendChild(img);
  }
}

/* ===============================
   MAPA DE NOMES
================================ */
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

/* ===============================
   SELEÇÃO
================================ */
function selecionarPlayer(id, elemento) {
  document
    .querySelectorAll(".player-card")
    .forEach(p => p.classList.remove("selecionado"));

  elemento.classList.add("selecionado");

  playerSelecionado = id;
  iniciarBtn.disabled = false;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ id })
  );
}

/* ===============================
   INICIAR JORNADA
================================ */
iniciarBtn.onclick = () => {
  if (!playerSelecionado) return;

  alert(`Player ${playerSelecionado} selecionado.\nA jornada começa agora.`);

  // Próxima fase: vórtice / narrativa / Python FREE
};

/* ===============================
   BOOT
================================ */
carregarPlayers();
