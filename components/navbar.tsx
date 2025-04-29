// components/navbar.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Green Golf Carbon Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold text-emerald-700">Green Golf Carbon</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Team
            </button>
            <Button asChild variant="default" size="default">
              <a
                href="https://calendly.com/louis-greengolfcarbon/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Get Started
              </a>
            </Button>
          </nav>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block text-gray-700 hover:text-emerald-600 font-medium py-2 w-full text-left"
            >
              Team
            </button>
            <Button asChild variant="default" size="default" className="w-full">
              <a
                href="https://calendly.com/louis-greengolfcarbon/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded"
              >
                Get Started
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
