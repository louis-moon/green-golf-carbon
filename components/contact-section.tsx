"use client"

import { useFormState, useFormStatus } from "react-dom"
import { submitContactForm } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full flex justify-center">
      {pending ? (<><Loader2 className="animate-spin mr-2 h-4 w-4" />Sending…</>) : "Send Message"}
    </Button>
  )
}

export default function ContactSection() {
  const [state, formAction] = useFormState(submitContactForm, {} as any)

  return (
    <section id="contact" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>

        {state?.errors?._form && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5 mr-2 inline" />
            <AlertDescription>{state.errors._form[0]}</AlertDescription>
          </Alert>
        )}

        {state?.success ? (
          <Alert variant="default" className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-brand-DEFAULT" />
            <AlertDescription>Thanks for reaching out — we’ll be in touch shortly!</AlertDescription>
          </Alert>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <Input name="name" placeholder="Name" />
              {state?.errors?.name && <p className="text-sm text-red-600 mt-1">{state.errors.name[0]}</p>}
            </div>
            <div>
              <Input name="email" type="email" placeholder="Email" />
              {state?.errors?.email && <p className="text-sm text-red-600 mt-1">{state.errors.email[0]}</p>}
            </div>
            <div>
              <Input name="facility" placeholder="Facility (e.g., Golf course)" />
              {state?.errors?.facility && <p className="text-sm text-red-600 mt-1">{state.errors.facility[0]}</p>}
            </div>
            <div>
              <Textarea name="message" placeholder="Your message" rows={5} />
              {state?.errors?.message && <p className="text-sm text-red-600 mt-1">{state.errors.message[0]}</p>}
            </div>
            <SubmitButton />
          </form>
        )}
      </div>
    </section>
  )
}
