// Google Apps Script Web App URL constant for Workshop Signup
// Paste your Web App URL below after deploying your Google Apps Script!
// ------------------------------------------------------------------
// Quick Google Spreadsheet Integration Guide:
// 1. Create a Google Spreadsheet and name column headers in Row 1:
//    Timestamp | Full Name | Email Address | School | Grade Level | Workshop Date | Notes
// 2. Open Extensions > Apps Script in Google Sheets.
// 3. Paste the following script:
//
//    function doPost(e) {
//      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//      var p = e.parameter;
//      sheet.appendRow([new Date(), p.name || '', p.email || '', p.school || '', p.grade || '', p.workshop_date || '', p.notes || '']);
//      return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
//    }
//
// 4. Click Deploy > New deployment > Web App (Execute as: "Me", Access: "Anyone").
// 5. Copy the deployment Web App URL and paste it into SCRIPT_URL below!
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJ_NKlbEl_Oi1TO5xTBZiHyBLUfIHZkfJe0rdQFvxYsKe74D464iDAPMMAHMFDQCeR/exec';

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
  ".sec-head, .pillars li, .program, .ana-card, .kit-card, .res-col, .event, .voice, .join-card, .hero-title, .hero-lede, .hero-actions, .hero-stats, .signup-section, .signup-card, .workshop-card"
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

// Pre-select workshop date when clicking workshop card buttons
document.querySelectorAll(".workshop-card[data-workshop], .select-ws-btn").forEach((element) => {
  element.addEventListener("click", () => {
    const card = element.closest("[data-workshop]");
    if (card) {
      const workshopVal = card.dataset.workshop;
      const select = document.getElementById("signup-workshop-date");
      if (select) {
        [...select.options].forEach((opt) => {
          if (opt.value === workshopVal) opt.selected = true;
        });
      }
    }
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

// Workshop Signup Form Handler
const signupForm = document.getElementById("workshop-signup-form");
const signupAck = document.getElementById("signup-ack");
const signupSubmitBtn = document.getElementById("signup-submit-btn");

if (signupAck) {
  signupAck.hidden = true;
  signupAck.style.display = "none";
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valErr = signupForm.querySelector(".signup-val-err");
    const networkErr = signupForm.querySelector(".signup-err");
    if (valErr) valErr.hidden = true;
    if (networkErr) networkErr.hidden = true;

    // 1. Honeypot check for spam protection
    const hp = signupForm.querySelector('[name="website"]');
    if (hp && hp.value.trim() !== "") {
      signupForm.hidden = true;
      signupForm.style.display = "none";
      if (signupAck) {
        signupAck.hidden = false;
        signupAck.style.display = "flex";
      }
      return;
    }

    // 2. Basic client-side validation
    const nameInput = signupForm.querySelector('[name="name"]');
    const emailInput = signupForm.querySelector('[name="email"]');
    const schoolInput = signupForm.querySelector('[name="school"]');
    const gradeSelect = signupForm.querySelector('[name="grade"]');
    const dateSelect = signupForm.querySelector('[name="workshop_date"]');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
      nameInput && nameInput.value.trim() !== "" &&
      emailInput && emailRegex.test(emailInput.value.trim()) &&
      schoolInput && schoolInput.value.trim() !== "" &&
      gradeSelect && gradeSelect.value !== "" &&
      dateSelect && dateSelect.value !== "";

    if (!isValid) {
      if (valErr) valErr.hidden = false;
      if (!nameInput || !nameInput.value.trim()) nameInput && nameInput.focus();
      else if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) emailInput && emailInput.focus();
      else if (!schoolInput || !schoolInput.value.trim()) schoolInput && schoolInput.focus();
      else if (!gradeSelect || !gradeSelect.value) gradeSelect && gradeSelect.focus();
      else if (!dateSelect || !dateSelect.value) dateSelect && dateSelect.focus();
      return;
    }

    // 3. Disable submit button & show loading state to prevent double-submits
    const originalBtnText = signupSubmitBtn ? signupSubmitBtn.innerHTML : "Sign up for workshop →";
    if (signupSubmitBtn) {
      signupSubmitBtn.disabled = true;
      signupSubmitBtn.innerHTML = "Signing up...";
    }

    // 4. Encode form data as application/x-www-form-urlencoded
    const formData = new FormData(signupForm);
    const bodyPayload = new URLSearchParams(formData).toString();

    try {
      // 5. POST payload to Google Apps Script Web App URL with mode: 'no-cors'
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: bodyPayload
      });

      // Treat any non-throwing fetch response as success (no-cors response is opaque)
      signupForm.hidden = true;
      signupForm.style.display = "none";
      if (signupAck) {
        signupAck.hidden = false;
        signupAck.style.display = "flex";
      }
    } catch (err) {
      console.error("Signup submission error:", err);
      if (networkErr) networkErr.hidden = false;
      if (signupSubmitBtn) {
        signupSubmitBtn.disabled = false;
        signupSubmitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

// URL Parameter Parser for signup.html (Auto pre-selects workshop date)
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedWorkshop = urlParams.get("workshop");
  if (selectedWorkshop) {
    const select = document.getElementById("signup-workshop-date");
    if (select) {
      [...select.options].forEach((opt) => {
        if (opt.value === selectedWorkshop || opt.text.includes(selectedWorkshop)) {
          opt.selected = true;
        }
      });
    }
  }
});

// Floating Ad Banner Controller for index.html
const adBanner = document.getElementById("ad-banner");
const adCloseBtn = document.getElementById("ad-close-btn");
const adSignupBtn = document.getElementById("ad-signup-btn");

if (adBanner) {
  const showBanner = () => adBanner.classList.add("active");
  const hideBanner = () => adBanner.classList.remove("active");

  // Show floating ad banner after 900ms if not dismissed in this session
  if (!sessionStorage.getItem("csi_ad_dismissed")) {
    setTimeout(showBanner, 900);
  }

  if (adCloseBtn) {
    adCloseBtn.addEventListener("click", () => {
      hideBanner();
      sessionStorage.setItem("csi_ad_dismissed", "true");
    });
  }

  if (adSignupBtn) {
    adSignupBtn.addEventListener("click", () => {
      hideBanner();
      sessionStorage.setItem("csi_ad_dismissed", "true");
    });
  }
}

