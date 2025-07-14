import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Star } from "lucide-react"
import { getAppointmentsByPatientId } from "@/app/actions/appointments"

export default function AppointmentManagement() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [pastConsultations, setPastConsultations] = useState([])
  const [feedbackOpen, setFeedbackOpen] = useState(null) // appointment id or null
  const [feedback, setFeedback] = useState({ doctor: 0, hospital: 0, services: 0, message: "" })

  useEffect(() => {
    async function fetchAppointments() {
      let patientId = null
      if (typeof window !== 'undefined') {
        patientId = sessionStorage.getItem('patientId')
      }
      if (!patientId) return
      // Fetch upcoming
      const upcomingRes = await getAppointmentsByPatientId(patientId, { onlyUpcoming: true })
      setUpcomingAppointments(upcomingRes.success ? upcomingRes.data : [])
      // Fetch past (COMPLETED only)
      const pastRes = await getAppointmentsByPatientId(patientId)
      const now = new Date()
      setPastConsultations(
        pastRes.success
          ? pastRes.data.filter(a => new Date(a.date) < now && String(a.status).toUpperCase() === "COMPLETED")
          : []
      )
    }
    fetchAppointments()
  }, [])

  const handleOpenFeedback = (id) => {
    setFeedbackOpen(id)
    setFeedback({ doctor: 0, hospital: 0, services: 0, message: "" })
  }

  const handleStar = (field, value) => {
    setFeedback((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeedbackChange = (e) => {
    setFeedback((prev) => ({ ...prev, message: e.target.value }))
  }

  const handleSubmitFeedback = async (appointmentId) => {
    let patientId = null;
    if (typeof window !== 'undefined') {
      patientId = sessionStorage.getItem('patientId');
    }
    if (!patientId) {
      alert('Patient ID not found.');
      return;
    }
    const appointment = [...upcomingAppointments, ...pastConsultations].find(a => a.id === appointmentId);
    const doctorId = appointment?.doctor?.id || appointment?.doctorId;
    const hospitalId = appointment?.hospital?.id || appointment?.hospitalId;
    try {
      const res = await import('@/app/actions/feedback');
      await res.addFeedback({
        appointmentId,
        patientId,
        doctorId,
        hospitalId,
        doctorRating: feedback.doctor,
        hospitalRating: feedback.hospital,
        servicesRating: feedback.services,
        message: feedback.message,
      });
      alert('Feedback submitted!');
      setFeedbackOpen(null);
    } catch (err) {
      alert('Error submitting feedback: ' + err.message);
    }
  }

  const renderStars = (field, value) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 cursor-pointer ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => handleStar(field, star)}
          fill={star <= value ? "#facc15" : "none"}
        />
      ))}
    </div>
  )

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
              {upcomingAppointments.length === 0 && <div className="text-gray-500">No upcoming appointments</div>}
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
                          <h3 className="font-semibold">{appointment.doctor?.user?.name || appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.doctor?.specialty || appointment.specialty}</p>
                          <p className="text-sm">{new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenFeedback(appointment.id)}>Feedback</Button>
                        </div>
                      </div>
                      {feedbackOpen === appointment.id && (
                        <div className="mt-4 border-t pt-4 space-y-3">
                          <div>
                            <label className="block font-medium mb-1">Doctor Feedback</label>
                            {renderStars("doctor", feedback.doctor)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Hospital Feedback</label>
                            {renderStars("hospital", feedback.hospital)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Services Feedback</label>
                            {renderStars("services", feedback.services)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Additional Comments (optional)</label>
                            <textarea className="w-full border rounded p-2" rows={2} value={feedback.message} onChange={handleFeedbackChange} placeholder="Your message..." />
                          </div>
                          <Button onClick={() => handleSubmitFeedback(appointment.id)} className="mt-2">Submit Feedback</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-4">
              {pastConsultations.length === 0 && <div className="text-gray-500">No past consultations</div>}
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
                          <h3 className="font-semibold">{consultation.doctor?.user?.name || consultation.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{consultation.doctor?.specialty || consultation.specialty}</p>
                          <p className="text-sm">{new Date(consultation.date).toLocaleDateString()} at {new Date(consultation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
                          <Button variant="outline" size="sm" onClick={() => handleOpenFeedback(consultation.id)}>Feedback</Button>
                        </div>
                      </div>
                      {feedbackOpen === consultation.id && (
                        <div className="mt-4 border-t pt-4 space-y-3">
                          <div>
                            <label className="block font-medium mb-1">Doctor Feedback</label>
                            {renderStars("doctor", feedback.doctor)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Hospital Feedback</label>
                            {renderStars("hospital", feedback.hospital)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Services Feedback</label>
                            {renderStars("services", feedback.services)}
                          </div>
                          <div>
                            <label className="block font-medium mb-1">Additional Comments (optional)</label>
                            <textarea className="w-full border rounded p-2" rows={2} value={feedback.message} onChange={handleFeedbackChange} placeholder="Your message..." />
                          </div>
                          <Button onClick={() => handleSubmitFeedback(consultation.id)} className="mt-2">Submit Feedback</Button>
                        </div>
                      )}
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

