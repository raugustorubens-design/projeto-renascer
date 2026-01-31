// CONTROLE DE ABAS
document.querySelectorAll(".menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll(".tab").forEach(t =>
      t.classList.remove("active")
    );

    document.getElementById(tab).classList.add("active");
  });
});

// SELEÇÃO DE PERSONAGEM
let selectedCharacter = localStorage.getItem("renascer_character");

document.querySelectorAll(".character-card").forEach(card => {
  if (card.dataset.character === selectedCharacter) {
    card.classList.add("selected");
  }

  card.addEventListener("click", () => {
    document.querySelectorAll(".character-card")
      .forEach(c => c.classList.remove("selected"));

    card.classList.add("selected");
    selectedCharacter = card.dataset.character;
    localStorage.setItem("renascer_character", selectedCharacter);
  });
});

// ONBOARDING DO MAGO
const dialog = document.getElementById("mentor-dialog");
const closeBtn = document.getElementById("close-dialog");

if (!localStorage.getItem("renascer_onboarding_done")) {
  dialog.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  dialog.classList.add("hidden");
  localStorage.setItem("renascer_onboarding_done", "true");
});
