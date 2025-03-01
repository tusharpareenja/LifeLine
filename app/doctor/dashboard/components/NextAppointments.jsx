"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone } from "lucide-react"

const appointments = [
  { id: 1, name: "Mayank Sharma", time: "10:00 AM", status: "Confirmed" },
  { id: 2, name: "Tushar Pareenja", time: "11:30 AM", status: "Pending" },
  { id: 3, name: "Karan Tejpal", time: "2:00 PM", status: "Urgent" },
  { id: 4, name: "David Brown", time: "3:30 PM", status: "Confirmed" },
]

export default function NextAppointments() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextAppointment = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % appointments.length)
  }

  const prevAppointment = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + appointments.length) % appointments.length)
  }

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Next Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {appointments.map((appointment) => (
              <div key={appointment.id} className="w-full flex-shrink-0 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{appointment.name}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "Urgent"
                        ? "destructive"
                        : appointment.status === "Pending"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="flex-1">Start Consultation</Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button onClick={prevAppointment} variant="outline">
            Previous
          </Button>
          <Button onClick={nextAppointment} variant="outline">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

