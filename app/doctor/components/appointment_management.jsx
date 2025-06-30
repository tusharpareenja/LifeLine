"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, Check, X, Clock } from "lucide-react"
import { getAppointments } from "@/app/actions/appointments"

export function AppointmentManagement({ doctorId }) {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchAppointments() {
      if (!doctorId) return
      setLoading(true)
      setError("")
      const res = await getAppointments({ doctorId })
      console.log("Fetched appointments:", res)
      if (res.success) {
        setAppointments(res.data)
      } else {
        setAppointments([])
        setError(res.error || "Failed to fetch appointments")
        console.error("Failed to fetch appointments:", res.error)
      }
      setLoading(false)
    }
    fetchAppointments()
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [doctorId])

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.date && new Date(appointment.date).toLocaleDateString().includes(searchTerm)) ||
      (appointment.symptoms && appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  const handleDownloadReport = (id) => {
    // Implement download report functionality
    console.log(`Downloading report for appointment ${id}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
      case "SCHEDULED":
        return "bg-yellow-500"
      case "Confirmed":
      case "CONFIRMED":
        return "bg-green-500"
      case "Completed":
      case "COMPLETED":
        return "bg-blue-500"
      case "Canceled":
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
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "CONFIRMED")}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "CANCELLED")}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "SCHEDULED")}>
                      <Clock className="h-4 w-4" />
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

