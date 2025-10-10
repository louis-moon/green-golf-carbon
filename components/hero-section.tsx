// components/hero-section.tsx
"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full bg-gradient-to-br from-[#3B2A22] to-[#4CAF50] text-white"
    >
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Improving Soil Quality & Capturing Atmospheric CO<sub>2</sub>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90">
            Green Golf Carbon transforms golf courses and managed turf into carbon
            sinks through innovative basalt-enhanced sand technology.
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/cover.jpg?height=800&width=1200"
            alt="Golf course with Green Golf Carbon technology"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}