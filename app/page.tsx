import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import TechnologySection from "@/components/technology-section"
import TeamSection from "@/components/team-section"
import ComparisonTable from "@/components/comparison-table"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <FeatureSection />
      <TechnologySection />
      <ComparisonTable />
      <TeamSection />
    </main>
  )
}
