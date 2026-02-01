/* =====================================================
   PROJETO RENASCER — PYTHON FREE
   SCRIPT CANÔNICO (STATE MACHINE)
===================================================== */

/* ===============================
   DEV MODE
================================ */
const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

/* ===============================
   ESTADO GLOBAL
================================ */
const appState = {
  currentScreen: "LANDING",
  selectedPlayer: null,
  currentActIndex: 0,
  acts: [],
  certificationUnlocked: false,
  devMode: DEV_MODE,
  allowDevWrite: false
};

/* ===============================
   REFERÊNCIAS DE TELAS
================================ */
const screens = [
  "landing",
  "characters",
  "journey",
  "quality",
  "certificate",
  "paywall"
];

/* ===============================
   BOOT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

/* ===============================
   INICIALIZAÇÃO
================================ */
function initApp() {
  bindNavigation();
  bindLanding();
  bindCharacters();
  bindCertificate();
  loadJourneyData();
  renderScreen("LANDING");
}

/* ===============================
   CONTROLE DE TELAS
================================ */
function renderScreen(screenName) {
  appState.currentScreen = screenName;

  screens.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("active");
    el.classList.add("hidden");
  });

  const active = document.getElementById(screenName.toLowerCase());
  if (active) {
    active.classList.remove("hidden");
    active.classList.add("active");
  }
}

/* ===============================
   NAVEGAÇÃO
================================ */
function bindNavigation() {
  document.querySelectorAll("#main-nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target").toUpperCase();

      if (appState.devMode) {
        renderScreen(target);
        return;
      }

      if (target === "QUALITY") {
        renderScreen("QUALITY");
      }

      if (target === "JOURNEY" && appState.selectedPlayer) {
        renderScreen("JOURNEY");
      }

      if (target === "CERTIFICATE" && appState.certificationUnlocked) {
        renderScreen("CERTIFICATE");
      }
    });
  });
}

/* ===============================
   LANDING
================================ */
function bindLanding() {
  const btn = document.getElementById("enter-portal-btn");
  btn.addEventListener("click", () => {
    renderScreen("CHARACTERS");
  });
}

/* ===============================
   PERSONAGENS
================================ */
function bindCharacters() {
  const grid = document.getElementById("players-grid");
  const confirmBtn = document.getElementById("confirm-player-btn");

  const players = Array.from({ length: 10 }).map((_, i) => ({
    id: `player_${i + 1}`,
    name: `Jogador ${i + 1}`
  }));

  players.forEach(player => {
    const div = document.createElement("div");
    div.className = "player-card";
    div.textContent = player.name;
    div.addEventListener("click", () => {
      document.querySelectorAll(".player-card").forEach(p =>
        p.classList.remove("selected")
      );
      div.classList.add("selected");
      appState.selectedPlayer = player.id;
      confirmBtn.classList.remove("disabled");
    });
    grid.appendChild(div);
  });

  confirmBtn.addEventListener("click", () => {
    if (!appState.selectedPlayer) return;
    renderScreen("JOURNEY");
    renderAct();
  });
}

/* ===============================
   JORNADA
================================ */
function loadJourneyData() {
  fetch("ato_free.json")
    .then(r => r.json())
    .then(d => {
      appState.acts = d.acts || [];
    });
}

function renderAct() {
  const act = appState.acts[appState.currentActIndex];
  if (!act) {
    unlockCertification();
    return;
  }

  document.getElementById("act-title").textContent = act.title;
  document.getElementById("act-content").textContent = act.text || "";
  document.getElementById("act-steps").innerHTML = "";
  document.getElementById("feedback-area").innerHTML = "";

  act.steps.forEach(step => {
    const div = document.createElement("div");
    div.className = "step";
    div.textContent = step.prompt;
    document.getElementById("act-steps").appendChild(div);
  });

  const advanceBtn = document.getElementById("advance-btn");
  advanceBtn.classList.remove("disabled");

  advanceBtn.onclick = () => {
    if (!appState.devMode) {
      appState.currentActIndex++;
    } else {
      appState.currentActIndex++;
    }
    renderAct();
  };
}

/* ===============================
   CERTIFICAÇÃO
================================ */
function unlockCertification() {
  appState.certificationUnlocked = true;
  renderScreen("QUALITY");
}

function bindCertificate() {
  const btn = document.getElementById("continue-btn");
  btn.addEventListener("click", () => {
    renderScreen("PAYWALL");
  });
}

/* ===============================
   DEV MODE CONTROLES
================================ */
if (DEV_MODE) {
  window.dev = {
    goto(screen) {
      renderScreen(screen.toUpperCase());
    },
    nextAct() {
      appState.currentActIndex++;
      renderAct();
    },
    prevAct() {
      appState.currentActIndex =
        Math.max(0, appState.currentActIndex - 1);
      renderAct();
    },
    allowWrite() {
      appState.allowDevWrite = true;
    }
  };
}
