"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="w-full bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Improving Soil Quality & Capturing Atmospheric CO<sub>2</sub>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">
            Green Golf Carbon transforms golf courses and managed turf into carbon sinks through innovative basalt-enhanced
            sand technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-100">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-emerald-800 hover:bg-emerald-100">
              Contact Us
            </Button>
          </div>
        </div>
        <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/cover.jpg?height=800&width=1200"
            alt="Golf course with Green Golf Carbon technology"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <p className="text-2xl font-semibold px-6 text-center text-white">Transforming Golf Courses into Carbon Sinks</p>
          </div>
        </div>
      </div>
    </section>
  )
}
