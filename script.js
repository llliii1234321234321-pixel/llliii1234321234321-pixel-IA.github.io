// Change the page text in index.html; this file handles navigation and motion.
document.documentElement.classList.add("js-ready");

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".theme-toggle");
const navAnchors = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
  themeButton.querySelector(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((anchor) => {
      const isActive = anchor.getAttribute("href") === `#${entry.target.id}`;
      anchor.classList.toggle("is-active", isActive);
      if (isActive) {
        anchor.setAttribute("aria-current", "location");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
  });
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: 0
});

sections.forEach((section) => activeObserver.observe(section));
