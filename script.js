let acts = [];
let actIndex = 0;

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
}

function saveProgress() {
  localStorage.setItem(
    "renascer_progress",
    JSON.stringify({ actIndex })
  );
}

function renderAct() {
  const c = document.getElementById("content");
  c.innerHTML = "";

  if (actIndex >= acts.length) {
    showCertificate();
    showPaywall();
    return;
  }

  const act = acts[actIndex];
  const h = document.createElement("h2");
  h.textContent = act.title;
  c.appendChild(h);

  act.steps.forEach(step => {
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

    /* QUIZ COM FEEDBACK */
    if (step.type === "quiz") {
      const question = document.createElement("p");
      question.innerHTML = `<strong>${step.question}</strong>`;
      b.appendChild(question);

      const feedback = document.createElement("div");
      feedback.style.marginTop = "10px";

      step.options.forEach((o, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C...
        const btn = document.createElement("button");
        btn.textContent = `${letter}) ${o.text}`;

        btn.onclick = () => {
          // trava todos os botões
          const buttons = b.querySelectorAll("button");
          buttons.forEach(bt => bt.disabled = true);

          if (o.correct) {
            btn.style.background = "#238636";
            feedback.innerHTML = `
              <p style="color:#3fb950;">
                ✔ Resposta correta<br>
                ${o.feedback || "Você demonstrou domínio do conceito."}
              </p>
            `;
          } else {
            btn.style.background = "#da3633";
            feedback.innerHTML = `
              <p style="color:#f85149;">
                ✖ Resposta incorreta<br>
                ${o.feedback || "Revise o conceito antes de prosseguir."}
              </p>
            `;
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
}

function validateSpell(expected) {
  const v = document.getElementById("spell").value.trim();

  if (!v.includes(expected)) {
    alert("O feitiço não demonstra domínio do conceito esperado.");
    return;
  }

  actIndex++;
  saveProgress();
  renderAct();
}

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

function showPaywall() {
  document.getElementById("paywall").classList.remove("hidden");
}
