import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle } from "lucide-react"

export default function ComparisonTable() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Traditional Sand vs. Green Sand</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our enhanced basalt blend compares to traditional quartz sand used in golf courses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Feature</TableHead>
                <TableHead className="text-center">Traditional Quartz Sand</TableHead>
                <TableHead className="text-center">Green Golf Carbon Sand</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Composition</TableCell>
                <TableCell className="text-center">Standard quartz sand—inert, non-reactive</TableCell>
                <TableCell className="text-center">Optimized basalt blend that actively captures CO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Soil Health Benefits</TableCell>
                <TableCell className="text-center">
                  <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carbon Capture</TableCell>
                <TableCell className="text-center">
                  <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <CheckCircle className="h-5 w-5 text-brand-DEFAULT mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Water Retention</TableCell>
                <TableCell className="text-center">Limited</TableCell>
                <TableCell className="text-center">Significantly improved</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fertilizer Requirements</TableCell>
                <TableCell className="text-center">Standard</TableCell>
                <TableCell className="text-center">Reduced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Turf Durability</TableCell>
                <TableCell className="text-center">Standard</TableCell>
                <TableCell className="text-center">Enhanced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carbon Credit Potential</TableCell>
                <TableCell className="text-center">None</TableCell>
                <TableCell className="text-center">High-quality credits</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
