document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#main-nav");

  document.querySelector(".toggle-menu").addEventListener("click", ({ target }) => {
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

})