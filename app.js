// Nav hide on scroll down, show on scroll up
const nav = document.querySelector('.nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  nav.classList.toggle('hidden', y > 80 && y > lastY);
  lastY = y;
}, { passive: true });

// Scroll-triggered reveal for sections
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(
  ".sec-head, .pillars li, .program, .ana-card, .kit-card, .res-col, .event, .voice, .join-card, .hero-title, .hero-lede, .hero-actions, .hero-stats"
).forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${Math.min(i * 30, 180)}ms`;
  io.observe(el);
});


// Filter chip toggle (visual only)
document.querySelectorAll(".lib-filters .filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lib-filters .filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Pre-select contact form role when clicking join card links
document.querySelectorAll(".linky[data-role]").forEach((link) => {
  link.addEventListener("click", () => {
    const role = link.dataset.role;
    const select = document.querySelector(".contact-form select");
    if (select) {
      [...select.options].forEach((opt) => {
        if (opt.text === role) opt.selected = true;
      });
    }
  });
});

// Contact form: submit via fetch so the page doesn't redirect to Formspree
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ack = contactForm.querySelector(".form-ack");
    const err = contactForm.querySelector(".form-err");
    ack.hidden = true;
    err.hidden = true;
    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        ack.hidden = false;
        contactForm.reset();
      } else {
        err.hidden = false;
      }
    } catch {
      err.hidden = false;
    }
  });
}
