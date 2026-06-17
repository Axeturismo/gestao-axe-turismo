console.log("Gestão Axé Turismo e Aventura iniciado.");

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-item");
  const screens = document.querySelectorAll(".screen");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetScreen = button.getAttribute("data-screen");

      screens.forEach((screen) => {
        screen.classList.remove("active");
      });

      navButtons.forEach((nav) => {
        nav.classList.remove("active");
      });

      document.getElementById(targetScreen).classList.add("active");
      button.classList.add("active");
    });
  });
});
