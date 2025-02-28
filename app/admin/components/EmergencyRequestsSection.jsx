"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ambulance, Clock, MapPin } from "lucide-react"

// Mock data for demonstration
const mockEmergencies = [
  {
    id: 1,
    name: "John Doe",
    condition: "Cardiac Arrest",
    priority: "critical",
    location: "123 Main St",
    eta: "5 mins",
    waitingTime: 2,
    ambulanceStatus: "En Route",
  },
  {
    id: 2,
    name: "Jane Smith",
    condition: "Severe Burns",
    priority: "high",
    location: "456 Elm St",
    eta: "10 mins",
    waitingTime: 8,
    ambulanceStatus: "Delayed",
  },
  {
    id: 3,
    name: "Bob Johnson",
    condition: "Broken Leg",
    priority: "moderate",
    location: "789 Oak St",
    eta: "15 mins",
    waitingTime: 12,
    ambulanceStatus: "Arrived",
  },
]

const priorityColors = {
  critical: "bg-red-600",
  high: "bg-orange-500",
  moderate: "bg-yellow-500",
  low: "bg-green-500",
}

export default function EmergencyRequestsSection() {
  const [emergencies, setEmergencies] = useState(mockEmergencies)
  const [activeCases, setActiveCases] = useState(0)
  const [availableBeds, setAvailableBeds] = useState({ icu: 5, ventilator: 3, general: 10 })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCases((prev) => (prev + 1) % 100)
      setAvailableBeds((prev) => ({
        icu: Math.max(0, prev.icu + Math.floor(Math.random() * 3) - 1),
        ventilator: Math.max(0, prev.ventilator + Math.floor(Math.random() * 3) - 1),
        general: Math.max(0, prev.general + Math.floor(Math.random() * 5) - 2),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Active Cases</h3>
            <motion.div
              className="text-4xl font-bold text-red-600 dark:text-red-400"
              key={activeCases}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeCases}
            </motion.div>
          </CardContent>
        </Card>
        {Object.entries(availableBeds).map(([type, count]) => (
          <Card key={type} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 capitalize">{type} Beds</h3>
              <motion.div
                className="text-4xl font-bold text-blue-600 dark:text-blue-400"
                key={count}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {count}
              </motion.div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Emergency Requests</h2>
        <AnimatePresence>
          {emergencies.map((emergency) => (
            <motion.div
              key={emergency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`${priorityColors[emergency.priority]} bg-opacity-20 dark:bg-opacity-30 backdrop-blur-md shadow-lg`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {emergency.name} - {emergency.condition}
                      </h3>
                      <p className="text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {emergency.location} (ETA: {emergency.eta})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm flex items-center justify-end">
                        <Clock className="w-4 h-4 mr-1" />
                        Waiting: {emergency.waitingTime} mins
                      </p>
                      <p className="text-sm flex items-center justify-end">
                        <Ambulance className="w-4 h-4 mr-1" />
                        {emergency.ambulanceStatus}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="secondary">View Case & Respond</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

