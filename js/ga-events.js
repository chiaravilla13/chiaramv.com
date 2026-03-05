// js/ga-events.js
(function () {
  function sendGA(eventName, params) {
    // GA4 via gtag
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
      return;
    }
    // Fallback (es. GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  }

  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-ga-event]");
    if (!el) return;

    const eventName = el.getAttribute("data-ga-event");
    const label = el.getAttribute("data-ga-label") || "unknown";

    // Se è un link, prendiamo href. Se è un button, proviamo data-href o form action.
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
