// =========================
// SALT & LUX INTERACTIONS
// =========================

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));


// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});


// Nav glow on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".glass-nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(255,255,255,.25)";
  } else {
    nav.style.background = "rgba(255,255,255,.15)";
  }
});
