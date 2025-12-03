// core.nav.js
// Gestione menu mobile/desktop basato su data-sc-nav-toggle / data-sc-nav-menu

(function (window, document) {
  if (!window.SiteCore) return;

  SiteCore.registerModule("nav", function initNav() {
    const toggle = document.querySelector("[data-sc-nav-toggle]");
    const menu = document.querySelector("[data-sc-nav-menu]");
    if (!toggle || !menu) return;

    function open() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("is-open");
      isOpen ? close() : open();
    });

    // Chiudi al resize sopra breakpoint desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 769) {
        close();
      }
    });
  });
})(window, document);
