"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Upload } from "lucide-react"

// Mock data for demonstration
const mockPrescriptions = [
  {
    id: 1,
    patientName: "Alice Johnson",
    medicine: "Amoxicillin",
    doctor: "Dr. Smith",
    date: "2023-05-15",
    status: "Completed",
  },
  {
    id: 2,
    patientName: "Bob Williams",
    medicine: "Lisinopril",
    doctor: "Dr. Jones",
    date: "2023-05-16",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Carol Davis",
    medicine: "Metformin",
    doctor: "Dr. Brown",
    date: "2023-05-17",
    status: "Completed",
  },
]

export default function PrescriptionManagementSection() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    Object.values(prescription).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Prescription Management</h2>
        <div className="space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Lab Reports
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <motion.div
            key={prescription.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{prescription.patientName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.medicine}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{prescription.doctor}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.date}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      prescription.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {prescription.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

