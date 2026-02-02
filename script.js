// F01 — Login Narrativo (Passos 1, 2 e 3)
document.addEventListener("DOMContentLoaded", function () {
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");

  if (!inputNome || !btnContinuar) {
    console.warn("F01: elementos não encontrados no DOM.");
    return;
  }

  // Passo 1 — habilitar / desabilitar botão
  inputNome.addEventListener("input", function () {
    btnContinuar.disabled = inputNome.value.trim().length === 0;
  });

  // Função de geração de token
  function gerarUserToken() {
    return "usr_" + Math.random().toString(36).substr(2, 9);
  }

  // Passo 2 e 3 — clique, gerar token e salvar
  btnContinuar.addEventListener("click", function () {
    if (btnContinuar.disabled) return;

    const nomeNarrativo = inputNome.value.trim();
    const userToken = gerarUserToken();

    const userData = {
      nomeNarrativo: nomeNarrativo,
      userToken: userToken,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("renascer_user", JSON.stringify(userData));

    console.log("F01 — Dados salvos localmente");
    console.log(userData);
  });
});
