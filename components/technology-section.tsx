import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function TechnologySection() {
  const steps = [
    {
      number: "1",
      title: "Basalt Sourcing & Processing",
      description:
        "We source high-purity basalt and process it into an optimized blend to maximize its natural reactivity.",
    },
    {
      number: "2",
      title: "Soil Analysis & Deployment",
      description:
        "Our basalt blend is applied as part of standard topdressing and aeration routines using existing equipment.",
    },
    {
      number: "3",
      title: "Ongoing Weathering",
      description:
        "Once in the soil, the basalt reacts with water and CO2 to form stable carbonates—locking away carbon dioxide for millennia.",
    },
    {
      number: "4",
      title: "Monitoring & Verification",
      description:
        "We install monitoring sensors and conduct regular soil tests to verify CO2 uptake and maintain durable carbon credits.",
    },
    {
      number: "5",
      title: "Carbon Credit Generation",
      description:
        "Verified carbon removal is monetized via high-quality carbon credits, adding a revenue stream that supports sustainability.",
    },
  ]

  return (
    <section id="technology" className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Technology Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrating Basalt Blends into Routine Turf Maintenance for Seamless Carbon Capture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=800&width=800"
              alt="Enhanced Rock Weathering Process"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Enhanced Rock Weathering (ERW)</h3>
            <p className="text-lg mb-6">
              Enhanced Rock Weathering is a natural process that we accelerate to capture CO2 from the atmosphere and
              lock it away permanently as stable carbonates in the soil.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span>Fastest scale, most co-benefits & permanence at half the cost of Direct Air Capture</span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span>1,000+ years of carbon storage durability</span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span>Improves soil fertility, turf productivity & vitality</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
