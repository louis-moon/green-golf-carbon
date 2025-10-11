import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle } from "lucide-react"

export default function ComparisonTable() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Traditional Sand vs. Green Sand</h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            See how our enhanced basalt blend compares to traditional quartz sand used in golf courses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] text-black">Feature</TableHead>
                <TableHead className="text-center text-black">Traditional Quartz Sand</TableHead>
                <TableHead className="text-center text-black">Green Golf Carbon Sand</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-black">Composition</TableCell>
                <TableCell className="text-center text-foreground">Standard quartz sand—inert, non-reactive</TableCell>
                <TableCell className="text-center text-foreground">Optimized basalt blend that actively captures CO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Soil Health Benefits</TableCell>
                <TableCell className="text-center text-foreground">
                  <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center text-foreground">
                  <CheckCircle className="h-5 w-5 text-[#4CAF50] mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Carbon Capture</TableCell>
                <TableCell className="text-center text-foreground">
                  <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center text-foreground">
                  <CheckCircle className="h-5 w-5 text-[#4CAF50] mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Water Retention</TableCell>
                <TableCell className="text-center text-foreground">Limited</TableCell>
                <TableCell className="text-center text-foreground">Significantly improved</TableCell>
              </Row>
              <TableRow>
                <TableCell className="font-medium text-black">Fertilizer Requirements</TableCell>
                <TableCell className="text-center text-foreground">Standard</TableCell>
                <TableCell className="text-center text-foreground">Reduced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Turf Durability</TableCell>
                <TableCell className="text-center text-foreground">Standard</TableCell>
                <TableCell className="text-center text-foreground">Enhanced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Carbon Credit Potential</TableCell>
                <TableCell className="text-center text-foreground">None</TableCell>
                <TableCell className="text-center text-foreground">High-quality credits</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
