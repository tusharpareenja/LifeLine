import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import DoctorCard from "./DoctorCard"
import AppointmentCard from "./AppointmentCard"

export default function VideoConsultation() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Video Consultation</CardTitle>
          <CardDescription>Connect with doctors securely from the comfort of your home</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input type="text" placeholder="Search for doctors or specialties" className="flex-grow" />
              <Button>Find Doctors</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DoctorCard name="Dr. Emily Chen" specialty="Cardiologist" availableSlot="Today, 2:00 PM" rating={4.8} />
              <DoctorCard
                name="Dr. Michael Lee"
                specialty="Pediatrician"
                availableSlot="Tomorrow, 10:00 AM"
                rating={4.9}
              />
              <DoctorCard
                name="Dr. Sarah Johnson"
                specialty="Dermatologist"
                availableSlot="Today, 4:30 PM"
                rating={4.7}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              <AppointmentCard doctor="Dr. Emily Chen" specialty="Cardiologist" date="May 15, 2025" time="2:00 PM" />
              <AppointmentCard doctor="Dr. Michael Lee" specialty="Pediatrician" date="May 18, 2025" time="10:00 AM" />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

