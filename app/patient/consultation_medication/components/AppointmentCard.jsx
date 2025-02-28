import { Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"



export default function AppointmentCard({ doctor, specialty, date, time }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold">{doctor}</h3>
          <p className="text-sm text-gray-500">{specialty}</p>
          <p className="text-sm">
            {date} at {time}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Video className="mr-2 h-4 w-4" />
          Join Call
        </Button>
      </CardContent>
    </Card>
  )
}

