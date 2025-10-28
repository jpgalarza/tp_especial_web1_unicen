document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#main-nav");
  const menuToggleBtn = document.querySelector(".toggle-menu");

  menuToggleBtn.addEventListener("click", ({ target }) => {
    const isExpanded = target.getAttribute("aria-expanded") === "true";

    menu.classList.toggle("nav-open");
    target.setAttribute("aria-expanded", (!isExpanded).toString());

    if(isExpanded) {
      target.innerHTML = "&#9776;";
      target.setAttribute("aria-label", "Abrir menú de navegación");
      
    }else {
      target.innerHTML = "&#x2715;";
      target.setAttribute("aria-label", "Cerrar menú de navegación");
    }
  })
  

  window.addEventListener("resize", () => {
    if(window.innerWidth >= 576) {
      menu.classList.remove("nav-open");
      menuToggleBtn.setAttribute("aria-expanded", "false");
      menuToggleBtn.innerHTML = "&#9776;";
      menuToggleBtn.setAttribute("aria-label", "Abrir menú de navegación");
    }

    if(window.innerWidth < 576) {
      menu.classList.add("transition-none");

      setTimeout(() => {
        menu.classList.remove("transition-none");
      }, 0);
    }
  })

})