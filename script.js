/* ===============================
   DEV MODE
================================ */
const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

/* ===============================
   ESTADO GLOBAL
================================ */
let acts = [];
let actIndex = 0;
let quizStatus = {};
let spellValidated = false;

let analytics = {
  attempts: 0,
  errors: 0
};

/* ===============================
   CARREGAMENTO DOS ATOS
================================ */
fetch("ato_free.json")
  .then(r => r.json())
  .then(d => {
    if (!d.acts || !Array.isArray(d.acts)) {
      console.error("ato_free.json inválido");
      return;
    }

    acts = d.acts;

    if (!DEV_MODE) {
      loadProgress();
    } else {
      actIndex = 0;
    }

    // ⚠ NÃO inicia a engine aqui
  })
  .catch(err => console.error("Erro ao carregar atos:", err));

/* ===============================
   PROGRESSO
================================ */
function loadProgress() {
  const p = JSON.parse(localStorage.getItem("renascer_progress"));
  if (p && Number.isInteger(p.actIndex)) actIndex = p.actIndex;

  const a = JSON.parse(localStorage.getItem("renascer_analytics"));
  if (a) analytics = a;
}

function saveProgress() {
  if (DEV_MODE) return;

  localStorage.setItem(
    "renascer_progress",
    JSON.stringify({ actIndex })
  );

  localStorage.setItem(
    "renascer_analytics",
    JSON.stringify(analytics)
  );
}

/* ===============================
   RENDERIZAÇÃO DO ATO
================================ */
function renderAct() {
  const c = document.getElementById("content");
  c.innerHTML = "";

  quizStatus = {};
  spellValidated = false;

  if (actIndex >= acts.length) {
    showDashboard();
    showCertificate();
    showPremium();
    return;
  }

  const act = acts[actIndex];
  c.innerHTML += `<h2>${act.title}</h2>`;

  if (DEV_MODE) {
    const devBanner = document.createElement("div");
    devBanner.className = "block";
    devBanner.style.border = "2px dashed #d29922";
    devBanner.innerHTML = `
      <strong>⚙ MODO DESENVOLVEDOR ATIVO</strong><br>
      Navegação livre habilitada.
    `;
    c.appendChild(devBanner);
  }

  act.steps.forEach((step, stepIndex) => {
    const b = document.createElement("div");
    b.className = "block";

    /* -------- CONTEÚDO / NARRATIVA -------- */
    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        ${step.example ? `<pre>${step.example}</pre>` : ""}
      `;
    }

    /* -------- QUIZ -------- */
    if (step.type === "quiz") {
      quizStatus[stepIndex] = { correct: DEV_MODE };

      b.innerHTML += `<p><strong>${step.question}</strong></p>`;

      if (!DEV_MODE) {
        step.options.forEach((o, i) => {
          const btn = document.createElement("button");
          btn.textContent = `${String.fromCharCode(65 + i)}) ${o.text}`;
          btn.onclick = () => {
            quizStatus[stepIndex].correct = o.correct;
            if (o.correct) checkAdvance();
          };
          b.appendChild(btn);
        });
      } else {
        b.innerHTML += `<em>(Quiz ignorado no modo desenvolvedor)</em>`;
      }
    }

    /* -------- FEITIÇO -------- */
    if (step.type === "spell") {
      if (!DEV_MODE) {
        b.innerHTML += `
          <h3>${step.title}</h3>
          <p>${step.instruction}</p>
          <textarea id="spell"></textarea>
          <button onclick='validateSpell(${JSON.stringify(step.validation)})'>
            Validar Feitiço
          </button>
          <div id="spellFeedback"></div>
        `;
      } else {
        spellValidated = true;
        b.innerHTML += `<em>(Feitiço ignorado no modo desenvolvedor)</em>`;
      }
    }

    c.appendChild(b);
  });

  /* -------- NAVEGAÇÃO DEV -------- */
  if (DEV_MODE) {
    const nav = document.createElement("div");
    nav.className = "block";
    nav.innerHTML = `
      <button onclick="prevAct()">⬅ Ato anterior</button>
      <button onclick="nextAct()">Próximo Ato ➡</button>
    `;
    c.appendChild(nav);
  }
}

/* ===============================
   DEV NAV
================================ */
function nextAct() {
  actIndex++;
  renderAct();
}

function prevAct() {
  if (actIndex > 0) actIndex--;
  renderAct();
}

/* ===============================
   VALIDAÇÕES
================================ */
function allQuizzesCorrect() {
  return Object.values(quizStatus).every(q => q.correct);
}

function validateSpell(validation) {
  const v = document.getElementById("spell").value;
  if (!validation.mustContain.every(t => v.includes(t))) return;
  spellValidated = true;
  checkAdvance();
}

function checkAdvance() {
  if (allQuizzesCorrect() && spellValidated) {
    actIndex++;
    saveProgress();
    setTimeout(renderAct, 500);
  }
}

/* ===============================
   UI / PORTAL
================================ */
function enterPortal() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("tabs").classList.remove("hidden");
  renderAct();
}

function showTab(id) {
  document.querySelectorAll(".tab").forEach(t =>
    t.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* ===============================
   FINALIZAÇÃO
================================ */
function showDashboard() {
  document.getElementById("content").innerHTML = `
    <div class="block">
      <strong>Python FREE concluído com domínio comprovado.</strong>
    </div>
  `;
}

function showCertificate() {
  fetch("certification.json")
    .then(r => r.json())
    .then(d => {
      const cert = d.certificate;
      const c = document.getElementById("certificate");
      c.innerHTML = `
        <div class="diploma">
          <h2>${cert.title}</h2>
          <p>${cert.description}</p>
          <p><strong>Nível:</strong> ${cert.level}</p>
        </div>
      `;
      c.classList.remove("hidden");
    });
}

function showPremium() {
  document.getElementById("paywall").classList.remove("hidden");
}
