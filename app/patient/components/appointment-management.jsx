import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"

const upcomingAppointments = [
  { id: 1, doctor: "Dr. Emily Chen", specialty: "Pediatrician", date: "2023-07-15", time: "10:00 AM" },
  { id: 2, doctor: "Dr. Michael Lee", specialty: "Cardiologist", date: "2023-07-20", time: "2:30 PM" },
]

const pastConsultations = [
  { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Dermatologist", date: "2023-06-30", time: "11:00 AM" },
  { id: 2, doctor: "Dr. David Brown", specialty: "Orthopedist", date: "2023-06-15", time: "3:00 PM" },
]

export default function AppointmentManagement() {
  const [activeTab, setActiveTab] = useState("upcoming")


  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Consultations</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <p className="text-sm">{appointment.date} at {appointment.time}</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-4">
              {pastConsultations.map((consultation) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{consultation.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                          <p className="text-sm">{consultation.date} at {consultation.time}</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View Prescription
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download Summary
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

