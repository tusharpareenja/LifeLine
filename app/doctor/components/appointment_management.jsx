

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, Check, X, Clock } from "lucide-react"
import { getAppointments, updateAppointmentStatus } from "@/app/actions/appointments"

export function AppointmentManagement({ doctorId }) {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("active") // 'active' | 'completed' | 'all'

  useEffect(() => {
    async function fetchAppointments() {
      if (!doctorId) return
      setLoading(true)
      setError("")
      const res = await getAppointments({ doctorId })
      if (res.success) {
        setAppointments(res.data)
      } else {
        setAppointments([])
        setError(res.error || "Failed to fetch appointments")
      }
      setLoading(false)
    }
    fetchAppointments()
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [doctorId])

  // Tab filtering
  const filteredAppointments = appointments
    .filter((appointment) => {
      const status = String(appointment.status).toUpperCase()
      if (activeTab === "completed") return status === "COMPLETED"
      if (activeTab === "active") return status !== "COMPLETED"
      return true // 'all'
    })
    .filter(
      (appointment) =>
        appointment.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.date && new Date(appointment.date).toLocaleDateString().includes(searchTerm)) ||
        (appointment.symptoms && appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase())),
    )

  // Mark appointment as completed (update UI immediately, remove from active tab)
  const handleStatusChange = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment,
      ),
    )
    await updateAppointmentStatus(id, newStatus)
  }

  const handleDownloadReport = (id) => {
    // Implement download report functionality
    console.log(`Downloading report for appointment ${id}`)
  }

  const getStatusColor = (status) => {
    switch (String(status).toUpperCase()) {
      case "PENDING":
      case "SCHEDULED":
        return "bg-yellow-500"
      case "CONFIRMED":
        return "bg-green-500"
      case "COMPLETED":
        return "bg-blue-500"
      case "CANCELLED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
        <Button>
          <Calendar className="mr-2 h-4 w-4" /> View Calendar
        </Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <Button variant={activeTab === "active" ? "default" : "outline"} onClick={() => setActiveTab("active")}>
          Active
        </Button>
        <Button variant={activeTab === "completed" ? "default" : "outline"} onClick={() => setActiveTab("completed")}>
          Completed
        </Button>
        <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
          All
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading appointments...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500 font-semibold">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Symptoms</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient?.user?.name || "N/A"}</TableCell>
                <TableCell>{appointment.date ? new Date(appointment.date).toLocaleString() : "N/A"}</TableCell>
                <TableCell>{appointment.symptoms || "-"}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "CONFIRMED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED" || String(appointment.status).toUpperCase() === "CONFIRMED"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "CANCELLED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "SCHEDULED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED" || String(appointment.status).toUpperCase() === "SCHEDULED"}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(appointment.id, "COMPLETED")}
                      disabled={String(appointment.status).toUpperCase() === "COMPLETED" || String(appointment.status).toUpperCase() === "CANCELLED"}
                    >
                      <Check className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport(appointment.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

