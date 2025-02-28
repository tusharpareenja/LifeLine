import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const onlineDoctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Dermatologist", image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Dr. David Lee", specialty: "Psychiatrist", image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Dr. Maria Garcia", specialty: "Nutritionist", image: "/placeholder.svg?height=40&width=40" },
]

export default function LiveDoctorAvailability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Doctor Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {onlineDoctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>
              <Badge variant="secondary">Available Now</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

