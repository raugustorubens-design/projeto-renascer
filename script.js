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
    loadProgress();
    renderAct();
  });

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
      quizStatus[stepIndex] = { correct: false, attempts: 0 };
      b.innerHTML += `<p><strong>${step.question}</strong></p>`;
      const feedback = document.createElement("div");

      step.options.forEach((o, i) => {
        const btn = document.createElement("button");
        btn.textContent = `${String.fromCharCode(65 + i)}) ${o.text}`;

        btn.onclick = () => {
          quizStatus[stepIndex].attempts++;
          analytics.attempts++;

          if (o.correct) {
            quizStatus[stepIndex].correct = true;
            btn.style.background = "#238636";
            feedback.innerHTML = `<p style="color:#3fb950;">✔ Correto.</p>`;
            lockButtons(b);
            checkAdvance();
          } else {
            analytics.errors++;
            btn.style.background = "#da3633";
            feedback.innerHTML = `<p style="color:#f85149;">✖ Incorreto.</p>`;
          }
          saveProgress();
        };
        b.appendChild(btn);
      });
      b.appendChild(feedback);
    }

    if (step.type === "spell") {
      b.innerHTML += `
        <h3>${step.title}</h3>
        <p>${step.instruction}</p>
        <textarea id="spell"></textarea>
        <button onclick="validateSpell(${JSON.stringify(step.validation)})">
          Validar Feitiço
        </button>
        <div id="spellFeedback"></div>
      `;
    }
    c.appendChild(b);
  });
}

function lockButtons(block) {
  block.querySelectorAll("button").forEach(b => b.disabled = true);
}

function allQuizzesCorrect() {
  return Object.values(quizStatus).every(q => q.correct);
}

function validateSpell(validation) {
  const v = document.getElementById("spell").value;
  const fb = document.getElementById("spellFeedback");

  if (!validation.mustContain.every(t => v.includes(t))) {
    fb.innerHTML = `<p style="color:#f85149;">✖ Estrutura inválida.</p>`;
    analytics.errors++;
    saveProgress();
    return;
  }
  spellValidated = true;
  fb.innerHTML = `<p style="color:#3fb950;">✔ Feitiço validado.</p>`;
  saveProgress();
  checkAdvance();
}

function checkAdvance() {
  if (allQuizzesCorrect() && spellValidated) {
    actIndex++;
    saveProgress();
    setTimeout(renderAct, 600);
  }
}

function showDashboard() {
  const c = document.getElementById("content");
  const level =
    analytics.errors === 0
      ? "Domínio Pleno"
      : analytics.errors < analytics.attempts / 2
      ? "Domínio Parcial"
      : "Domínio Inicial";

  c.innerHTML += `
    <div class="block">
      <h2>Resumo Final</h2>
      <p><strong>Tentativas:</strong> ${analytics.attempts}</p>
      <p><strong>Erros:</strong> ${analytics.errors}</p>
      <p><strong>Nível:</strong> ${level}</p>
    </div>
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
          <p class="ethics">${cert.ethics}</p>
          <button onclick="window.print()">Exportar PDF</button>
        </div>
      `;
      document.getElementById("certificate").classList.remove("hidden");
    });
}

function showPremium() {
  document.getElementById("paywall").classList.remove("hidden");
}
