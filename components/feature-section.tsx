import { Mountain, BarChart2, Droplets, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeatureSection() {
  const features = [
    {
      icon: <Mountain className="h-12 w-12 text-[#4CAF50]" />,
      title: "Optimized Basalt Blend",
      description:
        "Our proprietary basalt blend actively captures CO2 while improving soil quality for healthier turf.",
    },
    {
      icon: <Droplets className="h-12 w-12 text-[#4CAF50]" />,
      title: "Improved Water Retention",
      description: "Reduce water usage by enhancing soil's ability to retain moisture, creating more resilient turf.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-[#4CAF50]" />,
      title: "Carbon Credit Generation",
      description: "Generate high-quality carbon credits that add value to your facility's sustainability efforts.",
    },
    {
      icon: <Award className="h-12 w-12 text-[#4CAF50]" />,
      title: "Seamless Integration",
      description: "Our solution works with your existing maintenance equipment and procedures.",
    },
  ]

  return (
    <section id="benefits" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Green Sand Advantage</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our enhanced basalt blend delivers multiple benefits over traditional quartz sand, improving turf quality
            while capturing carbon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2 flex justify-center">{feature.icon}</CardHeader>
              <CardContent className="text-center">
                <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}