/* =====================================================
   PROJETO RENASCER — PYTHON FREE
   SCRIPT.JS — MÁQUINA DE ESTADOS CANÔNICA CORRIGIDA
===================================================== */

#1. Inicialização e Estado Global
const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

const state = {
  mode: DEV_MODE ? "dev" : "student",
  screen: "LANDING",
  player: null,
  actIndex: 0,
  acts: [],
};

const SCREEN_MAP = {
  LANDING: "landing",
  CHARACTER_SELECT: "character-select",
  JOURNEY: "journey",
  QUALITY: "quality",
  CERTIFICATE: "certificate",
  PAYWALL: "paywall",
};

#2. Controle de Telas (goTo)
function goTo(target) {
  if (!SCREEN_MAP[target]) {
    console.warn("Estado inválido:", target);
    target = "LANDING";
  }
  state.screen = target;
  Object.values(SCREEN_MAP).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("active");
    el.classList.add("hidden");
  });
  const activeId = SCREEN_MAP[target];
  const activeEl = document.getElementById(activeId);
  if (activeEl) {
    activeEl.classList.remove("hidden");
    activeEl.classList.add("active");
  }
  updateNav();
}
#3. Seleção de Personagem
function renderCharacters() {
  const grid = document.getElementById("character-grid");
  const confirm = document.getElementById("confirm-character-btn");
  grid.innerHTML = "";
  confirm.classList.add("disabled");
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.className = "player-card";
     const img = document.createElement("img");
img.src = `assets/characters/players/0${i}_jogador.png`;
card.appendChild(img);
    card.textContent = `Jogador ${i}`;
    card.onclick = () => {
      document.querySelectorAll(".player-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      state.player = i;
      confirm.classList.remove("disabled");
    };
    grid.appendChild(card);
  }
  confirm.onclick = () => {
    if (!state.player) return;
    goTo("JOURNEY");
    state.actIndex = 0;
    renderJourney();
  };
}

#4. Jornada (Ato e Avançar)
function renderJourney() {
  const title = document.getElementById("journey-title");
  const content = document.getElementById("journey-content");
  const nextBtn = document.getElementById("journey-next-btn");

  if (!state.acts[state.actIndex]) {
    goTo("CERTIFICATE");
    return;
  }

  const act = state.acts[state.actIndex];
  title.textContent = act.title || "Ato";
  content.textContent = act.text || "Conteúdo em construção.";

  nextBtn.classList.remove("disabled");
  nextBtn.onclick = () => {
    state.actIndex++;
    renderJourney();
  };
}

#5. Certificação e Modo Desenvolvedor
function journeyCompleted() {
  return state.actIndex >= state.acts.length;
}

function updateNav() {
  if (state.screen === "CHARACTER_SELECT") renderCharacters();
  if (state.screen === "JOURNEY") renderJourney();
}

function enableDevMode() {
  const devBadge = document.getElementById("dev-indicator");
  if (devBadge) devBadge.classList.remove("hidden");

  window.dev = {
    goto(screen) {
      goTo(screen.toUpperCase());
    },
    nextAct() {
      state.actIndex++;
      renderJourney();
    },
    prevAct() {
      state.actIndex = Math.max(0, state.actIndex - 1);
      renderJourney();
    },
    state,
  };
}
