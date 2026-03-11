document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Initial loading animation
  const tl = gsap.timeline();

  tl.from(".nav-glass", {
    y: -80,
    duration: 0.8,
    ease: "power3.out"
  })
    .from(".hero-content", {
      y: 40,
      duration: 1,
      ease: "power3.out"
    }, "-=0.4")
    .from(".hero-badges span", {
      scale: 0.9,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(2)"
    }, "-=0.6");

  // Section reveal animations
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    // Target the main container or grid items
    const revealTargets = section.querySelectorAll(".summary-card, .comp-card, .project-card, .stats-card, .lang-map, .strategy-item, .contact-info, .contact-form, .arsenal-group");

    if (revealTargets.length > 0) {
      gsap.from(revealTargets, {
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none"
        },
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all"
      });
    }
  });

  // Ensure all triggers are calculated correctly after load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
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
