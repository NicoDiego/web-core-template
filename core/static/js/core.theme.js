// core.theme.js
// Gestione tema: auto (prefers-color-scheme) / dark / light + localStorage

(function (window, document) {
  if (!window.SiteCore) return;

  SiteCore.registerModule("theme", function initTheme() {
    const root = document.documentElement;
    const STORAGE_KEY = "sc-theme";

    function getSystemTheme() {
      if (!window.matchMedia) return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function applyTheme(mode) {
      if (mode === "auto") {
        const sys = getSystemTheme();
        root.setAttribute("data-theme", "auto");
        root.dataset.themeMode = sys;
      } else {
        root.setAttribute("data-theme", mode);
        root.dataset.themeMode = mode;
      }
    }

    function loadTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved || saved === "auto") {
        applyTheme("auto");
      } else {
        applyTheme(saved);
      }
    }

    function saveTheme(mode) {
      localStorage.setItem(STORAGE_KEY, mode);
    }

    // inizializza tema
    loadTheme();

    // bottone toggle (presente nei layout)
    const toggle = document.querySelector("[data-sc-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = localStorage.getItem(STORAGE_KEY) || "auto";
        let next;
        if (current === "auto") next = "dark";
        else if (current === "dark") next = "light";
        else next = "auto";

        saveTheme(next);
        applyTheme(next);
      });
    }
  });
})(window, document);
