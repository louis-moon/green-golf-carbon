// app/page.tsx

import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import TechnologySection from "@/components/technology-section"
import ComparisonTable from "@/components/comparison-table"
import TeamSection from "@/components/team-section"
import SubscribeSection from "@/components/SubscribeSection"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <FeatureSection />
      <TechnologySection />
      <ComparisonTable />
      <SubscribeSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
