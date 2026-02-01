/* ===============================
   DEV MODE CANÔNICO
================================ */
const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

/* ===============================
   ESTADO
================================ */
let acts = [];
let actIndex = 0;
let quizStatus = {};
let spellValidated = false;

/* ===============================
   CARREGAMENTO
================================ */
fetch("ato_free.json")
  .then(r => r.json())
  .then(d => {
    acts = d.acts || [];
  });

/* ===============================
   PORTAL
================================ */
function enterPortal() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("tabs").classList.remove("hidden");
  renderAct();
}

/* ===============================
   TABS
================================ */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ===============================
   RENDERIZAÇÃO
================================ */
function renderAct() {
  const c = document.getElementById("content");
  c.innerHTML = "";
  quizStatus = {};
  spellValidated = DEV_MODE;

  if (actIndex >= acts.length) {
    showCertificate();
    showPremium();
    return;
  }

  const act = acts[actIndex];
  c.innerHTML += `<h2>${act.title}</h2>`;

  if (DEV_MODE) {
    c.innerHTML += `
      <div class="block" style="border:2px dashed #d29922">
        ⚙ MODO DESENVOLVEDOR ATIVO — Navegação livre
      </div>
    `;
  }

  act.steps.forEach((step, i) => {
    const b = document.createElement("div");
    b.className = "block";

    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `<h3>${step.title}</h3><p>${step.text}</p>`;
    }

    if (step.type === "quiz") {
      quizStatus[i] = DEV_MODE;
      b.innerHTML += `<p><strong>${step.question}</strong></p>`;
      step.options.forEach((o, idx) => {
        const btn = document.createElement("button");
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${o.text}`;
        btn.onclick = () => {
          quizStatus[i] = o.correct;
          checkAdvance();
        };
        b.appendChild(btn);
      });
    }

    if (step.type === "spell" && !DEV_MODE) {
      b.innerHTML += `
        <textarea id="spell"></textarea>
        <button onclick="validateSpell(${JSON.stringify(step.validation)})">
          Validar
        </button>
      `;
    }

    c.appendChild(b);
  });

  if (DEV_MODE) {
    c.innerHTML += `
      <div class="block">
        <button onclick="prevAct()">⬅ Ato</button>
        <button onclick="nextAct()">Próximo ➡</button>
      </div>
    `;
  }
}

/* ===============================
   CONTROLE
================================ */
function nextAct() {
  actIndex++;
  renderAct();
}

function prevAct() {
  if (actIndex > 0) actIndex--;
  renderAct();
}

function validateSpell(validation) {
  const v = document.getElementById("spell").value;
  if (validation.mustContain.every(t => v.includes(t))) {
    spellValidated = true;
    checkAdvance();
  }
}

function checkAdvance() {
  if (DEV_MODE || (Object.values(quizStatus).every(v => v) && spellValidated)) {
    actIndex++;
    renderAct();
  }
}

/* ===============================
   FINAL
================================ */
function showCertificate() {
  fetch("certification.json")
    .then(r => r.json())
    .then(d => {
      const c = document.getElementById("certificate");
      c.innerHTML = `
        <div class="block">
          <h2>${d.certificate.title}</h2>
          <p>${d.certificate.description}</p>
        </div>
      `;
      c.classList.remove("hidden");
    });
}

function showPremium() {
  document.getElementById("paywall").classList.remove("hidden");
}
