let acts = [];
let actIndex = 0;
let quizStatus = {}; // controla acertos/erros por questão

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
}

function saveProgress() {
  localStorage.setItem(
    "renascer_progress",
    JSON.stringify({ actIndex })
  );
}

/* ===============================
   RENDERIZAÇÃO
================================ */
function renderAct() {
  const c = document.getElementById("content");
  c.innerHTML = "";
  quizStatus = {};

  if (actIndex >= acts.length) {
    showCertificate();
    showPaywall();
    return;
  }

  const act = acts[actIndex];

  const h = document.createElement("h2");
  h.textContent = act.title;
  c.appendChild(h);

  act.steps.forEach((step, stepIndex) => {
    const b = document.createElement("div");
    b.className = "block";

    /* CONTEÚDO / NARRATIVA */
    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        ${step.example ? `<pre>${step.example}</pre>` : ""}
      `;
    }

    /* QUIZ COM FEEDBACK + CONTROLE */
    if (step.type === "quiz") {
      quizStatus[stepIndex] = {
        correct: false,
        attempts: 0
      };

      const q = document.createElement("p");
      q.innerHTML = `<strong>${step.question}</strong>`;
      b.appendChild(q);

      const feedback = document.createElement("div");
      feedback.style.marginTop = "10px";

      step.options.forEach((o, i) => {
        const letter = String.fromCharCode(65 + i);
        const btn = document.createElement("button");
        btn.textContent = `${letter}) ${o.text}`;

        btn.onclick = () => {
          quizStatus[stepIndex].attempts++;

          if (o.correct) {
            quizStatus[stepIndex].correct = true;
            btn.style.background = "#238636";

            feedback.innerHTML = `
              <p style="color:#3fb950;">
                ✔ Resposta correta<br>
                ${o.feedback || "Conceito demonstrado com sucesso."}
              </p>
            `;

            lockButtons(b);
            updateMastery();
          } else {
            btn.style.background = "#da3633";

            if (quizStatus[stepIndex].attempts === 1) {
              feedback.innerHTML = `
                <p style="color:#f85149;">
                  ✖ Resposta incorreta<br>
                  Tente novamente com atenção ao conceito.
                </p>
              `;
            } else {
              feedback.innerHTML = `
                <p style="color:#f85149;">
                  ✖ Segunda tentativa incorreta<br>
                  Revise o conteúdo antes de prosseguir.
                </p>
              `;
              lockButtons(b);
            }
          }
        };

        b.appendChild(btn);
      });

      b.appendChild(feedback);
    }

    /* FEITIÇO */
    if (step.type === "spell") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.instruction}</p>
        <textarea id="spell"></textarea>
        <button onclick="validateSpell('${step.expected}')">
          Validar Feitiço
        </button>
      `;
    }

    c.appendChild(b);
  });

  /* BOTÃO DE AVANÇO */
  const advanceBtn = document.createElement("button");
  advanceBtn.textContent = "Avançar para o próximo Ato";
  advanceBtn.onclick = attemptAdvance;
  advanceBtn.style.marginTop = "20px";

  c.appendChild(advanceBtn);
}

/* ===============================
   CONTROLE DE QUIZ
================================ */
function lockButtons(block) {
  const buttons = block.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);
}

function allQuizzesCorrect() {
  return Object.values(quizStatus).every(q => q.correct);
}

/* ===============================
   DOMÍNIO
================================ */
function updateMastery() {
  const total = Object.keys(quizStatus).length;
  const correct = Object.values(quizStatus).filter(q => q.correct).length;

  let level = "Iniciante";
  if (correct === total) level = "Domínio Pleno";
  else if (correct > total / 2) level = "Domínio Parcial";

  localStorage.setItem(
    "renascer_mastery",
    JSON.stringify({ act: actIndex, level })
  );
}

/* ===============================
   AVANÇO
================================ */
function attemptAdvance() {
  if (!allQuizzesCorrect()) {
    alert(
      "Você ainda não demonstrou domínio completo deste Ato. Revise as questões."
    );
    return;
  }

  actIndex++;
  saveProgress();
  renderAct();
}

/* ===============================
   FEITIÇO
================================ */
function validateSpell(expected) {
  const v = document.getElementById("spell").value.trim();

  if (!v.includes(expected)) {
    alert("O feitiço não demonstra domínio do conceito esperado.");
    return;
  }

  alert("Feitiço validado com sucesso.");
}

/* ===============================
   CERTIFICADO
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
        </div>
      `;

      el.classList.remove("hidden");
    });
}

/* ===============================
   PAYWALL
================================ */
function showPaywall() {
  document.getElementById("paywall").classList.remove("hidden");
}
