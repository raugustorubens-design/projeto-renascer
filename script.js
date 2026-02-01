/* ===============================
   DOM ELEMENTS
================================ */
const validateBtn = document.getElementById("validateBtn");
const evaluationScreen = document.getElementById("evaluation-screen");
const paywallScreen = document.getElementById("paywall-screen");

/* ===============================
   VALIDATION LOGIC
================================ */
validateBtn.onclick = () => {

  // Question 1
  const q1 = document.querySelector('input[name="q1"]:checked');
  if (!q1 || q1.value !== "correct") {
    alert("Incorrect answer in Question 1");
    return;
  }

  // Question 2
  const q2 = document.getElementById("q2").value;
  if (q2 !== "correct") {
    alert("Incorrect answer in Question 2");
    return;
  }

  // Question 3
  const q3 = document.getElementById("q3").value.trim();
  if (!q3.startsWith("print")) {
    alert("The spell is not valid");
    return;
  }

  // APPROVED
  unlockPaywall();
};

/* ===============================
   PAYWALL
================================ */
function unlockPaywall() {
  evaluationScreen.classList.add("hidden");
  paywallScreen.classList.remove("hidden");

  localStorage.setItem(
    "rebirth_premium_access",
    JSON.stringify({
      status: "unlocked",
      date: new Date().toISOString()
    })
  );
}
