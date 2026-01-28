let user = {
  premium: false
};

let flow = [];
let index = 0;

const screen = document.getElementById("screen");

// Carrega o JSON externo
fetch("ato_free.json")
  .then(response => response.json())
  .then(data => {
    buildFlow(data);
    render();
  })
  .catch(err => {
    screen.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
    console.error(err);
  });

// Constrói o fluxo a partir dos atos
function buildFlow(data) {
  data.acts.forEach(act => {
    act.steps.forEach(step => {
      flow.push(step);
    });
  });
}

// Renderização principal
function render() {
  const step = flow[index];
  screen.innerHTML = "";

  if (!step) {
    screen.innerHTML = "<p>Fim do conteúdo.</p>";
    return;
  }

  if (step.type === "narrative" || step.type === "content") {
    screen.innerHTML = `
      <div>
        <h1>${step.title}</h1>
        <p>${step.text}</p>
        <button onclick="next()">Avançar</button>
      </div>
    `;
  }

  if (step.type === "quiz") {
    screen.innerHTML = `
      <div>
        <p>${step.question}</p>
        ${step.options
          .map(
            (opt, i) =>
              `<label>
                 <input type="radio" name="q" value="${opt.correct}">
                 ${opt.text}
               </label><br>`
          )
          .join("")}
        <button onclick="checkQuiz()">Confirmar</button>
      </div>
    `;
  }

  if (step.type === "spell") {
    screen.innerHTML = `
      <div>
        <p>${step.prompt}</p>
        <textarea></textarea>
        <button onclick="next()">Lançar Feitiço</button>
      </div>
    `;
  }

  if (step.type === "portal") {
    if (!user.premium) {
      screen.innerHTML = `
        <div>
          <h1>${step.title}</h1>
          <p>${step.text}</p>
          <button onclick="unlock()">Desbloquear Portal</button>
        </div>
      `;
    } else {
      next();
    }
  }
}

function next() {
  index++;
  render();
}

function checkQuiz() {
  const selected = document.querySelector("input[name=q]:checked");
  if (selected && selected.value === "true") {
    alert("Correto!");
    next();
  } else {
    alert("Resposta incorreta.");
  }
}

function unlock() {
  alert("Simulação de assinatura realizada.");
  user.premium = true;
  next();
}
