import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function TeamSection() {
  const team = [
    {
      name: "Brian Morrison",
      title: "CEO & Co-Inventor",
      bio: "Dartmouth College, BA Quant. Social Science. Former Goldman Sachs Financial Analyst.",
      email: "Brian@vadoselabs.com",
      image: "/brian.png?height=200&width=200",
    },
    {
      name: "Mukul Sharma",
      title: "CTO & Co-Inventor",
      bio: "Dartmouth College, Professor of Earth Sciences. Guggenheim Fellow.",
      email: "Mukul.Sharma@dartmouth.edu",
      image: "/mukul.png?height=200&width=200",
    },
    {
      name: "Louis Moon",
      title: "Chief of Staff",
      bio: "Yale University, BS Statistics & Data Science. Tsai City Accelerator Alumnus, Product Manager.",
      email: "Louis@vadoselabs.com",
      image: "/louis.png?height=200&width=200",
    },
  ]

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The experts behind Vadose Labs making grass greener and our planet healthier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-4">
                <a
                  href={`mailto:${member.email}`}
                  className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{member.email}</span>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
