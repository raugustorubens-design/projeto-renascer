/* ===============================
   DOM REFERENCES
================================ */
const onboardingScreen = document.getElementById("onboarding-screen");
const evaluationScreen = document.getElementById("evaluation-screen");
const paywallScreen = document.getElementById("paywall-screen");

const startEvaluationBtn = document.getElementById("startEvaluationBtn");
const validateBtn = document.getElementById("validateBtn");

/* ===============================
   FLOW CONTROL
================================ */
startEvaluationBtn.addEventListener("click", () => {
  onboardingScreen.classList.add("hidden");
  evaluationScreen.classList.remove("hidden");
});

/* ===============================
   VALIDATION LOGIC
================================ */
validateBtn.addEventListener("click", () => {

  const q1 = document.querySelector('input[name="q1"]:checked');
  if (!q1 || q1.value !== "correct") {
    alert("Resposta incorreta na questão 1.");
    return;
  }

  const q2 = document.getElementById("q2").value;
  if (q2 !== "correct") {
    alert("Resposta incorreta na questão 2.");
    return;
  }

  const q3 = document.getElementById("q3").value.trim();
  if (!q3.startsWith("print")) {
    alert("O feitiço informado não é válido.");
    return;
  }

  unlockPaywall();
});

/* ===============================
   PAYWALL UNLOCK
================================ */
function unlockPaywall() {
  evaluationScreen.classList.add("hidden");
  paywallScreen.classList.remove("hidden");

  localStorage.setItem(
    "rebirth_progress",
    JSON.stringify({
      status: "free_completed",
      timestamp: new Date().toISOString()
    })
  );
}
