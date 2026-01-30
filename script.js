// ===== ESTADO =====
const ranks = ["Aprendiz", "Adepto", "Mago"];
let rankLevel = 0;
let title = "Aprendiz Iniciado";
let currentAct = localStorage.getItem("atoAtual") || "Ato1";

// ===== MISSÕES =====
const acts = {
  Ato1: [
    { title:"Primeiro Feitiço", desc:"Use print()", check:c=>c.includes("print"), completed:false },
    { title:"Variáveis", desc:"Crie variável", check:c=>c.includes("="), completed:false },
    { title:"Decisão", desc:"Use if", check:c=>c.includes("if"), completed:false }
  ],
  Ato2: [
    { title:"Variável + print", desc:"Use variável e print", check:c=>c.includes("=")&&c.includes("print"), completed:false },
    { title:"Reatribuição", desc:"Altere valor", check:c=>(c.split("=").length-1)>=2, completed:false },
    { title:"Preparação", desc:"Variável para decisão", check:c=>c.includes("="), completed:false }
  ],
  Ato3: [
    { title:"Primeira Escolha", desc:"if com condição real", check:c=>c.includes("if")&&(c.includes(">")||c.includes("<")||c.includes("==")), completed:false },
    { title:"Caminhos Mutáveis", desc:"Variável muda fluxo", check:c=>c.includes("if")&&c.includes("="), completed:false },
    { title:"O Silêncio", desc:"if sem else", check:c=>c.includes("if")&&!c.includes("else"), completed:false }
  ]
};

let activeMission = null;

// ===== LOAD =====
function loadState(){
  const s = JSON.parse(localStorage.getItem("renascerState")||"{}");
  rankLevel = s.rankLevel || 0;
  title = s.title || title;
  Object.keys(acts).forEach(a=>{
    if(s[a]) s[a].forEach((v,i)=>acts[a][i].completed=v);
  });
}
loadState();
render();

// ===== UI =====
function render(){
  document.getElementById("rankLabel").innerText = `Rank: ${ranks[rankLevel]}`;
  document.getElementById("titleLabel").innerText = `Título: ${title}`;
  document.getElementById("actTitle").innerText =
    currentAct==="Ato1"?"Ato I — O Despertar":
    currentAct==="Ato2"?"Ato II — A Lógica Profunda":
    "Ato III — O Peso da Decisão";

  document.getElementById("mageText").innerText = "Escolha uma missão.";
  renderMissions();
}

function renderMissions(){
  const ul = document.getElementById("missionList");
  ul.innerHTML="";
  acts[currentAct].forEach((m,i)=>{
    const li=document.createElement("li");
    li.textContent=m.title;
    if(m.completed) li.classList.add("completed");
    li.onclick=()=>startMission(i);
    ul.appendChild(li);
  });
  if(acts[currentAct].every(m=>m.completed)) unlockBoss();
}

// ===== MISSÃO =====
function startMission(i){
  activeMission=acts[currentAct][i];
  document.getElementById("missionTitle").innerText=activeMission.title;
  document.getElementById("mageText").innerText=activeMission.desc;
  document.getElementById("ide").classList.remove("hidden");
}

function runMission(){
  const code=document.getElementById("codeInput").value;
  if(activeMission && activeMission.check(code)){
    activeMission.completed=true;
    promote();
    save();
    render();
  }
}

// ===== PROGRESSÃO =====
function promote(){
  const c=acts[currentAct].filter(m=>m.completed).length;
  if(c>=1) rankLevel=1;
  if(c>=3) rankLevel=2;
}

// ===== BOSS =====
function unlockBoss(){
  document.getElementById("boss").classList.remove("hidden");
  document.getElementById("bossText").innerText="Prove seu domínio.";
}

function runBoss(){
  if(currentAct==="Ato1"){ localStorage.setItem("ato1Completo","true"); currentAct="Ato2";}
  else if(currentAct==="Ato2"){ localStorage.setItem("ato2Completo","true"); currentAct="Ato3";}
  else{ localStorage.setItem("ato3Completo","true"); }

  localStorage.setItem("atoAtual",currentAct);
  generateReport();
  save();
}

// ===== RELATÓRIO =====
function generateReport(){
  document.getElementById("reportList").innerHTML="<li>✔ Domínio validado</li>";
  document.getElementById("bossReport").classList.remove("hidden");
}

function closeReport(){
  document.getElementById("bossReport").classList.add("hidden");
  render();
}

// ===== PERFIL =====
function openProfile(){
  document.getElementById("studentProfile").classList.remove("hidden");
  document.getElementById("profileRank").innerText=ranks[rankLevel];
  document.getElementById("profileTitle").innerText=title;
  document.getElementById("profileStatus").innerText="Ativo";

  const ul=document.getElementById("profileActs");
  ul.innerHTML="";
  ["ato1Completo","ato2Completo","ato3Completo"].forEach((k,i)=>{
    if(localStorage.getItem(k)) ul.innerHTML+=`<li>Ato ${i+1} ✔</li>`;
  });
}

function closeProfile(){
  document.getElementById("studentProfile").classList.add("hidden");
}

// ===== SAVE =====
function save(){
  localStorage.setItem("renascerState",JSON.stringify({
    rankLevel,title,
    Ato1:acts.Ato1.map(m=>m.completed),
    Ato2:acts.Ato2.map(m=>m.completed),
    Ato3:acts.Ato3.map(m=>m.completed)
  }));
}
