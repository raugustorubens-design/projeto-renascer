// ===== PERSISTÊNCIA =====
function saveProgress() {
  const state = {
    phase: currentPhase,
    messageIndex,
    spellUnlocked: !document.getElementById("spellArea").classList.contains("hidden"),
    portalOpen: !document.getElementById("portal").classList.contains("hidden")
  };
  localStorage.setItem("renascerProgress", JSON.stringify(state));
}

function loadProgress() {
  const saved = localStorage.getItem("renascerProgress");
  if (!saved) return null;
  return JSON.parse(saved);
}

// ===== FASES E FALAS =====
const phases = [
  {
    messages: [
      "Bem-vindo, aprendiz. Este é o início da sua jornada.",
      "Antes de lançar feitiços, é preciso compreender a lógica da magia.",
      "Quando estiver pronto, tente executar seu primeiro feitiço."
    ]
  }
];

let currentPhase = 0;
let messageIndex = 0;

// ===== INICIALIZAÇÃO =====
const savedState = loadProgress();

if (savedState) {
  currentPhase = savedState.phase;
  messageIndex = savedState.messageIndex;
}

document.getElementById("mageText").innerText =
  phases[currentPhase].messages[messageIndex];

if (savedState?.spellUnlocked) {
  document.getElementById("spellArea").classList.remove("hidden");
  document.getElementById("continueBtn").classList.add("hidden");
  document.getElementById("castBtn").classList.add("hidden");
}

if (savedState?.portalOpen) {
  document.getElementById("portal").classList.remove("hidden");
}

// ===== FLUXO =====
function nextMessage() {
  messageIndex++;

  const messages = phases[currentPhase].messages;

  if (messageIndex < messages.length) {
    document.getElementById("mageText").innerText = messages[messageIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }

  saveProgress();
}

function castSpell() {
  document.getElementById("spellArea").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "Escreva seu feitiço. Observe o resultado com atenção.";
  saveProgress();
}

function evaluateSpell() {
  const spell = document.getElementById("spellInput").value.trim();

  if (spell.length === 0) {
    document.getElementById("mageText").innerText =
      "A magia falhou. Um feitiço vazio não produz efeito.";
    return;
  }

  if (spell.includes("print")) {
    document.getElementById("mageText").innerText =
      "Muito bem. Seu feitiço funcionou. A magia responde à lógica.";
    openPortal();
  } else {
    document.getElementById("mageText").innerText =
      "Algo deu errado. Observe a estrutura do feitiço e tente novamente.";
  }

  saveProgress();
}

function openPortal() {
  document.getElementById("portal").classList.remove("hidden");
  saveProgress();
}

function enterPortal() {
  document.getElementById("mageText").innerText =
    "Você atravessa o vórtice e segue para a próxima etapa da jornada.";
  saveProgress();
}
