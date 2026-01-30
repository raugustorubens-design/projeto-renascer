const messages = [
  "Bem-vindo, aprendiz.",
  "Aqui, cada comando é um feitiço.",
  "Quando errar, consulte o Grimório da Linguagem."
];

let msgIndex = 0;

document.getElementById("mageText").innerText = messages[msgIndex];

function nextMessage() {
  msgIndex++;
  if (msgIndex < messages.length) {
    document.getElementById("mageText").innerText = messages[msgIndex];
  } else {
    document.getElementById("continueBtn").classList.add("hidden");
    document.getElementById("castBtn").classList.remove("hidden");
  }
}

function openIDE() {
  document.getElementById("ide").classList.remove("hidden");
  document.getElementById("grimorio").classList.remove("hidden");
  document.getElementById("mageText").innerText =
    "Use o grimório sempre que a magia falhar.";
}

function runCode() {
  const code = document.getElementById("codeInput").value.trim();
  const out = document.getElementById("consoleOutput");
  out.textContent = "";

  if (code.startsWith("print")) {
    const match = code.match(/\((.*)\)/);
    out.textContent = match ? match[1].replace(/['"]/g, "") : "";
    document.getElementById("mageText").innerText =
      "Muito bem. Você usou corretamente o feitiço print.";
  } else {
    document.getElementById("mageText").innerText =
      "A magia falhou. Consulte o Grimório da Linguagem.";
  }
}
