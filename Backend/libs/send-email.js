import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SEND_GRID_API);

const fromEmail = process.env.FROM_EMAIL;

export const sendEmail = async (to, subject, html) => {
    const msg ={
       to,
       from: `AuraFlow <${fromEmail}>` ,
       subject,
       html,
    };

    try {
        await sgMail.send(msg); 
    } catch (
        
    ) {
        
    }
}