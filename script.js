// F01 — Login Narrativo (validação mínima)
document.addEventListener("DOMContentLoaded", function () {
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");

  if (!inputNome || !btnContinuar) {
    console.warn("F01: elementos não encontrados no DOM.");
    return;
  }

  inputNome.addEventListener("input", function () {
    const valor = inputNome.value.trim();

    if (valor.length > 0) {
      btnContinuar.disabled = false;
    } else {
      btnContinuar.disabled = true;
    }
  });
});

// F01 — Geração de UserToken (Passo 2)
document.addEventListener("DOMContentLoaded", function () {
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");

  if (!inputNome || !btnContinuar) {
    console.warn("F01 Passo 2: elementos não encontrados.");
    return;
  }

  function gerarUserToken() {
    return 'usr_' + Math.random().toString(36).substr(2, 9);
  }

  btnContinuar.addEventListener("click", function () {
    const nomeNarrativo = inputNome.value.trim();

    if (nomeNarrativo.length === 0) {
      console.warn("Nome narrativo vazio.");
      return;
    }

    const userToken = gerarUserToken();

    console.log("F01 — Login Narrativo");
    console.log("Nome narrativo:", nomeNarrativo);
    console.log("UserToken:", userToken);
  });
});
