import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export const POST = async (req) => {
  const { to, subject, text, html } = await req.json();
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
      to,
      subject,
      text,
      html,
    });
    NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    NextResponse.json({ message: 'Error sending email', error: error.message });
  }
}