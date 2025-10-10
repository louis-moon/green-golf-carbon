import { Mountain, BarChart2, Droplets, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeatureSection() {
  const features = [
    {
      icon: <Mountain className="h-10 w-10 md:h-12 md:w-12 text-[#4CAF50]" />,
      title: "Optimized Basalt Blend",
      description:
        "Our proprietary basalt blend actively captures CO2 while improving soil quality for healthier turf.",
    },
    {
      icon: <Droplets className="h-10 w-10 md:h-12 md:w-12 text-[#4CAF50]" />,
      title: "Improved Water Retention",
      description: "Reduce water usage by enhancing soil's ability to retain moisture, creating more resilient turf.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 md:h-12 md:w-12 text-[#4CAF50]" />,
      title: "Carbon Credit Generation",
      description: "Generate high-quality carbon credits that add value to your facility's sustainability efforts.",
    },
    {
      icon: <Award className="h-10 w-10 md:h-12 md:w-12 text-[#4CAF50]" />,
      title: "Seamless Integration",
      description: "Our solution works with your existing maintenance equipment and procedures.",
    },
  ]

  return (
    <section id="benefits" className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Green Sand Advantage</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Our enhanced basalt blend delivers multiple benefits over traditional quartz sand, improving turf quality
            while capturing carbon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 flex flex-col items-center text-center">
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}