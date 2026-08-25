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
//     var p = e.parameter || {};
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
//     var emailAddress = p.email ? String(p.email).trim() : '';
//     if (emailAddress !== '') {
//       var studentName = p.name ? String(p.name).trim() : 'Student';
//       var subject = "Registration Confirmed: CSI Biology Workshop";
//       
//       var htmlBody = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         </head>
//         <body style="margin: 0; padding: 0; background-color: #F9F9F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0A0A0A; -webkit-font-smoothing: antialiased;">
//           <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F9F9F7; padding: 40px 16px;">
//             <tr>
//               <td align="center">
//                 <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E5E5E0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
//                   
//                   <!-- CSI Crimson Accent Bar -->
//                   <tr>
//                     <td style="height: 4px; background-color: #CF142B;"></td>
//                   </tr>
//
//                   <!-- CSI Brand Header -->
//                   <tr>
//                     <td style="padding: 32px 36px 24px 36px; border-bottom: 1px solid #F0F0EC;">
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
//                         <tr>
//                           <td style="vertical-align: middle; width: 48px;">
//                             <img src="https://californiasteminnovators.org/image.png" alt="CSI Logo" width="44" height="44" style="display: block; border: 0; width: 44px; height: 44px; border-radius: 6px;" />
//                           </td>
//                           <td style="vertical-align: middle; padding-left: 12px;">
//                             <span style="display: block; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #0A0A0A; line-height: 1.1;">CSI</span>
//                             <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #757570; font-weight: 600; margin-top: 2px;">California STEM Innovators</span>
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//
//                   <!-- Main Content -->
//                   <tr>
//                     <td style="padding: 36px 36px 28px 36px;">
//                       <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0A0A0A; letter-spacing: -0.02em; line-height: 1.3;">
//                         Workshop Registration Confirmed
//                       </h1>
//                       
//                       <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #333330;">
//                         Hello ${studentName},<br/><br/>
//                         Your registration for the <strong>CSI Biology Workshop</strong> has been confirmed. We look forward to seeing you!
//                       </p>
//
//                       <!-- Event Summary Card -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FBFBFA; border: 1px solid #EBEBE6; border-left: 4px solid #CF142B; border-radius: 4px; margin-bottom: 28px;">
//                         <tr>
//                           <td style="padding: 20px 24px;">
//                             <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #CF142B; font-weight: 700;">
//                               Event Details
//                             </p>
//                             <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.6; color: #1F1D1A;">
//                               <tr>
//                                 <td style="padding: 4px 0; font-weight: 600; width: 95px; color: #757570;">Program:</td>
//                                 <td style="padding: 4px 0; font-weight: 600; color: #0A0A0A;">CSI Biology Workshop</td>
//                               </tr>
//                               <tr>
//                                 <td style="padding: 4px 0; font-weight: 600; color: #757570;">Date:</td>
//                                 <td style="padding: 4px 0; color: #0A0A0A;">Saturday, September 19, 2026</td>
//                               </tr>
//                               <tr>
//                                 <td style="padding: 4px 0; font-weight: 600; color: #757570; vertical-align: top;">Location:</td>
//                                 <td style="padding: 4px 0; color: #0A0A0A;">Union City Library<br/><span style="color: #666660; font-size: 13px;">34007 Alvarado-Niles Road, Union City, CA</span></td>
//                               </tr>
//                               <tr>
//                                 <td style="padding: 4px 0; font-weight: 600; color: #757570;">Admission:</td>
//                                 <td style="padding: 4px 0; font-weight: 600; color: #CF142B;">Free ($0) — All Materials Included</td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//
//                       <!-- Workshop Curriculum -->
//                       <h2 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #0A0A0A; font-weight: 700;">
//                         Workshop Curriculum
//                       </h2>
//                       <ul style="margin: 0 0 28px 0; padding-left: 18px; font-size: 14px; line-height: 1.7; color: #333330;">
//                         <li style="margin-bottom: 6px;"><strong>DNA Extraction:</strong> Extract genomic DNA using lab protocols.</li>
//                         <li style="margin-bottom: 6px;"><strong>Bacterial Transformation:</strong> Introduce engineered plasmids into bacteria.</li>
//                         <li style="margin-bottom: 6px;"><strong>Biotechnology Concepts:</strong> Explore modern lab techniques guided by student mentors.</li>
//                       </ul>
//
//                       <!-- Student Info -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #EBEBE6; padding-top: 20px;">
//                         <tr>
//                           <td>
//                             <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #757570; font-weight: 600;">Registrant Info</p>
//                             <p style="margin: 0; font-size: 13px; color: #333330; line-height: 1.5;">
//                               <strong>Name:</strong> ${studentName}<br/>
//                               <strong>School:</strong> ${p.school || 'N/A'}<br/>
//                               <strong>Grade:</strong> ${p.grade || 'N/A'}
//                             </p>
//                           </td>
//                         </tr>
//                       </table>
//
//                       <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.6; color: #666660;">
//                         If you have questions or need to modify your registration, please reply directly to this email or contact us at <a href="mailto:stemcalifornia@gmail.com" style="color: #CF142B; text-decoration: underline;">stemcalifornia@gmail.com</a>.
//                       </p>
//                     </td>
//                   </tr>
//
//                   <!-- Footer -->
//                   <tr>
//                     <td style="padding: 20px 36px; background-color: #F5F5F2; border-top: 1px solid #EBEBE6; text-align: center; font-size: 12px; color: #757570;">
//                       <strong>California STEM Innovators</strong> • Unlocking STEM for every student<br/>
//                       <a href="https://californiasteminnovators.org/" style="color: #CF142B; text-decoration: none; font-weight: 500;">californiasteminnovators.org</a>
//                     </td>
//                   </tr>
//
//                 </table>
//               </td>
//             </tr>
//           </table>
//         </body>
//         </html>
//       `;
//
//       var plainBody = "Hello " + studentName + ",\n\n" +
//         "Your registration for the CSI Biology Workshop has been confirmed.\n\n" +
//         "EVENT DETAILS:\n" +
//         "• Program: CSI Biology Workshop\n" +
//         "• Date: Saturday, September 19, 2026\n" +
//         "• Location: Union City Library, 34007 Alvarado-Niles Road, Union City, CA\n" +
//         "• Admission: Free ($0) — All Materials Included\n\n" +
//         "CURRICULUM:\n" +
//         "• DNA Extraction\n" +
//         "• Bacterial Transformation\n" +
//         "• Biotechnology Concepts\n\n" +
//         "REGISTRANT INFO:\n" +
//         "• Name: " + studentName + "\n" +
//         "• School: " + (p.school || 'N/A') + "\n" +
//         "• Grade: " + (p.grade || 'N/A') + "\n\n" +
//         "Questions? Reply to this email or contact stemcalifornia@gmail.com.\n\n" +
//         "California STEM Innovators\n" +
//         "https://californiasteminnovators.org/";
//
//       MailApp.sendEmail(emailAddress, subject, plainBody, { htmlBody: htmlBody });
//     }
//
//     return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
//   } catch (error) {
//     return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
//   }
// }
//
// function testEmail() {
//   var email = Session.getActiveUser().getEmail();
//   MailApp.sendEmail(email, "Test Email", "Authorization test!");
// }
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

    // 2. Client-side validation (including mandatory waiver file upload)
    const nameInput = signupForm.querySelector('[name="name"]');
    const emailInput = signupForm.querySelector('[name="email"]');
    const schoolInput = signupForm.querySelector('[name="school"]');
    const gradeSelect = signupForm.querySelector('[name="grade"]');
    const dateSelect = signupForm.querySelector('[name="workshop_date"]');
    const waiverInput = signupForm.querySelector('#signup-waiver');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasWaiver = waiverInput && waiverInput.files && waiverInput.files.length > 0;
    const isValid =
      nameInput && nameInput.value.trim() !== "" &&
      emailInput && emailRegex.test(emailInput.value.trim()) &&
      schoolInput && schoolInput.value.trim() !== "" &&
      gradeSelect && gradeSelect.value !== "" &&
      dateSelect && dateSelect.value !== "" &&
      hasWaiver;

    if (!isValid) {
      if (valErr) {
        valErr.hidden = false;
        if (!hasWaiver) {
          valErr.textContent = "⚠️ Please attach your completed & signed participant waiver before submitting registration.";
        } else {
          valErr.textContent = "⚠️ Please fill out all required fields with a valid email address.";
        }
      }
      if (!nameInput || !nameInput.value.trim()) nameInput && nameInput.focus();
      else if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) emailInput && emailInput.focus();
      else if (!schoolInput || !schoolInput.value.trim()) schoolInput && schoolInput.focus();
      else if (!gradeSelect || !gradeSelect.value) gradeSelect && gradeSelect.focus();
      else if (!dateSelect || !dateSelect.value) dateSelect && dateSelect.focus();
      else if (!hasWaiver) waiverInput && waiverInput.focus();
      return;
    }

    // 3. Disable submit button & show loading state to prevent double-submits
    const originalBtnText = signupSubmitBtn ? signupSubmitBtn.innerHTML : "Complete Registration →";
    if (signupSubmitBtn) {
      signupSubmitBtn.disabled = true;
      signupSubmitBtn.innerHTML = "Uploading waiver & signing up...";
    }

    // 4. Convert waiver file to base64 if attached
    let waiverFileName = "";
    let waiverBase64 = "";
    if (hasWaiver && waiverInput.files[0]) {
      const file = waiverInput.files[0];
      waiverFileName = file.name;
      try {
        waiverBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => resolve(evt.target.result);
          reader.onerror = () => resolve("");
          reader.readAsDataURL(file);
        });
      } catch (fileErr) {
        console.warn("Waiver file read error:", fileErr);
      }
    }

    // 5. Encode form data as application/x-www-form-urlencoded
    const formData = new FormData(signupForm);
    const params = new URLSearchParams(formData);
    if (waiverFileName) params.append("waiver_name", waiverFileName);
    if (waiverBase64) params.append("waiver_base64", waiverBase64);
    const bodyPayload = params.toString();

    try {
      // 6. POST payload to Google Apps Script Web App URL with mode: 'no-cors'
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


