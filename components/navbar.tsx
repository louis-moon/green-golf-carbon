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

  // Prevent background scroll when the mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm border-b border-gray-200"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2" aria-label="Green Golf Carbon — Home">
            <Image src="/logo.png" alt="Green Golf Carbon" width={40} height={40} priority />
            <span className="text-2xl font-bold text-[#4CAF50]">Green Golf Carbon</span>
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
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel — positioned UNDER the fixed header */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden absolute inset-x-0 top-20", // starts right below the 80px header
          "bg-white border-t border-gray-200 shadow-md",
          "transition-transform duration-200 will-change-transform",
          isMenuOpen ? "translate-y-0" : "-translate-y-2 opacity-0 pointer-events-none",
        ].join(" ")}
        role="navigation"
        aria-label="Mobile"
      >
        <div className="px-4 py-4 space-y-4 max-h-[calc(100dvh-80px)] overflow-y-auto">
          <div className="container mx-auto">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left text-gray-700 hover:text-[#4CAF50] font-medium py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block w-full text-left text-gray-700 hover:text-[#4CAF50] font-medium py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("technology")}
              className="block w-full text-left text-gray-700 hover:text-[#4CAF50] font-medium py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left text-gray-700 hover:text-[#4CAF50] font-medium py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]"
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
      </div>
    </header>
  );
}
