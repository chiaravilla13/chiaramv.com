/* =========================================================
   ARTICLES SYSTEM — JS leggero
   1) calcolo reading time
   2) smooth scroll per indice interno
   3) evidenziazione sezione corrente nel TOC (opzionale)
   ========================================================= */

(function(){
  const articleBody = document.querySelector('[data-article-body]');
  const readingTarget = document.querySelector('[data-reading-time]');

  if (articleBody && readingTarget) {
    const text = articleBody.innerText.replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').length : 0;
    const minutes = Math.max(1, Math.round(words / 180));
    readingTarget.textContent = `${minutes} min di lettura`;
  }

  const tocLinks = document.querySelectorAll('[data-article-toc] a[href^="#"]');
  tocLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  if ('IntersectionObserver' in window && tocLinks.length > 0) {
    const sections = [...document.querySelectorAll('[data-article-section]')];
    const map = new Map(
      [...tocLinks].map(link => [link.getAttribute('href').slice(1), link])
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        map.forEach(link => link.classList.remove('is-current'));
        const current = map.get(id);
        if (current) current.classList.add('is-current');
      });
    }, {
      rootMargin: '-25% 0px -60% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }
})();
