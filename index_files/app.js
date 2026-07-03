// =========================
// SALT & LUX — SPRINT 7+ BEHAVIOR ENGINE
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // STATE
  // =========================

  let lastScrollY = window.scrollY;
  let ticking = false;

  const nav = document.querySelector(".ribbon-nav");
  const navLinks = document.querySelectorAll(".ribbon-btn");
  const sections = document.querySelectorAll("section");

  // =========================
  // 1. REVEAL SYSTEM (OPTIMIZED)
  // =========================

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });


  // =========================
  // 2. SMOOTH SCROLL (SINGLE SYSTEM)
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
  // 3. ACTIVE SECTION DETECTION (ROBUST)
  // =========================

  function getCurrentSection() {
    let current = "";

    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        current = section.id;
      }
    });

    return current;
  }


  // =========================
  // 4. NAV BEHAVIOR ENGINE
  // =========================

  function updateNav(scrollY) {

    // --- direction detection ---
    const scrollingDown = scrollY > lastScrollY;

    // --- background intensity shift ---
    if (nav) {
      if (scrollY > 80) {
        nav.style.background = "rgba(255,255,255,.28)";
        nav.style.backdropFilter = "blur(20px)";
      } else {
        nav.style.background = "rgba(252,252,250,.55)";
        nav.style.backdropFilter = "blur(12px)";
      }

      // --- auto-hide on scroll down ---
      if (scrollingDown && scrollY > 200) {
        nav.style.transform = "translateY(-110%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
    }

    // --- active link system ---
    const activeSection = getCurrentSection();

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${activeSection}`) {
        link.classList.add("active");
      }
    });

    lastScrollY = scrollY;
  }


  // =========================
  // 5. SCROLL ENGINE (THROTTLED VIA RAF)
  // =========================

  function onScroll() {
    const scrollY = window.scrollY;

    updateNav(scrollY);
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });


  // =========================
  // 6. BEFORE / AFTER SLIDER
  // =========================

  const slider = document.querySelector(".slider");
  const after = document.querySelector(".after");

  if (slider && after) {
    slider.addEventListener("input", (e) => {
      after.style.width = `${e.target.value}%`;
    });
  }


  // =========================
  // 7. GLASS CARD MICRO-INTERACTION (DESKTOP ONLY)
  // =========================

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const cards = document.querySelectorAll(".glass-card");

  if (!isTouch) {
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
