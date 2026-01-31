// ===============================
// PROJETO RENASCER — SCRIPT CANÔNICO
// ===============================

// --------- NAVEGAÇÃO ---------
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("nav button");
  const tabs = document.querySelectorAll(".tab");

  function closeAllTabs() {
    tabs.forEach(tab => tab.classList.remove("active"));
  }

  function openTab(id) {
    closeAllTabs();
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      if (tab === "qualidade") {
        const ok = confirm(
          "Área de Qualidade, Ética e Compliance.\n\n" +
          "Este conteúdo é informativo e não interfere no progresso.\n\n" +
          "Deseja abrir?"
        );
        if (!ok) return;
      }

      openTab(tab);
    });
  });

  openTab("inicio");
});


// --------- ESTADO GLOBAL ---------
const gameState = {
  version: "1.0.0",
  mode: "FREE",
  portalLocked: true,
  player: {
    id: null,
    name: null,
    createdAt: null
  },
  progress: {
    python: {
      introCompleted: false,
      basicCompleted: false
    }
  }
};


// --------- PERSISTÊNCIA ---------
function saveState() {
  localStorage.setItem("renascer_state", JSON.stringify(gameState));
}

function loadState() {
  const saved = localStorage.getItem("renascer_state");
  if (saved) {
    Object.assign(gameState, JSON.parse(saved));
  } else {
    initializePlayer();
    saveState();
  }
}

function initializePlayer() {
  gameState.player.id = crypto.randomUUID();
  gameState.player.createdAt = new Date().toISOString();
  gameState.player.name = "Aprendiz";
}


// --------- PORTAL LOCK ---------
function canAccessPortal() {
  return gameState.progress.python.basicCompleted === true;
}


// --------- COMPLIANCE INVISÍVEL ---------
const validationState = {
  explanationViewed: false,
  level2Passed: false,
  level3Passed: false,
  level1Passed: false
};

function canAttemptLevel(level) {
  if (!validationState.explanationViewed) return false;
  if (level === 2) return true;
  if (level === 3) return validationState.level2Passed;
  if (level === 1) return validationState.level2Passed && validationState.level3Passed;
  return false;
}

function registerSuccess(level) {
  if (level === 2) validationState.level2Passed = true;
  if (level === 3) validationState.level3Passed = true;
  if (level === 1) {
    validationState.level1Passed = true;
    gameState.progress.python.basicCompleted = true;
  }
  saveState();
}


// --------- ERRO CONSCIENTE ---------
const learningState = {
  attempts: 0,
  lastError: null,
  consciousErrorValidated: false
};

function registerAttempt(isCorrect, error = null) {
  learningState.attempts++;
  if (!isCorrect) {
    learningState.lastError = error;
    learningState.consciousErrorValidated = false;
  }
  saveState();
}

function validateConsciousError(text) {
  if (!learningState.lastError) return false;
  if (text && text.length > 30) {
    learningState.consciousErrorValidated = true;
    saveState();
    return true;
  }
  return false;
}


// --------- FEATURES FUTURAS BLOQUEADAS ---------
const grimorio = { enabled: false };
const ideSimulator = { enabled: false };

function enablePremiumFeatures() {
  if (gameState.mode !== "PREMIUM") return false;
  grimorio.enabled = true;
  ideSimulator.enabled = true;
  return true;
}


// --------- INIT ---------
loadState();
