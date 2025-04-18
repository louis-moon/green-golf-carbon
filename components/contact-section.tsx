import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="w-full py-20 bg-white">
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
                  <p className="text-gray-600">info@vadoselabs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-gray-600">Butner, North Carolina</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="facility" className="text-sm font-medium">
                  Facility Type
                </label>
                <Input id="facility" placeholder="Golf course, athletic field, etc." />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Tell us about your facility and needs" rows={5} />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
