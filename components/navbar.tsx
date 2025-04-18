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

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-700">Vadose Labs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#technology" className="text-gray-700 hover:text-emerald-600 font-medium">
              Technology
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-emerald-600 font-medium">
              Benefits
            </Link>
            <Link href="#team" className="text-gray-700 hover:text-emerald-600 font-medium">
              Team
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium">
              Contact
            </Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
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
            <Link href="#technology" className="block text-gray-700 hover:text-emerald-600 font-medium py-2">
              Technology
            </Link>
            <Link href="#benefits" className="block text-gray-700 hover:text-emerald-600 font-medium py-2">
              Benefits
            </Link>
            <Link href="#team" className="block text-gray-700 hover:text-emerald-600 font-medium py-2">
              Team
            </Link>
            <Link href="#contact" className="block text-gray-700 hover:text-emerald-600 font-medium py-2">
              Contact
            </Link>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}
