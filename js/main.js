// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Footer year
  // =========================
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // =========================
  // Cookie banner + GA consent
  // =========================
  const CONSENT_KEY = "cookieConsent";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  if (banner) {
    const consent = localStorage.getItem(CONSENT_KEY);

    // show banner only if no consent yet
    if (!consent) banner.style.display = "flex";

    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      banner.style.display = "none";
      loadGA();
    });

    rejectBtn?.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "rejected");
      banner.style.display = "none";
    });
  }

  // If already accepted, load GA immediately
  if (localStorage.getItem(CONSENT_KEY) === "accepted") {
    loadGA();
  }

  // =========================
  // Header scrolled state (premium blur)
  // =========================
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // =========================
  // Reveal on scroll (ONLY elements that already have .reveal in HTML)
  // =========================
  initReveal();
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
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

function initReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (!revealEls.length) return;

  // If reduced motion, show everything immediately
  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Fallback if IntersectionObserver not supported
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // reveal once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => io.observe(el));
}
