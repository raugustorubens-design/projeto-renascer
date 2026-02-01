/* ===============================
   DOM
================================ */
const validarBtn = document.getElementById("validarBtn");
const telaAvaliacao = document.getElementById("tela-avaliacao");
const telaPaywall = document.getElementById("tela-paywall");

/* ===============================
   VALIDAÇÃO
================================ */
validarBtn.onclick = () => {

  // Q1
  const q1 = document.querySelector('input[name="q1"]:checked');
  if (!q1 || q1.value !== "certo") {
    alert("Erro na questão 1");
    return;
  }

  // Q2
  const q2 = document.getElementById("q2").value;
  if (q2 !== "certo") {
    alert("Erro na questão 2");
    return;
  }

  // Q3
  const q3 = document.getElementById("q3").value.trim();
  if (!q3.startsWith("print")) {
    alert("O feitiço não é válido");
    return;
  }

  // APROVADO
  liberarPaywall();
};

/* ===============================
   PAYWALL
================================ */
function liberarPaywall() {
  telaAvaliacao.classList.add("oculto");
  telaPaywall.classList.remove("oculto");

  localStorage.setItem(
    "renascer_acesso_premium",
    JSON.stringify({
      status: "liberado",
      data: new Date().toISOString()
    })
  );
}
