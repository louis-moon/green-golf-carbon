// components/contact-section.tsx
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const { name, email, facility, message } = formData
    const { error: supaError } = await supabase
      .from("contacts")
      .insert([{ name, email, facility, message }])

    if (supaError) {
      setError(supaError.message)
    } else {
      setSuccess(true)
    }
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5 mr-2 inline" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          // Thank-you state
          <Alert variant="default" className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
            <AlertDescription>Thanks for reaching out — we’ll be in touch shortly!</AlertDescription>
          </Alert>
        ) : (
          // Only show form when not yet successful
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="facility"
              placeholder="Facility (e.g., Golf course)"
              value={formData.facility}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
