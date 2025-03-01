"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, Check, X, Clock } from "lucide-react"

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: "Sachin",
    date: "2023-06-15",
    time: "10:00 AM",
    symptoms: "Headache, Fever",
    status: "Pending",
  },
  {
    id: 2,
    patientName: "Ram",
    date: "2023-06-15",
    time: "11:30 AM",
    symptoms: "Cough, Sore throat",
    status: "Confirmed",
  },
  {
    id: 3,
    patientName: "Rohan",
    date: "2023-06-16",
    time: "2:00 PM",
    symptoms: "Back pain",
    status: "Completed",
  },
  // Add more mock data as needed
]

export function AppointmentManagement() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date.includes(searchTerm) ||
      appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase()),
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
        return "bg-yellow-500"
      case "Confirmed":
        return "bg-green-500"
      case "Completed":
        return "bg-blue-500"
      case "Canceled":
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
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{`${appointment.date} ${appointment.time}`}</TableCell>
              <TableCell>{appointment.symptoms}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(appointment.status)}`}>{appointment.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "Confirmed")}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "Canceled")}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(appointment.id, "Pending")}>
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
    </div>
  )
}

