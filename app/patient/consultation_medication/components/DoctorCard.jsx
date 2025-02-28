import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


export default function DoctorCard({ name, specialty, availableSlot, rating }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{specialty}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-sm">Next Available: {availableSlot}</span>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="mr-2">
              ⭐ {rating}
            </Badge>
            <span className="text-sm text-gray-500">({Math.floor(rating * 10)} reviews)</span>
          </div>
        </div>
        <Button className="w-full mt-4">Book Consultation</Button>
      </CardContent>
    </Card>
  )
}

