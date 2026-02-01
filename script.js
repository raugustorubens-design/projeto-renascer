let acts = [];
let currentActIndex = 0;

fetch("ato_free.json")
  .then(res => res.json())
  .then(data => {
    acts = data.acts;
    loadProgress();
    renderAct();
  });

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("renascer_progress"));
  if (saved && saved.actIndex !== undefined) {
    currentActIndex = saved.actIndex;
  }
}

function saveProgress() {
  localStorage.setItem(
    "renascer_progress",
    JSON.stringify({ actIndex: currentActIndex })
  );
}

function renderAct() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  if (currentActIndex >= acts.length) {
    loadCertificate();
    return;
  }

  const act = acts[currentActIndex];

  const title = document.createElement("h2");
  title.textContent = act.title;
  container.appendChild(title);

  act.steps.forEach(step => {
    if (step.type === "narrative" || step.type === "content") {
      const block = document.createElement("div");
      block.className = "block";

      block.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.text}</p>
        ${step.example ? `<pre>${step.example}</pre>` : ""}
      `;
      container.appendChild(block);
    }

    if (step.type === "quiz") {
      const block = document.createElement("div");
      block.className = "block";

      block.innerHTML = `<p><strong>${step.question}</strong></p>`;

      step.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => {
          if (opt.correct) {
            btn.style.background = "#238636";
          } else {
            btn.style.background = "#da3633";
          }
        };
        block.appendChild(btn);
      });

      container.appendChild(block);
    }

    if (step.type === "spell") {
      const block = document.createElement("div");
      block.className = "block";

      block.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.instruction}</p>
        <textarea id="spellInput"></textarea>
        <button onclick="validateSpell('${step.expected}')">
          Validar Feitiço
        </button>
      `;

      container.appendChild(block);
    }
  });
}

function validateSpell(expected) {
  const input = document.getElementById("spellInput").value.trim();

  if (!input.includes("print")) {
    alert("O feitiço não demonstra domínio do comando esperado.");
    return;
  }

  currentActIndex++;
  saveProgress();
  renderAct();
}

function loadCertificate() {
  fetch("certification.json")
    .then(res => res.json())
    .then(data => {
      const cert = data.certificate;

      document.getElementById("cert-title").textContent = cert.title;
      document.getElementById("cert-description").textContent = cert.description;
      document.getElementById("cert-level").textContent = cert.level;
      document.getElementById("cert-issued").textContent = cert.issued_by;
      document.getElementById("cert-ethics").textContent = cert.ethics;

      document.getElementById("certificate").classList.remove("hidden");
    });
}
