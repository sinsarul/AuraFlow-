// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// dotenv.config();

// sgMail.setApiKey(process.env.SEND_GRID_API);

// const fromEmail = process.env.FROM_EMAIL;

// export const sendEmail = async (to, subject, html) => {
//   const msg = {
//     to,
//     from:
//     // `sinsarpes@gmail.com`,
//     `AuraFlow <${fromEmail}>`,
//     subject,
//     html,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log("Email sent successfully");

//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);

//     return false;
//   }
// };

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

export const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      // `AuraFlow <${fromEmail}>`, // Replace with verified sender
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", data);
     return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
};