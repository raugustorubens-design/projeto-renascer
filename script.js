document.addEventListener("DOMContentLoaded", () => {
  const texto = document.querySelector(".pergaminho p");

  if (!texto) return;

  const textoOriginal = texto.innerHTML;
  texto.innerHTML = "";
  let i = 0;

  function escrever() {
    if (i < textoOriginal.length) {
      texto.innerHTML += textoOriginal.charAt(i);
      i++;
      setTimeout(escrever, 30);
    }
  }

  escrever();
});
