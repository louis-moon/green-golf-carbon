"use client"

import { Leaf } from "lucide-react"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full bg-emerald-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 mr-2" />
              <span className="text-2xl font-bold">Green Golf Carbon</span>
            </div>
            <p className="text-emerald-100 mb-4 max-w-md">
              Transforming golf courses and managed turf into carbon sinks through innovative basalt-enhanced sand
              technology.
            </p>
            <p className="text-emerald-200 text-sm">© {new Date().getFullYear()} Green Golf Carbon. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("technology")} className="text-emerald-100 hover:text-white">
                  Our Technology
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("benefits")} className="text-emerald-100 hover:text-white">
                  Benefits
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("team")} className="text-emerald-100 hover:text-white">
                  Our Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="text-emerald-100 hover:text-white">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-emerald-100">Butner, North Carolina</li>
              <li>
                <a href="mailto:info@vadoselabs.com" className="text-emerald-100 hover:text-white">
                  info@vadoselabs.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-emerald-100 hover:text-white">
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
