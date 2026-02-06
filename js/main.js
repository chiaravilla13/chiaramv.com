document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Cookie banner
  const CONSENT_KEY = "cookieConsent";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  if (banner) {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) banner.style.display = "flex";

    acceptBtn && acceptBtn.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      banner.style.display = "none";
      loadGA();
    });

    rejectBtn && rejectBtn.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "rejected");
      banner.style.display = "none";
    });
  }

  if (localStorage.getItem(CONSENT_KEY) === "accepted") {
    loadGA();
  }
});

function loadGA() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const GA_ID = "G-JWNWNVQNZ7";

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}
