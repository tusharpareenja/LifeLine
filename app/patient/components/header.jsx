import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Header() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-primary">Book Your Consultation with Top Specialists 🚑</h1>
      <div className="relative">
        <Input
          type="search"
          placeholder="Find doctors by name, specialty, or hospital..."
          className="pl-10 pr-4 py-2"
          aria-label="Search doctors"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
          <p>Dr. Sarah Johnson - Cardiologist</p>
          <p>Tomorrow, 10:00 AM</p>
        </CardContent>
      </Card>
    </div>
  )
}

