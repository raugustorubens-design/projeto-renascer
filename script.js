let acts = [];
let actIndex = 0;
let quizStatus = {};
let spellValidated = false;
let analytics = {
  errors: 0,
  attempts: 0
};

fetch("ato_free.json")
  .then(r => r.json())
  .then(d => {
    acts = d.acts;
    loadProgress();
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
  const h = document.createElement("h2");
  h.textContent = act.title;
  c.appendChild(h);

  act.steps.forEach((step, stepIndex) => {
    const b = document.createElement("div");
    b.className = "block";

    /* CONTEÚDO */
    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        ${step.example ? `<pre>${step.example}</pre>` : ""}
      `;
    }

    /* QUIZ */
    if (step.type === "quiz") {
      quizStatus[stepIndex] = { correct: false, attempts: 0 };

      const q = document.createElement("p");
      q.innerHTML = `<strong>${step.question}</strong>`;
      b.appendChild(q);

      const feedback = document.createElement("div");

      step.options.forEach((o, i) => {
        const letter = String.fromCharCode(65 + i);
        const btn = document.createElement("button");
        btn.textContent = `${letter}) ${o.text}`;

        btn.onclick = () => {
          quizStatus[stepIndex].attempts++;
          analytics.attempts++;

          if (o.correct) {
            quizStatus[stepIndex].correct = true;
            btn.style.background = "#238636";
            feedback.innerHTML = `<p style="color:#3fb950;">✔ Correto. ${o.feedback || ""}</p>`;
            lockButtons(b);
            checkAutoAdvance();
          } else {
            analytics.errors++;
            btn.style.background = "#da3633";

            if (quizStatus[stepIndex].attempts === 1) {
              feedback.innerHTML = `<p style="color:#f85149;">✖ Incorreto. Tente novamente.</p>`;
            } else {
              feedback.innerHTML = `<p style="color:#f85149;">✖ Segunda tentativa incorreta. Revise o conteúdo.</p>`;
              lockButtons(b);
            }
          }
          saveProgress();
        };

        b.appendChild(btn);
      });

      b.appendChild(feedback);
    }

    /* FEITIÇO – VALIDAÇÃO SEMÂNTICA */
    if (step.type === "spell") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.instruction}</p>
        <textarea id="spell"></textarea>
        <button id="spellBtn">Validar Feitiço</button>
        <div id="spellFeedback"></div>
      `;

      b.querySelector("#spellBtn").onclick = () => validateSpell(step.validation);
    }

    c.appendChild(b);
  });
}

/* ===============================
   CONTROLES
================================ */
function lockButtons(block) {
  block.querySelectorAll("button").forEach(b => b.disabled = true);
}

function allQuizzesCorrect() {
  return Object.values(quizStatus).every(q => q.correct);
}

/* ===============================
   FEITIÇO – SEMÂNTICA
================================ */
function validateSpell(validation) {
  const v = document.getElementById("spell").value.trim();
  const fb = document.getElementById("spellFeedback");

  const ok = validation.mustContain.every(t => v.includes(t));

  if (!ok) {
    fb.innerHTML = `<p style="color:#f85149;">✖ O feitiço não atende à estrutura esperada.</p>`;
    analytics.errors++;
    saveProgress();
    return;
  }

  spellValidated = true;
  fb.innerHTML = `<p style="color:#3fb950;">✔ Feitiço validado com sucesso.</p>`;
  saveProgress();
  checkAutoAdvance();
}

/* ===============================
   AVANÇO AUTOMÁTICO
================================ */
function checkAutoAdvance() {
  if (allQuizzesCorrect() && spellValidated) {
    setTimeout(() => {
      actIndex++;
      saveProgress();
      renderAct();
    }, 700);
  }
}

/* ===============================
   DASHBOARD DO ALUNO
================================ */
function showDashboard() {
  const c = document.getElementById("content");
  const d = document.createElement("div");
  d.className = "block";

  d.innerHTML = `
    <h2>Resumo do Aprendizado</h2>
    <p><strong>Tentativas:</strong> ${analytics.attempts}</p>
    <p><strong>Erros:</strong> ${analytics.errors}</p>
    <p><strong>Nível:</strong> ${
      analytics.errors === 0 ? "Domínio Pleno" :
      analytics.errors < analytics.attempts / 2 ? "Domínio Parcial" :
      "Domínio Inicial"
    }</p>
  `;

  c.appendChild(d);
}

/* ===============================
   CERTIFICADO + PDF
================================ */
function showCertificate() {
  fetch("certification.json")
    .then(r => r.json())
    .then(d => {
      const cert = d.certificate;
      const el = document.getElementById("certificate");

      el.innerHTML = `
        <div class="diploma">
          <h2>${cert.title}</h2>
          <p>${cert.description}</p>
          <p><strong>Nível:</strong> ${cert.level}</p>
          <p class="ethics">${cert.ethics}</p>
          <button onclick="window.print()">Exportar PDF</button>
        </div>
      `;
      el.classList.remove("hidden");
    });
}

/* ===============================
   PREMIUM PARALELO
================================ */
function showPremium() {
  document.getElementById("paywall").classList.remove("hidden");
}
