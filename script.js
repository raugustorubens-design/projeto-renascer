/* ===============================
   DEV MODE
================================ */
const DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "true";

/* ===============================
   ESTADO
================================ */
let acts = [];
let actIndex = 0;
let quizStatus = {};
let spellValidated = false;

let analytics = {
  attempts: 0,
  errors: 0
};

fetch("ato_free.json")
  .then(r => r.json())
  .then(d => {
    acts = d.acts;
    if (DEV_MODE) {
      actIndex = 0;
    } else {
      loadProgress();
    }
    renderAct();
  });

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
  if (DEV_MODE) return; // nunca grava em dev mode

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
   RENDERIZAÇÃO
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

    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        ${step.example ? `<pre>${step.example}</pre>` : ""}
      `;
    }

    if (step.type === "quiz") {
      quizStatus[stepIndex] = { correct: DEV_MODE, attempts: 0 };
      b.innerHTML += `<p><strong>${step.question}</strong></p>`;

      if (!DEV_MODE) {
        const feedback = document.createElement("div");
        step.options.forEach((o, i) => {
          const btn = document.createElement("button");
          btn.textContent = `${String.fromCharCode(65 + i)}) ${o.text}`;
          btn.onclick = () => {
            quizStatus[stepIndex].correct = o.correct;
            if (o.correct) checkAdvance();
          };
          b.appendChild(btn);
        });
        b.appendChild(feedback);
      } else {
        b.innerHTML += `<em>(Quiz ignorado no modo desenvolvedor)</em>`;
      }
    }

    if (step.type === "spell") {
      if (!DEV_MODE) {
        b.innerHTML += `
          <h3>${step.title}</h3>
          <p>${step.instruction}</p>
          <textarea id="spell"></textarea>
          <button onclick="validateSpell(${JSON.stringify(step.validation)})">
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
   VALIDAÇÕES NORMAIS
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
    setTimeout(renderAct, 600);
  }

   /* ===============================
   UI / NAVEGAÇÃO
================================ */
function enterPortal() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("tabs").classList.remove("hidden");
  renderAct(); // inicia a engine
}

function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

}

/* ===============================
   FINAL
================================ */
function showDashboard() {
  document.getElementById("content").innerHTML += `
    <div class="block"><strong>Dashboard final (DEV)</strong></div>
  `;
}

function showCertificate() {
  fetch("certification.json")
    .then(r => r.json())
    .then(d => {
      const cert = d.certificate;
      document.getElementById("certificate").innerHTML = `
        <div class="diploma">
          <h2>${cert.title}</h2>
          <p>${cert.description}</p>
          <p><strong>Nível:</strong> ${cert.level}</p>
        </div>
      `;
      document.getElementById("certificate").classList.remove("hidden");
    });
}

function showPremium() {
  document.getElementById("paywall").classList.remove("hidden");
}
