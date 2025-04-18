// /pages/api/contact.ts

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer"; // Assuming you're using Nodemailer for email sending

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, facility, message } = req.body;

    // Set up your email transport configuration (e.g., Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your preferred email provider
      auth: {
        user: "your-email@gmail.com", // Replace with your email address
        pass: "your-email-password", // Use App Password or OAuth2 for Gmail
      },
    });

    const mailOptions = {
      from: email, // Sender's email
      to: "your-receiving-email@example.com", // Replace with the email you want to send the message to
      subject: `Contact Us Form Submission from ${name}`,
      text: `Facility: ${facility}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to send the message." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
