// Google Apps Script Web App URL constant for Workshop Signup
// Paste your Web App URL below after deploying your Google Apps Script!
// ------------------------------------------------------------------
// Google Spreadsheet & Automated Confirmation Email Script Guide:
// 1. Open your Google Spreadsheet (where registrations are logged).
// 2. Click Extensions > Apps Script.
// 3. Replace all code in Code.gs with the following script:
//
// function doPost(e) {
//   try {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     var p = e.parameter;
//     
//     // 1. Log to Google Sheet
//     sheet.appendRow([
//       new Date(), 
//       p.name || '', 
//       p.email || '', 
//       p.school || '', 
//       p.grade || '', 
//       p.workshop_date || '', 
//       p.notes || ''
//     ]);
//
//     // 2. Send Automated Confirmation Email to Student
//     if (p.email && p.email.trim() !== '') {
//       var studentName = p.name ? p.name.trim() : 'Student';
//       var subject = "🎉 Registration Confirmed: CSI Biology Workshop!";
//       
//       var htmlBody = `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
//           <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
//             <h1 style="margin: 0; font-size: 24px; font-weight: 700;">California STEM Innovators</h1>
//             <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 14px;">Workshop Registration Confirmation</p>
//           </div>
//           
//           <div style="padding: 30px 24px; background-color: #ffffff;">
//             <h2 style="margin-top: 0; color: #0f172a;">You're in, ${studentName}! 🎉</h2>
//             <p style="font-size: 15px; line-height: 1.6; color: #334155;">
//               Thank you for registering for the <strong>CSI Biology Workshop</strong>. We've reserved your spot! Below are all the details for the upcoming event:
//             </p>
//             
//             <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
//               <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #1e293b;">📌 Event Details</h3>
//               <p style="margin: 6px 0; font-size: 14px;"><strong>Workshop:</strong> CSI Biology Workshop</p>
//               <p style="margin: 6px 0; font-size: 14px;"><strong>Date:</strong> Saturday, September 19, 2026</p>
//               <p style="margin: 6px 0; font-size: 14px;"><strong>Location:</strong> Union City Library, 34007 Alvarado-Niles Road, Union City, CA</p>
//               <p style="margin: 6px 0; font-size: 14px;"><strong>Cost:</strong> <span style="color: #16a34a; font-weight: bold;">$0 — All Materials Included!</span></p>
//             </div>
//
//             <h3 style="color: #1e293b; font-size: 16px; margin-top: 24px;">🔬 What You'll Be Doing</h3>
//             <ul style="padding-left: 20px; color: #334155; line-height: 1.6; font-size: 14px;">
//               <li><strong>Extract DNA:</strong> Hands-on extraction of real genomic DNA.</li>
//               <li><strong>Transform Bacteria:</strong> Introduce new genes into bacterial cells.</li>
//               <li><strong>Explore Biotechnology:</strong> Learn cutting-edge biotech concepts guided by student mentors.</li>
//             </ul>
//
//             <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 16px; font-size: 13px; color: #64748b; line-height: 1.5;">
//               <p style="margin: 0 0 8px 0;"><strong>Your Info On File:</strong></p>
//               <p style="margin: 4px 0;">Name: ${studentName}</p>
//               <p style="margin: 4px 0;">School: ${p.school || 'N/A'}</p>
//               <p style="margin: 4px 0;">Grade: ${p.grade || 'N/A'}</p>
//             </div>
//
//             <p style="font-size: 14px; color: #475569; margin-top: 24px; line-height: 1.6;">
//               If you have any questions, accessibility requests, or need to adjust your registration, simply reply to this email or contact us at <a href="mailto:stemcalifornia@gmail.com" style="color: #2563eb;">stemcalifornia@gmail.com</a>.
//             </p>
//           </div>
//           
//           <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
//             © 2026 California STEM Innovators • <a href="https://californiasteminnovators.org/" style="color: #2563eb; text-decoration: none;">californiasteminnovators.org</a>
//           </div>
//         </div>
//       `;
//
//       var plainBody = "Hi " + studentName + ",\n\n" +
//         "You're in! We've received your registration for the CSI Biology Workshop.\n\n" +
//         "EVENT DETAILS:\n" +
//         "• Workshop: CSI Biology Workshop\n" +
//         "• Date: Saturday, September 19, 2026\n" +
//         "• Location: Union City Library, 34007 Alvarado-Niles Road, Union City, CA\n" +
//         "• Cost: $0 (All Materials Included)\n\n" +
//         "WHAT YOU'LL DO:\n" +
//         "• Extract DNA\n" +
//         "• Transform Bacteria\n" +
//         "• Explore Biotechnology\n\n" +
//         "YOUR INFO:\n" +
//         "• Name: " + studentName + "\n" +
//         "• School: " + (p.school || 'N/A') + "\n" +
//         "• Grade: " + (p.grade || 'N/A') + "\n\n" +
//         "Questions? Contact us at stemcalifornia@gmail.com.\n\n" +
//         "California STEM Innovators\n" +
//         "https://californiasteminnovators.org/";
//
//       MailApp.sendEmail({
//         to: p.email.trim(),
//         subject: subject,
//         body: plainBody,
//         htmlBody: htmlBody
//       });
//     }
//
//     return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
//   } catch (error) {
//     return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
//   }
// }
//
// 4. Click Deploy > Manage deployments > Click the Edit Pencil > Select 'New version' > Click Deploy.
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

// Mobile navigation drawer controller
const navToggleBtn = document.getElementById("nav-toggle");
const navOverlay = document.getElementById("nav-overlay");
const primaryNav = document.getElementById("primary-nav");

const toggleMobileMenu = (forceState) => {
  const isOpen = forceState !== undefined ? forceState : !document.body.classList.contains("nav-open");
  document.body.classList.toggle("nav-open", isOpen);
  if (navToggleBtn) {
    navToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggleBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  }
};

if (navToggleBtn) {
  navToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

if (navOverlay) {
  navOverlay.addEventListener("click", () => toggleMobileMenu(false));
}

if (primaryNav) {
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
    toggleMobileMenu(false);
  }
});

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

// Deter casual Inspect Element & Right-Clicking
document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  // Block F12 key
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }
  // Block Ctrl+Shift+I / Cmd+Option+I (Inspect)
  // Block Ctrl+Shift+J / Cmd+Option+J (Console)
  // Block Ctrl+Shift+C / Cmd+Option+C (Inspect Element selector)
  // Block Ctrl+U / Cmd+Option+U (View Source)
  // Block Ctrl+S / Cmd+S (Save Page)
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modifier = isMac ? (e.metaKey && e.altKey) : (e.ctrlKey && e.shiftKey);
  const key = e.key.toUpperCase();

  if (modifier && (key === "I" || key === "J" || key === "C" || key === "U")) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && key === "U") {
    e.preventDefault();
    return false;
  }
});


