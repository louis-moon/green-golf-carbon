"use server"

import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  facility: z.string().min(1, "Facility type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // honeypot (should be empty)
  company: z.string().optional(),
})

export type ContactFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    facility?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Validate
  const parsed = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    facility: formData.get("facility"),
    message: formData.get("message"),
    company: formData.get("company"), // honeypot
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, success: false }
  }

  const { name, email, facility, message, company } = parsed.data

  // Honeypot: if filled, silently accept but do nothing
  if (company && company.trim().length > 0) {
    return { success: true }
  }

  // Compose email
  const from = process.env.CONTACT_FROM!
  const to = process.env.CONTACT_TO!

  const subject = `Contact — ${name} (${facility})`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Facility: ${facility}`,
    ``,
    message,
  ].join("\n")

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Email:</b> ${escapeHtml(email)}</p>
    <p><b>Facility:</b> ${escapeHtml(facility)}</p>
    <p><b>Message:</b></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      reply_to: email, // lets you reply directly to the sender
    })

    return { success: true }
  } catch (err: any) {
    console.error("Resend error:", err)
    return {
      errors: { _form: ["Failed to send message. Please try again."] },
      success: false,
    }
  }
}

// tiny, safe HTML escaper
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
