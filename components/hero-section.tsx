"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full text-white overflow-hidden"
      aria-label="Green Golf Carbon hero"
    >
      {/* Animated gradient background layer */}
      <div
        className="absolute inset-0 animated-hero pointer-events-none"
        // Force the animation even if prefers-reduced-motion is set, for testing.
        // Remove this inline style later if you want to respect user preference.
        style={{ animation: "heroShift 12s ease-in-out infinite", backgroundSize: "300% 300%" }}
        aria-hidden="true"
      />

      {/* Subtle vignette for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(0,0,0,0.18), rgba(0,0,0,0) 60%)",
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Improving Soil Quality & Capturing Atmospheric CO<sub>2</sub>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">
            Green Golf Carbon transforms golf courses and managed turf into carbon
            sinks through innovative basalt-enhanced sand technology.
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/cover.jpg?height=800&width=1200"
            alt="Golf course with Green Golf Carbon technology"
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
