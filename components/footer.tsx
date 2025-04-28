// components/footer.tsx

"use client"

import Image from "next/image"

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-emerald-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Green Golf Carbon Logo"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-2xl font-bold">Green Golf Carbon</span>
            </div>
            <p className="text-emerald-100 mb-4 max-w-md">
              Transforming golf courses and managed turf into carbon sinks through innovative basalt-enhanced sand
              technology.
            </p>
            <p className="text-emerald-200 text-sm">
              © {new Date().getFullYear()} Green Golf Carbon. All rights reserved.
            </p>
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
              {/* Contact Us removed */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-emerald-100">Miami, Florida</li>
              <li>
                <a href="mailto:info@greengolfcarbon.com" className="text-emerald-100 hover:text-white">
                  info@greengolfcarbon.com
                </a>
              </li>
              <li>
                <a href="tel:+7863508592" className="text-emerald-100 hover:text-white">
                  (786) 350-8592
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
