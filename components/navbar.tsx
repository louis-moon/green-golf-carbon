// /components/navbar.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-700">Green Golf Carbon</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("technology")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("contact")} className="bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </nav>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("technology")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
