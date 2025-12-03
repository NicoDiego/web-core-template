// core.site.js
// Sistema modulare SiteCore: registra e inizializza i moduli JS del core/progetto

(function (window, document) {
  const SiteCore = {
    modules: {},

    registerModule(name, initFn) {
      if (typeof initFn !== "function") return;
      this.modules[name] = initFn;
    },

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        Object.entries(this.modules).forEach(([name, fn]) => {
          try {
            fn();
          } catch (err) {
            console.error("[SiteCore] Errore nel modulo:", name, err);
          }
        });
      });
    },
  };

  window.SiteCore = SiteCore;
  SiteCore.init();
})(window, document);
