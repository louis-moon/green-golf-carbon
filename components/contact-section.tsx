// /components/contact-section.tsx

"use client"

import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { submitContactForm, type ContactFormState } from "@/app/actions"
import { useRef, useTransition } from "react"

export default function ContactSection() {
  const [formState, formAction] = useFormState<ContactFormState, FormData>(submitContactForm, {})
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  // Handle form submission with transition
  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
    })
  }

  // Reset form after successful submission
  if (formState.success && formRef.current) {
    formRef.current.reset()
  }

  return (
    <section id="contact" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interested in transforming your golf course or turf facility? Contact us to learn more about our solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly or fill out the form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@greengolfcarbon.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">(786) 350-8592</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-gray-600">Miami, Florida</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <form ref={formRef} onSubmit={(e) => handleSubmit(new FormData(e.target))} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    aria-invalid={!!formState?.errors?.name}
                    aria-describedby={formState?.errors?.name ? "name-error" : undefined}
                  />
                  {formState?.errors?.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {formState.errors.name[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    aria-invalid={!!formState?.errors?.email}
                    aria-describedby={formState?.errors?.email ? "email-error" : undefined}
                  />
                  {formState?.errors?.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {formState.errors.email[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="facility" className="text-sm font-medium">Facility Type</label>
                <Input
                  id="facility"
                  name="facility"
                  placeholder="Golf course, athletic field, etc."
                  aria-invalid={!!formState?.errors?.facility}
                  aria-describedby={formState?.errors?.facility ? "facility-error" : undefined}
                />
                {formState?.errors?.facility && (
                  <p id="facility-error" className="text-sm text-red-500">
                    {formState.errors.facility[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your facility and needs"
                  rows={5}
                  aria-invalid={!!formState?.errors?.message}
                  aria-describedby={formState?.errors?.message ? "message-error" : undefined}
                />
                {formState?.errors?.message && (
                  <p id="message-error" className="text-sm text-red-500">
                    {formState.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Form-level error message */}
              {formState?.errors?._form && (
                <div className="p-3 rounded-md bg-red-50 text-red-500 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{formState.errors._form[0]}</p>
                </div>
              )}

              {/* Success message */}
              {formState.success && (
                <div className="p-3 rounded-md bg-green-50 text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <p>Your message has been sent successfully! We'll be in touch soon.</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
