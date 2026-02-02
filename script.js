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
