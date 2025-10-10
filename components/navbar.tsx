"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => setIsMenuOpen((v) => !v)

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)

    const el = document.getElementById(id)
    if (!el) return

    const HEADER_OFFSET = 80
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Green Golf Carbon"
              width={40}
              height={40}
              priority
            />
            <span className="text-2xl font-bold text-[#4CAF50]">
              Green Golf Carbon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium"
            >
              Team
            </button>
            <Button 
              variant="default" 
              onClick={() => scrollToSection("contact")}
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left"
            >
              Team
            </button>
            <Button
              variant="default"
              size="default"
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
              onClick={() => scrollToSection("contact")}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}