"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getHospitalDetails, getHospitalRequests } from "@/app/actions/admin"

export default function HospitalOverview() {
  const [occupiedBeds, setOccupiedBeds] = useState(150)
  const [availableBeds, setAvailableBeds] = useState(50)
  const [icuCapacity, setIcuCapacity] = useState(75)
  const [ventilators, setVentilators] = useState(5)

  const fetchDetails = async () => {
    const res = await getHospitalDetails(sessionStorage.getItem("hospitalId"));
    setOccupiedBeds(res.totalBeds - res.availableBeds);
    setAvailableBeds(res.availableBeds);
    setIcuCapacity(res.icuBeds);
    setVentilators(res.ventilators);
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <Card className="bg-gray-800 border-blue-500 border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Hospital Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Occupied Beds:</span>
            <motion.span
              key={occupiedBeds}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-blue-500"
            >
              {occupiedBeds}
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Available Beds:</span>
            <motion.span
              key={availableBeds}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-green-500"
            >
              {availableBeds}
            </motion.span>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">ICU Capacity:</span>
              <span className="text-xl font-bold text-yellow-500">{icuCapacity}%</span>
            </div>
            <Progress value={icuCapacity} className="h-2 bg-gray-700" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Ventilators:</span>
            <motion.span
              key={ventilators}
              initial={{ scale: 1.5, color: "#EF4444" }}
              animate={{ scale: 1, color: "#F87171" }}
              className="text-2xl font-bold"
            >
              {ventilators}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

