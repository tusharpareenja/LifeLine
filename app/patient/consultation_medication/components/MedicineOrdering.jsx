import { MapPin, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import MedicineCard from "./MedicineCard"

export default function MedicineOrdering() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Order Prescribed Medicines</CardTitle>
          <CardDescription>Easily order medicines from your recent prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input type="text" placeholder="Search medicines..." className="flex-grow" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Recent Prescriptions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Dr. Chen - May 10, 2025</DropdownMenuItem>
                  <DropdownMenuItem>Dr. Lee - April 22, 2025</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <MedicineCard name="Lisinopril" dosage="10mg" quantity={30} price={15.99} />
                <MedicineCard name="Metformin" dosage="500mg" quantity={60} price={12.5} />
                <MedicineCard name="Amoxicillin" dosage="500mg" quantity={21} price={8.75} />
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold">Nearby Pharmacy Pickup</h3>
                <p className="text-sm text-gray-500">Ready in 2 hours</p>
              </div>
              <Button variant="outline" size="sm">
                Select
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Home Delivery</h3>
                <p className="text-sm text-gray-500">Estimated delivery: 1-2 days</p>
              </div>
              <Button variant="outline" size="sm">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

