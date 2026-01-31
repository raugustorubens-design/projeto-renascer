// CONTROLE DE ABAS
const buttons = document.querySelectorAll(".menu button");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabs.forEach(tab => {
      tab.classList.remove("active");
    });

    const section = document.getElementById(target);
    if (section) {
      section.classList.add("active");
    }
  });
});
