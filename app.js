// Google Apps Script Web App URL constant for Workshop Signup
// Paste your Web App URL below after deploying your Google Apps Script!
// ------------------------------------------------------------------
// Google Spreadsheet & Automated Confirmation Email Script Guide:
// 1. Log in to Google with stemcalifornia@gmail.com so emails are sent directly from stemcalifornia@gmail.com.
// 2. Open your Google Spreadsheet (where registrations are logged).
// 3. Click Extensions > Apps Script.
// 4. Replace all code in Code.gs with the following script:
//
// function doPost(e) {
//   try {
//     var ss = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = ss.getSheetByName("Workshop_Registration") || ss.getActiveSheet();
//     
//     // Parse parameters from JSON postData or URL parameters
//     var p = {};
//     if (e && e.postData && e.postData.contents) {
//       try { p = JSON.parse(e.postData.contents); } catch (err) { p = e.parameter || {}; }
//     } else {
//       p = e.parameter || {};
//     }
//     
//     // 1. Log to Google Sheet (Timestamp, Name, Email, School, Grade, Workshop Date, Notes)
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
//     // 2. Send Automated Dynamic Confirmation Email to Student from stemcalifornia@gmail.com
//     var emailAddress = p.email ? String(p.email).trim() : '';
//     if (emailAddress !== '') {
//       var studentName = p.name ? String(p.name).trim() : 'Student';
//       var workshopChoice = p.workshop_date ? String(p.workshop_date) : '';
//       
//       var subject = "You're Registered! CSI Workshop Confirmation";
//       var workshopTitle = "CSI Workshop";
//       var eventDate = "";
//       var eventTime = "";
//       var eventLocation = "";
//       var whatYouWillDo = "";
//       var whatToBring = "Curiosity and eagerness to learn!";
//       
//       if (workshopChoice.indexOf("AI Workshop") !== -1) {
//         subject = "You're Registered! CSI AI Workshop — Oct 24";
//         workshopTitle = "CSI AI Workshop: Learn to Build with AI";
//         eventDate = "Saturday, October 24, 2026";
//         eventTime = "10:00 AM – 12:00 PM PDT";
//         eventLocation = "Greenhouse Room, San Lorenzo Library (395 Paseo Grande, San Lorenzo, CA 94580)";
//         whatYouWillDo = "<ul style='margin: 0; padding-left: 20px; line-height: 1.7;'><li style='margin-bottom: 4px;'>Hands-on artificial intelligence & machine learning fundamentals</li><li style='margin-bottom: 4px;'>Interactive AI tool building & prompt engineering</li><li style='margin-bottom: 0;'>Creating your own AI-powered project guided by experienced student mentors</li></ul>";
//         whatToBring = "<ul style='margin: 0; padding-left: 20px; line-height: 1.7;'><li style='margin-bottom: 4px;'>A laptop or tablet (if available; loaners available on site if needed)</li><li style='margin-bottom: 0;'>Curiosity for building with modern AI tools!</li></ul>";
//       } else if (workshopChoice.indexOf("Chem Workshop") !== -1) {
//         subject = "You're Registered! CSI Chemistry Workshop — Nov 15";
//         workshopTitle = "CSI Chemistry Workshop: Hands-on Experiments & Keynote Speakers";
//         eventDate = "Sunday, November 15, 2026";
//         eventTime = "2:30 PM – 4:30 PM PST";
//         eventLocation = "CSI Workshop Venue (Bay Area — specific room details sent closer to the event)";
//         whatYouWillDo = "<ul style='margin: 0; padding-left: 20px; line-height: 1.7;'><li style='margin-bottom: 4px;'>Hands-on chemistry demonstrations & exciting lab experiments</li><li style='margin-bottom: 4px;'>Keynote talks & interactive Q&A with guest speakers in chemistry & STEM</li><li style='margin-bottom: 0;'>Interactive group science challenges and giveaways</li></ul>";
//         whatToBring = "<ul style='margin: 0; padding-left: 20px; line-height: 1.7;'><li style='margin-bottom: 4px;'>Closed-toe shoes (required for safety during experiments)</li><li style='margin-bottom: 0;'>Clothes that can get a little messy during demonstrations</li></ul>";
//       } else {
//         subject = "You're Registered! CSI Workshop Confirmation";
//         workshopTitle = "CSI Workshop";
//         eventDate = workshopChoice;
//         eventTime = "See workshop schedule";
//         eventLocation = "California STEM Innovators Venue";
//         whatYouWillDo = "<p style='margin:0;'>Exciting hands-on STEM activities, guided experiments, and mentoring!</p>";
//       }
//       
//       var htmlBody = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         </head>
//         <body style="margin: 0; padding: 0; background-color: #F5F5F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0A0A0A; -webkit-font-smoothing: antialiased;">
//           <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F5F5F2; padding: 32px 12px;">
//             <tr>
//               <td align="center">
//                 <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #FFFFFF; border: 2px solid #0A0A0A; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);">
//                   
//                   <!-- Top Accent Bar -->
//                   <tr>
//                     <td style="height: 6px; background-color: #CF142B;"></td>
//                   </tr>
//
//                   <!-- CSI Brand Header -->
//                   <tr>
//                     <td style="padding: 24px 30px; border-bottom: 2px solid #0A0A0A; background-color: #FFFFFF;">
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
//                         <tr>
//                           <td style="vertical-align: middle; width: 52px;">
//                             <img src="https://californiasteminnovators.org/image.png" alt="CSI Logo" width="48" height="48" style="display: block; border: 0; width: 48px; height: 48px; border-radius: 6px;" />
//                           </td>
//                           <td style="vertical-align: middle; padding-left: 14px;">
//                             <span style="display: block; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; color: #0A0A0A; line-height: 1.0;">CSI</span>
//                             <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #CF142B; font-weight: 800; margin-top: 3px;">California STEM Innovators</span>
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//
//                   <!-- Main Content Container -->
//                   <tr>
//                     <td style="padding: 30px; color: #0A0A0A; font-size: 15px; line-height: 1.6;">
//                       
//                       <p style="margin: 0 0 18px 0; font-size: 16px; font-weight: 700; color: #0A0A0A;">
//                         Hi \${studentName},
//                       </p>
//                       
//                       <p style="margin: 0 0 24px 0; font-size: 15px; color: #0A0A0A; line-height: 1.6;">
//                         Thanks for registering for the <strong>\${workshopTitle}</strong> hosted by California STEM Innovators (CSI)! We're thrilled to have you join us.
//                       </p>
//
//                       <!-- Box 1: EVENT DETAILS -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 2px solid #0A0A0A; border-left: 6px solid #CF142B; border-radius: 6px; margin-bottom: 20px; background-color: #FBFBFA;">
//                         <tr>
//                           <td style="padding: 16px 20px;">
//                             <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #CF142B; margin-bottom: 10px;">EVENT DETAILS</div>
//                             <p style="margin: 0 0 6px 0; font-size: 14.5px; color: #0A0A0A;"><strong>Date:</strong> \${eventDate}</p>
//                             <p style="margin: 0 0 6px 0; font-size: 14.5px; color: #0A0A0A;"><strong>Time:</strong> \${eventTime}</p>
//                             <p style="margin: 0; font-size: 14.5px; color: #0A0A0A;"><strong>Location:</strong> \${eventLocation}</p>
//                           </td>
//                         </tr>
//                       </table>
//
//                       <!-- Box 2: WHAT YOU WILL DO -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             WHAT YOU WILL DO
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A;">
//                             \${whatYouWillDo}
//                           </td>
//                         </tr>
//                       </table>
//
//                       <!-- Box 3: WHAT TO BRING / WEAR -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             WHAT TO BRING / WEAR
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A;">
//                             \${whatToBring}
//                           </td>
//                         </tr>
//                       </table>
//
//                       <!-- Box 4: COMMUNITY & DISCORD -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             JOIN OUR DISCORD COMMUNITY
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Make sure to join our Discord community for real-time workshop updates, resources, and Q&amp;A: <br/>
//                             <a href="https://discord.gg/dVgQkf4YHT" style="color: #CF142B; font-weight: 700; text-decoration: underline;">https://discord.gg/dVgQkf4YHT</a>
//                           </td>
//                         </tr>
//                       </table>
//
//                       <!-- Box 5: QUESTIONS? -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 24px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             QUESTIONS?
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Reach out to us anytime at <a href="mailto:stemcalifornia@gmail.com" style="color: #CF142B; font-weight: 700; text-decoration: underline;">stemcalifornia@gmail.com</a>.
//                           </td>
//                         </tr>
//                       </table>
//
//                       <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 700; color: #0A0A0A;">
//                         We can't wait to see you there!
//                       </p>
//
//                       <p style="margin: 0; font-size: 14.5px; color: #0A0A0A; line-height: 1.5;">
//                         Best,<br/>
//                         <strong style="color: #0A0A0A;">California STEM Innovators (CSI)</strong><br/>
//                         <a href="https://californiasteminnovators.org" style="color: #CF142B; text-decoration: none; font-weight: 700;">californiasteminnovators.org</a>
//                       </p>
//
//                     </td>
//                   </tr>
//
//                   <!-- Footer Bar -->
//                   <tr>
//                     <td style="padding: 16px 30px; background-color: #0A0A0A; text-align: center; font-size: 12px; color: #FFFFFF; font-weight: 600;">
//                       California STEM Innovators • Unlocking STEM for every student
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
//       var plainBody = "Hi " + studentName + ",\n\n" +
//         "Thanks for registering for the " + workshopTitle + " hosted by California STEM Innovators (CSI)! We're excited to have you join us.\n\n" +
//         "EVENT DETAILS\n" +
//         "Date: " + eventDate + "\n" +
//         "Time: " + eventTime + "\n" +
//         "Location: " + eventLocation + "\n\n" +
//         "JOIN OUR DISCORD COMMUNITY\n" +
//         "https://discord.gg/dVgQkf4YHT\n\n" +
//         "QUESTIONS?\n" +
//         "Reach out to us at stemcalifornia@gmail.com with any questions.\n\n" +
//         "We can't wait to see you there!\n\n" +
//         "Best,\n" +
//         "California STEM Innovators (CSI)\n" +
//         "https://californiasteminnovators.org";
//
//       MailApp.sendEmail(emailAddress, subject, plainBody, {
//         name: "California STEM Innovators",
//         replyTo: "stemcalifornia@gmail.com",
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
// 5. Click Deploy > Manage deployments > Click the Edit Pencil > Select 'New version' > Click Deploy.
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
document.querySelectorAll(".workshop-card[data-workshop]").forEach((element) => {
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

    // 2. Client-side validation
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
      if (valErr) {
        valErr.hidden = false;
        valErr.textContent = "⚠️ Please fill out all required fields with a valid email address.";
      }
      if (!nameInput || !nameInput.value.trim()) nameInput && nameInput.focus();
      else if (!emailInput || !emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) emailInput && emailInput.focus();
      else if (!schoolInput || !schoolInput.value.trim()) schoolInput && schoolInput.focus();
      else if (!gradeSelect || !gradeSelect.value) gradeSelect && gradeSelect.focus();
      else if (!dateSelect || !dateSelect.value) dateSelect && dateSelect.focus();
      return;
    }

    // 3. Disable submit button & show loading state to prevent double-submits
    const originalBtnText = signupSubmitBtn ? signupSubmitBtn.innerHTML : "Complete Registration →";
    if (signupSubmitBtn) {
      signupSubmitBtn.disabled = true;
      signupSubmitBtn.innerHTML = "Signing up...";
    }

    // 4. Build clean JSON payload
    const notesInput = signupForm.querySelector('[name="notes"]');
    const payload = {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      school: schoolInput ? schoolInput.value.trim() : "",
      grade: gradeSelect ? gradeSelect.value : "",
      workshop_date: dateSelect ? dateSelect.value : "",
      notes: notesInput ? notesInput.value.trim() : ""
    };

    try {
      // 5. POST payload to Google Apps Script Web App URL with mode: 'no-cors'
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
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



