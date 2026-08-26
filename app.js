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
//     var ss = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = ss.getSheetByName("Workshop_Registration") || ss.getActiveSheet();
//     
//     // Parse parameters from either JSON postData or URL parameters
//     var p = {};
//     if (e && e.postData && e.postData.contents) {
//       try { p = JSON.parse(e.postData.contents); } catch (err) { p = e.parameter || {}; }
//     } else {
//       p = e.parameter || {};
//     }
//     
//     var waiverUrl = "No waiver uploaded";
//     
//     // Handle Waiver File Upload to Google Drive (if attached)
//     if (p.waiver_base64 && p.waiver_name) {
//       try {
//         var folderName = "CSI Workshop Waivers";
//         var folders = DriveApp.getFoldersByName(folderName);
//         var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
//         
//         var base64Data = String(p.waiver_base64);
//         var contentType = "application/octet-stream";
//         if (base64Data.indexOf("data:") === 0) {
//           var parts = base64Data.split(",");
//           contentType = parts[0].split(";")[0].replace("data:", "");
//           base64Data = parts[1];
//         }
//         
//         // Fix spaces in base64 if needed
//         base64Data = base64Data.replace(/ /g, "+");
//         
//         var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, (p.name || "Student") + " - " + p.waiver_name);
//         var file = folder.createFile(blob);
//         file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
//         waiverUrl = file.getUrl();
//       } catch (driveErr) {
//         waiverUrl = "Upload Error: " + driveErr.toString();
//       }
//     }
//
//     // 1. Log to Google Sheet (Matching Columns A-H: Timestamp, Name, Email, School, Grade, Workshop Date, Notes, Waiver)
//     sheet.appendRow([
//       new Date(), 
//       p.name || '', 
//       p.email || '', 
//       p.school || '', 
//       p.grade || '', 
//       p.workshop_date || '', 
//       p.notes || '',
//       waiverUrl
//     ]);
//
//     // 2. Send Automated Confirmation Email to Student
//     var emailAddress = p.email ? String(p.email).trim() : '';
//     if (emailAddress !== '') {
//       var studentName = p.name ? String(p.name).trim() : 'Student';
//       var subject = "You're Registered! CSI Biotechnology Workshop — Sep 19";
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
//                   <!-- Top Crimson Accent Bar -->
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
//                         Hi ${studentName},
//                       </p>
//                       
//                       <p style="margin: 0 0 24px 0; font-size: 15px; color: #0A0A0A; line-height: 1.6;">
//                         Thanks for registering <strong>${studentName}</strong> for the <strong>CSI Biotechnology Workshop: From DNA to Discovery</strong>, hosted by California STEM Innovators (CSI)! We're excited to have you join us.
//                       </p>
//
//                       <!-- Box 1: EVENT DETAILS -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 2px solid #0A0A0A; border-left: 6px solid #CF142B; border-radius: 6px; margin-bottom: 20px; background-color: #FBFBFA;">
//                         <tr>
//                           <td style="padding: 16px 20px;">
//                             <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #CF142B; margin-bottom: 10px;">EVENT DETAILS</div>
//                             <p style="margin: 0 0 6px 0; font-size: 14.5px; color: #0A0A0A;"><strong>Date:</strong> Saturday, September 19, 2026</p>
//                             <p style="margin: 0 0 6px 0; font-size: 14.5px; color: #0A0A0A;"><strong>Time:</strong> 3:00 PM – 6:00 PM PDT (please plan for pickup at 6:00 PM)</p>
//                             <p style="margin: 0; font-size: 14.5px; color: #0A0A0A;"><strong>Location:</strong> Union City Library, 34007 Alvarado Niles Rd, Union City, CA 94587</p>
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
//                             <p style="margin: 0 0 10px 0;">Students will get hands-on with real biotechnology techniques, including:</p>
//                             <ul style="margin: 0; padding-left: 20px; line-height: 1.7;">
//                               <li style="margin-bottom: 4px;">Extracting visible DNA from a strawberry (they'll take home a vial!)</li>
//                               <li style="margin-bottom: 4px;">A bacterial transformation lab using miniPCR's True Blue kit</li>
//                               <li style="margin-bottom: 0;">Micropipetting practice and a gel electrophoresis demo</li>
//                             </ul>
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
//                             <ul style="margin: 0; padding-left: 20px; line-height: 1.7;">
//                               <li style="margin-bottom: 4px;">Closed-toe shoes</li>
//                               <li style="margin-bottom: 0;">Clothes that can get a little messy</li>
//                             </ul>
//                           </td>
//                         </tr>
//                       </table>

//                       <!-- Box 4: WAIVER -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             WAIVER
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Good news — your signed waiver was already collected as part of registration, so there's nothing further needed here. If you need to update any information on it (allergies, emergency contact, etc.), just reply to this email.
//                           </td>
//                         </tr>
//                       </table>

//                       <!-- Box 5: FOOD & ALLERGIES -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             FOOD &amp; ALLERGIES
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Water will be provided. Snacks are still being finalized — we'll follow up with details closer to the event. Please note this workshop may involve strawberries or other foods; let us know if you have a related allergy.
//                           </td>
//                         </tr>
//                       </table>

//                       <!-- Box 6: DROP-OFF & PICKUP -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 20px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             DROP-OFF &amp; PICKUP
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Please plan to drop off a few minutes before 3:00 PM and pick up promptly at 5:00 PM from the Union City Library. A CSI facilitator will be present at check-in.
//                           </td>
//                         </tr>
//                       </table>

//                       <!-- Box 7: QUESTIONS? -->
//                       <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #0A0A0A; border-radius: 6px; margin-bottom: 24px; overflow: hidden;">
//                         <tr>
//                           <td style="background-color: #F5F5F2; padding: 10px 18px; border-bottom: 1px solid #0A0A0A; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #0A0A0A;">
//                             QUESTIONS?
//                           </td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14.5px; color: #0A0A0A; line-height: 1.6;">
//                             Reach out to us at <a href="mailto:stemcalifornia@gmail.com" style="color: #CF142B; font-weight: 700; text-decoration: underline;">stemcalifornia@gmail.com</a> with any questions before the event.
//                           </td>
//                         </tr>
//                       </table>

//                       <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 700; color: #0A0A0A;">
//                         We can't wait to see you there!
//                       </p>

//                       <p style="margin: 0; font-size: 14.5px; color: #0A0A0A; line-height: 1.5;">
//                         Best,<br/>
//                         <strong style="color: #0A0A0A;">California STEM Innovators (CSI)</strong><br/>
//                         <a href="https://californiasteminnovators.org" style="color: #CF142B; text-decoration: none; font-weight: 700;">californiasteminnovators.org</a>
//                       </p>

//                     </td>
//                   </tr>

//                   <!-- Footer Bar -->
//                   <tr>
//                     <td style="padding: 16px 30px; background-color: #0A0A0A; text-align: center; font-size: 12px; color: #FFFFFF; font-weight: 600;">
//                       California STEM Innovators • Unlocking STEM for every student
//                     </td>
//                   </tr>

//                 </table>
//               </td>
//             </tr>
//           </table>
//         </body>
//         </html>
//       `;
//
//       var plainBody = "Hi " + studentName + ",\n\n" +
//         "Thanks for registering " + studentName + " for the CSI Biotechnology Workshop: From DNA to Discovery, hosted by California STEM Innovators (CSI)! We're excited to have you join us.\n\n" +
//         "EVENT DETAILS\n" +
//         "Date: Saturday, September 19, 2026\n" +
//         "Time: 3:00 PM – 6:00 PM PDT (please plan for pickup at 6:00 PM)\n" +
//         "Location: Union City Library, 34007 Alvarado Niles Rd, Union City, CA 94587\n\n" +
//         "WHAT YOU WILL DO\n" +
//         "Students will get hands-on with real biotechnology techniques, including:\n" +
//         "- Extracting visible DNA from a strawberry (they'll take home a vial!)\n" +
//         "- A bacterial transformation lab using miniPCR's True Blue kit\n" +
//         "- Micropipetting practice and a gel electrophoresis demo\n\n" +
//         "WHAT TO BRING / WEAR\n" +
//         "- Closed-toe shoes\n" +
//         "- Clothes that can get a little messy\n\n" +
//         "WAIVER\n" +
//         "Good news — your signed waiver was already collected as part of registration, so there's nothing further needed here. If you need to update any information on it (allergies, emergency contact, etc.), just reply to this email.\n\n" +
//         "FOOD & ALLERGIES\n" +
//         "Water will be provided. Snacks are still being finalized — we'll follow up with details closer to the event. Please note this workshop may involve strawberries or other foods; let us know if you have a related allergy.\n\n" +
//         "DROP-OFF & PICKUP\n" +
//         "Please plan to drop off a few minutes before 3:00 PM and pick up promptly at 5:00 PM from the Union City Library. A CSI facilitator will be present at check-in.\n\n" +
//         "QUESTIONS?\n" +
//         "Reach out to us at stemcalifornia@gmail.com with any questions before the event.\n\n" +
//         "We can't wait to see you there!\n\n" +
//         "Best,\n" +
//         "California STEM Innovators (CSI)\n" +
//         "https://californiasteminnovators.org";
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
// function testAuth() {
//   // Run this once in Apps Script Editor to grant Drive & Email permissions!
//   DriveApp.getRootFolder();
//   MailApp.sendEmail(Session.getActiveUser().getEmail(), "Permission Test", "Drive & Email access authorized!");
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

    // 5. Build clean JSON payload
    const notesInput = signupForm.querySelector('[name="notes"]');
    const payload = {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      school: schoolInput ? schoolInput.value.trim() : "",
      grade: gradeSelect ? gradeSelect.value : "",
      workshop_date: dateSelect ? dateSelect.value : "",
      notes: notesInput ? notesInput.value.trim() : "",
      waiver_name: waiverFileName,
      waiver_base64: waiverBase64
    };

    try {
      // 6. POST payload to Google Apps Script Web App URL with mode: 'no-cors'
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


