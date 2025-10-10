// components/navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    const HEADER_OFFSET = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      className="w-full bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2" aria-label="Green Golf Carbon — Home">
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
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 rounded"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 rounded"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 rounded"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-700 hover:text-[#4CAF50] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 rounded"
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
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4" role="navigation" aria-label="Mobile">
            <button
              onClick={() => scrollToSection("hero")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block text-gray-700 hover:text-[#4CAF50] font-medium py-2 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded"
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
  );
}
