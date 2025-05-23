"use server"
import nodemailer from 'nodemailer';


export const EmailService = async (data) => {

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
});

try {
    await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to : data.to,
    subject : data.subject,
    text : data.text,
    html : data.html,
    });
    return true
} catch (error) {
    console.error('Error sending email:', error);
}
}