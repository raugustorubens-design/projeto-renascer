document.addEventListener("DOMContentLoaded", function () {

  // ==================================================
  // F01 — LOGIN NARRATIVO
  // ==================================================

  // Elementos da F01
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");
  const f01Section = document.getElementById("f01-login");

  // Validação mínima da F01
  if (!inputNome || !btnContinuar || !f01Section) {
    console.warn("F01: elementos não encontrados no DOM.");
    return;
  }

  // --------------------------------------------------
  // F01 — PASSO 4: detectar usuário existente
  // --------------------------------------------------
  const userSalvo = localStorage.getItem("renascer_user");

  if (userSalvo) {
    const userData = JSON.parse(userSalvo);

    console.log("Usuário já identificado");
    console.log(userData);

    // Esconde F01
    f01Section.style.display = "none";

    // Mostra F02
    const f02Section = document.getElementById("f02-player");
    if (f02Section) {
      f02Section.style.display = "block";
    }

    // Encerra totalmente a F01
    return;
  }

  // --------------------------------------------------
  // F01 — PASSO 1: habilitar botão conforme input
  // --------------------------------------------------
  btnContinuar.disabled = true;

  inputNome.addEventListener("input", function () {
    btnContinuar.disabled = inputNome.value.trim().length === 0;
  });

  // --------------------------------------------------
  // F01 — PASSO 2: gerar token
  // --------------------------------------------------
  function gerarUserToken() {
    return "usr_" + Math.random().toString(36).substr(2, 9);
  }

  // --------------------------------------------------
  // F01 — PASSO 3: salvar usuário e avançar
  // --------------------------------------------------
  btnContinuar.addEventListener("click", function () {
    if (btnContinuar.disabled) return;

    const userData = {
      nomeNarrativo: inputNome.value.trim(),
      userToken: gerarUserToken(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("renascer_user", JSON.stringify(userData));

    console.log("F01 — Dados salvos localmente");
    console.log(userData);

    // Esconde F01
    f01Section.style.display = "none";

    // Mostra F02
    const f02Section = document.getElementById("f02-player");
    if (f02Section) {
      f02Section.style.display = "block";
    }
  });

  // ==================================================
  // F02 — ESCOLHA DO PLAYER
  // ==================================================

  const playerButtons = document.querySelectorAll(".player-btn");
  let playerSelecionado = null;

  if (playerButtons.length === 0) {
    console.warn("F02: nenhum botão de player encontrado.");
    return;
  }

  // --------------------------------------------------
  // F02 — PASSO 2: seleção do player (interação)
  // --------------------------------------------------
  playerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

      // Remove seleção anterior
      playerButtons.forEach((b) => b.classList.remove("selected"));

      // Marca o atual
      btn.classList.add("selected");
      playerSelecionado = btn.dataset.player;

      console.log("Player selecionado:", playerSelecionado);
    });
  });

});

    
    const userData = {
      nomeNarrativo: inputNome.value.trim(),
      userToken: gerarUserToken(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("renascer_user", JSON.stringify(userData));

    console.log("F01 — Dados salvos localmente");
    console.log(userData);
  });
});


