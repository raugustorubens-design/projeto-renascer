const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

let acts = [];
let actIndex = 0;
let selectedPlayer = null;

fetch("ato_free.json")
  .then(r => r.json())
  .then(d => {
    acts = d.acts;
  });

function enterPortal() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("tabs").classList.remove("hidden");
  renderAct();
  loadPlayers();
}

function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function renderAct() {
  const c = document.getElementById("content");
  c.innerHTML = "";

  if (actIndex >= acts.length) {
    document.getElementById("paywall").classList.remove("hidden");
    loadCertificate();
    return;
  }

  const act = acts[actIndex];
  c.innerHTML += `<h2>${act.title}</h2>`;

  act.steps.forEach(step => {
    const b = document.createElement("div");
    b.className = "block";

    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `<h3>${step.title}</h3><p>${step.text}</p>`;
    }

    c.appendChild(b);
  });

  if (DEV_MODE) {
    const nav = document.createElement("div");
    nav.className = "block";
    nav.innerHTML = `
      <strong>Modo Desenvolvedor</strong><br>
      <button onclick="actIndex--; renderAct()">⬅ Ato</button>
      <button onclick="actIndex++; renderAct()">Ato ➡</button>
    `;
    c.appendChild(nav);
  }
}

function loadPlayers() {
  const p = document.getElementById("players");
  p.innerHTML = "";

  const files = [
    "01_Giu_jogadora.png",
    "02_Bi_jogadora.png",
    "03_Neto_jogador.png"
  ];

  files.forEach(f => {
    const d = document.createElement("div");
    d.className = "player";
    d.innerHTML = `<img src="assets/personagens/players/${f}"><p>${f}</p>`;
    d.onclick = () => {
      document.querySelectorAll(".player").forEach(x => x.classList.remove("selected"));
      d.classList.add("selected");
      selectedPlayer = f;
    };
    p.appendChild(d);
  });
}

function loadCertificate() {
  fetch("certification.json")
    .then(r => r.json())
    .then(d => {
      document.getElementById("certificate").innerHTML = `
        <h2>${d.certificate.title}</h2>
        <p>${d.certificate.description}</p>
      `;
      document.getElementById("certificate").classList.remove("hidden");
    });
}
