document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Initial loading animation
  const tl = gsap.timeline();

  tl.from(".nav-glass", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  })
    .from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5")
    .from(".hero-badges span", {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

  // Section reveal animations
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    gsap.from(section.querySelectorAll(".section-title, .summary-card, .comp-card, .project-card, .stats-card, .lang-map, .strategy-item"), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });
  });

  // Form Handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button");
      const originalText = submitBtn.textContent;

      // Simulate transmission
      submitBtn.disabled = true;
      submitBtn.textContent = "TRANSMITTING...";

      setTimeout(() => {
        showToast("SECURE COMMUNICATION ESTABLISHED. RESPONSE PENDING.");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Toast logic
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("toast-show");

    setTimeout(() => {
      toast.classList.remove("toast-show");
    }, 5000);
  }

  // Scroll progress color shift (Optional)
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled > 50) {
      document.querySelector(".nav-glass").style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      document.querySelector(".nav-glass").style.background = "rgba(0, 0, 0, 0.8)";
    }
  });
});
