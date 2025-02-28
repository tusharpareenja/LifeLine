

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ambulance } from "lucide-react"

const ambulances = [
  { id: 1, status: "vacant", lastService: "2023-06-15", fullyEquipped: true, location: "Hospital" },
  { id: 2, status: "occupied", lastService: "2023-05-30", fullyEquipped: true, location: "En route to emergency" },
  { id: 3, status: "maintenance", lastService: "2023-07-01", fullyEquipped: false, location: "Service Center" },
]

export default function AmbulanceManagement() {
  const [ambulancePositions, setAmbulancePositions] = useState(ambulances.map(() => ({ x: 0, y: 0 })))

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePositions((prev) =>
        prev.map((pos) => ({
          x: pos.x + (Math.random() - 0.5) * 20,
          y: pos.y + (Math.random() - 0.5) * 20,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "vacant":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-gray-800 border-blue-500 border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Ambulance Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-gray-700 rounded-lg overflow-hidden">
          {ambulances.map((ambulance, index) => (
            <motion.div
              key={ambulance.id}
              animate={{ x: ambulancePositions[index].x, y: ambulancePositions[index].y }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute"
              style={{ left: `${(index + 1) * 25}%`, top: "50%" }}
            >
              <Ambulance
                className={`w-8 h-8 ${
                  ambulance.status === "vacant"
                    ? "text-green-500"
                    : ambulance.status === "occupied"
                      ? "text-red-500"
                      : "text-yellow-500"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <ul className="mt-4 space-y-4">
          {ambulances.map((ambulance) => (
            <li key={ambulance.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className={`${getStatusColor(ambulance.status)} text-white`}>
                    {ambulance.status}
                  </Badge>
                  <span className="text-white font-semibold">Ambulance #{ambulance.id}</span>
                </div>
                <span className="text-gray-300 text-sm">{ambulance.location}</span>
              </div>
              <div className="mt-2 text-sm text-gray-300">
                <p>Last Service: {ambulance.lastService}</p>
                <p>Fully Equipped: {ambulance.fullyEquipped ? "Yes" : "No"}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

