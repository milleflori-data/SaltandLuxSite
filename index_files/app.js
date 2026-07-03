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

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observer.observe(el));

const slider = document.querySelector(".slider");
const after = document.querySelector(".after");

if (slider && after) {
  slider.addEventListener("input", (e) => {
    after.style.width = e.target.value + "%";
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

document.querySelectorAll(".glass-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".ribbon-btn");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.clientHeight;

    if (pageYOffset >= top && pageYOffset < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
