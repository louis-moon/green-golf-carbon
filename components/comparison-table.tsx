import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle } from "lucide-react"

export default function ComparisonTable() {
  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Traditional Sand vs. Green Sand</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            See how our enhanced basalt blend compares to traditional quartz sand used in golf courses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] sm:w-[220px] md:w-[300px] text-xs md:text-sm">Feature</TableHead>
                <TableHead className="text-center text-xs md:text-sm">Traditional Quartz Sand</TableHead>
                <TableHead className="text-center text-xs md:text-sm">Green Golf Carbon Sand</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Composition</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Standard quartz sand—inert, non-reactive</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Optimized basalt blend that actively captures CO2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Soil Health Benefits</TableCell>
                <TableCell className="text-center">
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#4CAF50] mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Carbon Capture</TableCell>
                <TableCell className="text-center">
                  <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#4CAF50] mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Water Retention</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Limited</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Significantly improved</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Fertilizer Requirements</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Standard</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Reduced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Turf Durability</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Standard</TableCell>
                <TableCell className="text-center text-xs md:text-sm">Enhanced</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-xs md:text-sm">Carbon Credit Potential</TableCell>
                <TableCell className="text-center text-xs md:text-sm">None</TableCell>
                <TableCell className="text-center text-xs md:text-sm">High-quality credits</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}