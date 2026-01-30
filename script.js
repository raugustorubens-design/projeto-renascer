// ===== ESTADO =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let title = "Mago Iniciado";
let currentAct = localStorage.getItem("atoAtual") || "Ato6";

// ===== ATOS =====
const acts = {
  Ato6: [
    {
      title: "Coleção de Poder",
      desc: "Crie uma lista com múltiplos valores.",
      check: c => c.includes("[") && c.includes("]"),
      completed: false
    },
    {
      title: "Chaves do Conhecimento",
      desc: "Crie um dicionário com chaves e valores.",
      check: c => c.includes("{") && c.includes(":"),
      completed: false
    },
    {
      title: "Tecendo Dados",
      desc: "Itere sobre uma coleção usando for.",
      check: c => c.includes("for") && (c.includes("[") || c.includes("{")),
      completed: false
    }
  ]
};

let activeMission = null;

// ===== LOAD =====
function loadState() {
  const s = JSON.parse(localStorage.getItem("renascerState") || "{}");
  rankLevel = s.rankLevel || rankLevel;
  title = s.title || title;
  if (s.Ato6) s.Ato6.forEach((v,i)=>acts.Ato6[i].completed=v);
}
loadState();
render();

// ===== UI =====
function render() {
  document.getElementById("rankLabel").innerText = `Rank: ${ranks[rankLevel]}`;
  document.getElementById("titleLabel").innerText = `Título: ${title}`;
  document.getElementById("actTitle").innerText =
    "Ato VI — A Ordem do Caos";
  document.getElementById("mageText").innerText =
    "Organizar dados é dominar o caos.";
  renderMissions();
}

function renderMissions() {
  const ul = document.getElementById("missionList");
  ul.innerHTML = "";
  acts.Ato6.forEach((m,i)=>{
    const li = document.createElement("li");
    li.textContent = m.title;
    if (m.completed) li.classList.add("completed");
    li.onclick = () => startMission(i);
    ul.appendChild(li);
  });
  if (acts.Ato6.every(m=>m.completed)) unlockBoss();
}

// ===== MISSÕES =====
function startMission(i) {
  activeMission = acts.Ato6[i];
  document.getElementById("missionTitle").innerText = activeMission.title;
  document.getElementById("mageText").innerText = activeMission.desc;
  document.getElementById("ide").classList.remove("hidden");
}

function runMission() {
  const code = document.getElementById("codeInput").value;
  if (activeMission && activeMission.check(code)) {
    activeMission.completed = true;
    save();
    render();
  }
}

// ===== BOSS =====
function unlockBoss() {
  document.getElementById("boss").classList.remove("hidden");
  document.getElementById("bossText").innerText =
    "O Tecelão de Dados exige ordem e iteração.";
}

function runBoss() {
  const code = document.getElementById("bossInput").value;
  const ok =
    (code.includes("[") || code.includes("{")) &&
    code.includes("for");
  if (!ok) {
    document.getElementById("mageText").innerText =
      "O caos ainda reina. Falta organização.";
    return;
  }
  localStorage.setItem("ato6Completo","true");
  generateReport();
  save();
}

// ===== RELATÓRIO =====
function generateReport() {
  document.getElementById("reportList").innerHTML =
    "<li>✔ Estruturas de dados dominadas</li>";
  document.getElementById("bossReport").classList.remove("hidden");
}

function closeReport() {
  document.getElementById("bossReport").classList.add("hidden");
  render();
}

// ===== PERFIL =====
function openProfile() {
  document.getElementById("studentProfile").classList.remove("hidden");
  document.getElementById("profileRank").innerText = ranks[rankLevel];
  document.getElementById("profileTitle").innerText = title;
  document.getElementById("profileStatus").innerText = "Avançado";

  const ul = document.getElementById("profileActs");
  ul.innerHTML = "<li>Ato VI ✔</li>";
}

function closeProfile() {
  document.getElementById("studentProfile").classList.add("hidden");
}

// ===== SAVE =====
function save() {
  localStorage.setItem("renascerState", JSON.stringify({
    rankLevel,
    title,
    Ato6: acts.Ato6.map(m=>m.completed)
  }));
}
