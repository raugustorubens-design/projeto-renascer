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

    if (step.type === "content" || step.type === "narrative") {
      b.innerHTML = `<h3>${step.title}</h3><p>${step.text}</p>${step.example ? `<pre>${step.example}</pre>` : ""}`;
    }

    if (step.type === "quiz") {
      b.innerHTML = `<p><strong>${step.question}</strong></p>`;
      step.options.forEach(o => {
        const btn = document.createElement("button");
        btn.textContent = o.text;
        btn.onclick = () => btn.style.background = o.correct ? "#238636" : "#da3633";
        b.appendChild(btn);
      });
    }

    if (step.type === "spell") {
      b.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.instruction}</p>
        <textarea id="spell"></textarea>
        <button onclick="validateSpell('${step.expected}')">Validar</button>
      `;
    }

    c.appendChild(b);
  });
}

function validateSpell(expected) {
  const v = document.getElementById("spell").value;
  if (!v.includes(expected)) {
    alert("Feitiço não demonstra domínio.");
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
