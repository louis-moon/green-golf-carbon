"use server";

import { z } from "zod";
import { Resend } from "resend";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  facility: z.string().min(1, "Facility type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot (leave blank)
  company: z.string().optional(),
});

export type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    facility?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1) Validate
  const parsed = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    facility: formData.get("facility"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, success: false };
  }

  const { name, email, facility, message, company } = parsed.data;

  // 2) Honeypot: if filled, pretend success and do nothing
  if (company && company.trim()) {
    return { success: true };
  }

  // 3) Env guards
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_FROM = process.env.CONTACT_FROM;
  const CONTACT_TO = process.env.CONTACT_TO;

  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
    console.error("Missing envs: RESEND_API_KEY/CONTACT_FROM/CONTACT_TO");
    return {
      errors: { _form: ["Server is misconfigured. Please try again later."] },
      success: false,
    };
  }

  const resend = new Resend(RESEND_API_KEY);

  // 4) Send
  const subject = `Contact — ${name} (${facility})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Facility: ${facility}`,
    "",
    message,
  ].join("\n");

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Email:</b> ${escapeHtml(email)}</p>
    <p><b>Facility:</b> ${escapeHtml(facility)}</p>
    <p><b>Message:</b></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject,
      text,
      html,
      reply_to: email,
    });

    return { success: true };
  } catch (err) {
    console.error("Resend error:", err);
    return {
      errors: { _form: ["Failed to send message. Please try again."] },
      success: false,
    };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
