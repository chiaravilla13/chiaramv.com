// js/ga-events.js
(function () {
  function sendGA(eventName, params) {
    // GA4 via gtag (caricato solo se consenso accettato)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
      return;
    }
    // fallback (se mai userai GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  }

  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-ga-event]");
    if (!el) return;

    const eventName = el.getAttribute("data-ga-event") || "cta_click";
    const label = el.getAttribute("data-ga-label") || "unknown";

    const href =
      el.getAttribute("href") ||
      el.getAttribute("data-href") ||
      (el.form && el.form.getAttribute("action")) ||
      "";

    sendGA(eventName, {
      cta_label: label,
      page_path: window.location.pathname,
      link_url: href
    });
  });
})();
