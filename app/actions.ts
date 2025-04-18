"use server"

import { z } from "zod"

// Define a schema for form validation
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  facility: z.string().min(1, "Facility type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    facility: formData.get("facility"),
    message: formData.get("message"),
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // In a real application, you would send this data to your backend or email service
  // For this example, we'll simulate a successful submission with a delay
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success state
    return {
      success: true,
    }
  } catch (error) {
    // Handle any errors
    return {
      errors: {
        _form: ["Failed to send message. Please try again."],
      },
      success: false,
    }
  }
}
