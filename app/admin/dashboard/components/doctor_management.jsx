"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    status: "available",
    activeCases: 3,
    pendingConsultations: 2,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    status: "busy",
    activeCases: 5,
    pendingConsultations: 1,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Dr. Mike Johnson",
    status: "emergency",
    activeCases: 2,
    pendingConsultations: 0,
    image: "/placeholder.svg?height=32&width=32",
  },
]

export default function DoctorManagement() {
  const [expandedDoctor, setExpandedDoctor] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "emergency":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-gray-800 border-blue-500 border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Doctor Management</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {doctors.map((doctor) => (
            <motion.li
              key={doctor.id}
              layoutId={`doctor-${doctor.id}`}
              onClick={() => setExpandedDoctor(expandedDoctor === doctor.id ? null : doctor.id)}
              className="cursor-pointer"
            >
              <Card className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
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
                        <h3 className="font-semibold text-white">{doctor.name}</h3>
                        <Badge variant="outline" className={`${getStatusColor(doctor.status)} text-white`}>
                          {doctor.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Active Cases: {doctor.activeCases}</p>
                      <p className="text-sm text-gray-300">Pending: {doctor.pendingConsultations}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedDoctor === doctor.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-600"
                      >
                        <p className="text-sm text-gray-300">Specialty: Cardiology</p>
                        <p className="text-sm text-gray-300">Years of Experience: 10</p>
                        <p className="text-sm text-gray-300">Next Available Slot: Today, 3:00 PM</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

