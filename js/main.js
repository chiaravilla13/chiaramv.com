(() => {
  // Set active nav item based on current path
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Optional: show "back to top" button if present
  const topBtn = document.querySelector("[data-top]");
  if (!topBtn) return;

  const toggle = () => {
    topBtn.style.display = window.scrollY > 600 ? "inline-flex" : "none";
  };
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
