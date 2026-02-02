document.addEventListener("DOMContentLoaded", function () {
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");

  if (!inputNome || !btnContinuar) {
    console.warn("F01: elementos não encontrados no DOM.");
    return;
  }
   
    // PASSO 4 — detectar usuário existente
  const userSalvo = localStorage.getItem("renascer_user");

  if (userSalvo) {
  const userData = JSON.parse(userSalvo);

  console.log("Usuário já identificado");
  console.log(userData);

  const f01Section = document.getElementById("f01-login");
  if (f01Section) {
    f01Section.style.display = "none";
  }

  const f02Section = document.getElementById("f02-player");
  if (f02Section) {
    f02Section.style.display = "block";
  }

  return;
}
    
  inputNome.addEventListener("input", function () {
    btnContinuar.disabled = inputNome.value.trim().length === 0;
  });

  function gerarUserToken() {
    return "usr_" + Math.random().toString(36).substr(2, 9);
  }

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
  });
});


