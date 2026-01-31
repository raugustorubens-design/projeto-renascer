const app = document.getElementById("app");

// ============================
// RENDERIZAÇÕES
// ============================

function renderInicio() {
  app.innerHTML = `
    <div class="inicio-layout">
      <div class="inicio-texto">
        <h1>Projeto Renascer</h1>
        <p>
          Uma jornada formativa baseada em rigor técnico, clareza pedagógica
          e evolução consciente.
        </p>
        <br />
        <button onclick="renderEscolha()">Entrar na Dungeon</button>
      </div>

      <div class="mago-container">
        <img src="assets/characters/mago.png" alt="Mago Mentor">
      </div>
    </div>
  `;
}

function renderEscolha() {
  app.innerHTML = `
    <h2>Escolha seu Personagem</h2>
    <p class="subtexto">
      Este será o avatar que representa você ao longo da jornada.
    </p>

    <div class="personagens">
      ${criarCard("Giu", "01_Giu_jogadora.png")}
      ${criarCard("Bi", "02_Bi_jogadora.png")}
      ${criarCard("Neto", "03_Neto_jogador.png")}
      ${criarCard("Jack", "04_Jack_jogadora.png")}
    </div>

    <p class="subtexto">
      A escolha não define dificuldade. Ela define identidade.
    </p>
  `;
}

function criarCard(nome, arquivo) {
  return `
    <div class="card" onclick="selecionarPersonagem('${nome}')">
      <img src="assets/characters/players/${arquivo}" alt="${nome}">
      <div class="nome">${nome}</div>
    </div>
  `;
}

// ============================
// AÇÕES
// ============================

function selecionarPersonagem(nome) {
  app.innerHTML = `
    <div class="inicio-layout">
      <div class="inicio-texto">
        <h1>${nome}, a jornada começa</h1>
        <p>
          Você fez sua escolha conscientemente.
          O conhecimento exige paciência, atenção e coragem.
        </p>
      </div>

      <div class="mago-container">
        <img src="assets/characters/mago.png" alt="Mago Mentor">
      </div>
    </div>
  `;
}

// ============================
// MENU
// ============================

document.getElementById("btnInicio").onclick = renderInicio;
document.getElementById("btnPortal").onclick = renderEscolha;
document.getElementById("btnQualidade").onclick = () => {
  app.innerHTML = `
    <h2>Qualidade, Ética e Compliance</h2>
    <p>
      O Projeto Renascer foi concebido com compromisso explícito com
      qualidade técnica, clareza pedagógica e responsabilidade ética.
    </p>
  `;
};

// ============================
// START
// ============================

renderInicio();
