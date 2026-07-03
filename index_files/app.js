// =========================
// SALT & LUX — INTERACTION ENGINE
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 1. REVEAL SYSTEM
  // =========================

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // performance improvement
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // =========================
  // 2. SMOOTH SCROLL (SINGLE SOURCE OF TRUTH)
  // =========================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  // =========================
  // 3. NAV SCROLL STATE + GLASS INTENSITY
  // =========================

  const nav = document.querySelector(".ribbon-nav");
  const navLinks = document.querySelectorAll(".ribbon-btn");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // --- NAV BACKGROUND SHIFT ---
    if (nav) {
      if (scrollY > 50) {
        nav.style.background = "rgba(255,255,255,.25)";
      } else {
        nav.style.background = "rgba(252,252,250,.55)";
      }
    }

    // --- ACTIVE SECTION DETECTION ---
    let currentSection = "";

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });


  // =========================
  // 4. BEFORE / AFTER SLIDER
  // =========================

  const slider = document.querySelector(".slider");
  const after = document.querySelector(".after");

  if (slider && after) {
    slider.addEventListener("input", (e) => {
      after.style.width = `${e.target.value}%`;
    });
  }


  // =========================
  // 5. GLASS CARD MICRO-INTERACTION (DESKTOP ONLY)
  // =========================

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  const cards = document.querySelectorAll(".glass-card");

  if (!isTouchDevice) {
    cards.forEach(card => {

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;

        card.style.transform =
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

    });
  }

});
