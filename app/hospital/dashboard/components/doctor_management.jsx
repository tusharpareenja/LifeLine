"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getDoctors } from "@/app/actions/doctors"

export default function DoctorManagement() {
  const [expandedDoctor, setExpandedDoctor] = useState(null)
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res.data);
        console.log(res);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

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
        {doctors.length === 0 ? (
          <p className="text-gray-300 text-center">No doctors available</p>
        ) : (
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
                            {doctor.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{doctor.user.name}</h3>
                          {/* <Badge className={`${getStatusColor(doctor.status)} text-white`}>
                            {doctor.status}
                          </Badge> */}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">{doctor.specialization}</p>
                        <p className="text-sm text-gray-300">Experience: {doctor.experience} years</p>
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
                          <p className="text-sm text-gray-300">Specialty: {doctor.specialization}</p>
                          <p className="text-sm text-gray-300">Years of Experience: {doctor.experience}</p>
                          <p className="text-sm text-gray-300">Next Available Slot: {doctor.nextAvailableSlot}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}