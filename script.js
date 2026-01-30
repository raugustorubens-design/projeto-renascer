// ===== PERSISTÊNCIA =====
function saveProgress() {
  localStorage.setItem("renascerProgress", JSON.stringify({
    phase: currentPhase,
    messageIndex
  }));
}

function loadProgress() {
  const saved = localStorage.getItem("renascerProgress");
  return saved ? JSON.parse(saved) : null;
}

// ===== FASES =====
const phases = [
  {
    title: "Feitiço do Aprendiz",
    successKeyword: "print",
    messages: [
      "Bem-vindo, aprendiz. Este é o início da sua jornada.",
      "A magia nasce da lógica, não do acaso.",
      "Experimente manifestar algo no mundo."
    ]
  },
  {
    title: "Feitiço da Variável",
    successKeyword: "=",
    messages: [
      "Você avançou. Agora controlará valores.",
      "Variáveis são recipientes de poder.",
      "Tente criar e atribuir um valor."
    ]
  },
  {
    title: "Feitiço da Decisão",
    successKeyword: "if",
    messages: [
      "A magia agora exige escolhas.",
      "Nem todo caminho deve ser seguido.",
      "Experimente decidir algo com sabedoria."
    ]
  }
];

let currentPhase = 0;
let messageIndex = 0;

// ===== INICIALIZAÇÃO =====
const saved = loadProgress();
if (saved) {
  currentPhase = saved.phase;
  messageIndex = saved.messageIndex;
}

renderPhase();

// ===== FUNÇÕES =====
function renderPhase() {
  document.getElementById("spellTitle").innerText = phases[currentPhase].title;
  document.getElementById("mageText").innerText =
    phases[currentPhase].messages[messageIndex];

  document.getElementById("spellArea").classList.add("hidden");
  document.getElementById("portal").classList.add("hidden");
  document.getElementById("continueBtn").classList.remove("hidden");
  document.getElementById("castBtn").classList.add("hidden");
}

function nextMessage() {
  messageIndex++;

  if (messageIndex < phases[currentPhase].messages.length) {
    document.getElementById("mageText").innerText =
      phases[currentPhase].messages[messageIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }

  saveProgress();
}

function castSpell() {
  document.getElementById("spellArea").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "Concentre-se. Lance o feitiço corretamente.";
}

function evaluateSpell() {
  const input = document.getElementById("spellInput").value;

  if (input.includes(phases[currentPhase].successKeyword)) {
    document.getElementById("mageText").innerText =
      "Muito bem. A magia respondeu ao seu comando.";
    openPortal();
  } else {
    document.getElementById("mageText").innerText =
      "A magia falhou. Reflita e tente novamente.";
  }
}

function openPortal() {
  document.getElementById("portal").classList.remove("hidden");
}

function enterPortal() {
  currentPhase++;
  messageIndex = 0;

  if (currentPhase >= phases.length) {
    document.getElementById("mageText").innerText =
      "Você concluiu este ciclo de aprendizado.";
    document.getElementById("portal").classList.add("hidden");
    localStorage.removeItem("renascerProgress");
    return;
  }

  saveProgress();
  renderPhase();
}
