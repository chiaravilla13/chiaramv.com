// =========================
// Risorse — JS
// 1) GA4 click tracking via data attributes
// 2) (optional) auto-active nav for /risorse/
// =========================

// 1) GA4 click tracking
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-ga-event]');
  if (!el) return;

  const eventName = el.getAttribute('data-ga-event');
  const label = el.getAttribute('data-ga-label') || '';

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: label,
      value: 1
    });
  }
});

// 2) Optional: set active nav link automatically for Risorse
(() => {
  try {
    const path = window.location.pathname;
    const isRisorse = path.includes('/risorse/');
    if (!isRisorse) return;

    // prova a trovare un link che punti a /risorse/ o risorse/
    const links = document.querySelectorAll('nav a[href]');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes('risorse')) a.classList.add('is-active');
    });
  } catch (_) {}
})();
