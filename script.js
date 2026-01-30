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
    intro: [
      "Bem-vindo, aprendiz.",
      "Aqui, cada comando é um feitiço.",
      "Abra o grimório e experimente manifestar algo."
    ]
  }
];

let currentPhase = 0;
let messageIndex = 0;

// ===== INIT =====
const saved = loadProgress();
if (saved) {
  currentPhase = saved.phase;
  messageIndex = saved.messageIndex;
}

document.getElementById("spellTitle").innerText = phases[currentPhase].title;
document.getElementById("mageText").innerText =
  phases[currentPhase].intro[messageIndex];

// ===== FLUXO =====
function nextMessage() {
  messageIndex++;

  if (messageIndex < phases[currentPhase].intro.length) {
    document.getElementById("mageText").innerText =
      phases[currentPhase].intro[messageIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }

  saveProgress();
}

function castSpell() {
  document.getElementById("ide").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "Escreva seu feitiço e observe a resposta da magia.";
}

// ===== IDE SIMULADA =====
function runCode() {
  const code = document.getElementById("codeInput").value.trim();
  const consoleOut = document.getElementById("consoleOutput");
  consoleOut.textContent = "";

  if (!code) {
    mageError("Um grimório vazio não produz magia.");
    return;
  }

  // Simulação básica de Python
  if (code.startsWith("print")) {
    const content = code.match(/\((.*)\)/);
    consoleOut.textContent = content ? content[1].replace(/['"]/g, "") : "";
    mageSuccess("Muito bem. A magia respondeu ao seu comando.");
  } else if (code.includes("=")) {
    mageError("Variáveis foram criadas, mas nada foi manifestado.");
  } else {
    mageError("A sintaxe do feitiço não é reconhecida.");
  }
}

function mageSuccess(text) {
  document.getElementById("mageText").innerText = text;
  document.getElementById("portal").classList.remove("hidden");
}

function mageError(text) {
  document.getElementById("mageText").innerText = text;
}

// ===== PORTAL =====
function enterPortal() {
  document.getElementById("mageText").innerText =
    "Você domina este feitiço. O portal se fecha atrás de você.";
  localStorage.removeItem("renascerProgress");
}
