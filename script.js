/* =====================================================
   PROJETO RENASCER — PYTHON FREE
   SCRIPT.JS — MÁQUINA DE ESTADOS CANÔNICA
===================================================== */

/* ===============================
   DEV MODE
================================ */
const DEV_MODE =
  new URLSearchParams(window.location.search).get("dev") === "true";

/* ===============================
   ESTADO GLOBAL
================================ */
const state = {
  mode: DEV_MODE ? "dev" : "student",
  screen: "LANDING",
  player: null,
  actIndex: 0,
  acts: [],
};

/* ===============================
   MAPA DE TELAS
================================ */
const SCREENS = [
  "landing",
  "character-select",
  "journey",
  "quality",
  "certificate",
  "paywall",
];

/* ===============================
   BOOT
================================ */
document.addEventListener("DOMContentLoaded", init);

/* ===============================
   INIT
================================ */
function init() {
  bindGlobalUI();
  loadActs();
  if (DEV_MODE) enableDevMode();
  goTo("LANDING");
}

/* ===============================
   CONTROLE DE TELAS
================================ */
function goTo(target) {
  if (!isValidState(target)) {
    console.warn("Estado inválido:", target);
    target = "LANDING";
  }

  state.screen = target;

  SCREENS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("active");
    el.classList.add("hidden");
  });

  const active = document.getElementById(target.toLowerCase());
  if (active) {
    active.classList.remove("hidden");
    active.classList.add("active");
  }

  updateNav();
}

/* ===============================
   VALIDAÇÃO DE ESTADO
================================ */
function isValidState(stateName) {
  return [
    "LANDING",
    "CHARACTER_SELECT",
    "JOURNEY",
    "QUALITY",
    "CERTIFICATE",
    "PAYWALL",
  ].includes(stateName);
}

/* ===============================
   HEADER / NAV
================================ */
function bindGlobalUI() {
  document.querySelectorAll("#main-nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target.toUpperCase();

      if (state.mode === "dev") {
        goTo(target);
        return;
      }

      if (target === "QUALITY") goTo("QUALITY");
      if (target === "JOURNEY" && state.player) goTo("JOURNEY");
      if (target === "CERTIFICATE" && journeyCompleted())
        goTo("CERTIFICATE");
    });
  });

  document
    .getElementById("enter-portal-btn")
    .addEventListener("click", () => {
      goTo("CHARACTER_SELECT");
    });

  document
    .getElementById("certificate-continue-btn")
    .addEventListener("click", () => {
      goTo("PAYWALL");
    });
}

/* ===============================
   PERSONAGENS
================================ */
function renderCharacters() {
  const grid = document.getElementById("character-grid");
  const confirm = document.getElementById("confirm-character-btn");

  grid.innerHTML = "";
  confirm.classList.add("disabled");

  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.className = "player-card";
    card.textContent = `Jogador ${i}`;

    card.onclick = () => {
      document
        .querySelectorAll(".player-card")
        .forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      state.player = i;
      confirm.classList.remove("disabled");
    };

    grid.appendChild(card);
  }

  confirm.onclick = () => {
    if (!state.player) return;
    goTo("JOURNEY");
    renderJourney();
  };
}

/* ===============================
   JORNADA
================================ */
function loadActs() {
  fetch("ato_free.json")
    .then((r) => r.json())
    .then((data) => {
      state.acts = data.acts || [];
    })
    .catch(() => {
      state.acts = [];
    });
}

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

/* ===============================
   CERTIFICAÇÃO
================================ */
function journeyCompleted() {
  return state.actIndex >= state.acts.length;
}

/* ===============================
   NAV UPDATE
================================ */
function updateNav() {
  if (state.screen === "CHARACTER_SELECT") renderCharacters();
  if (state.screen === "JOURNEY") renderJourney();
}

/* ===============================
   DEV MODE
================================ */
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
