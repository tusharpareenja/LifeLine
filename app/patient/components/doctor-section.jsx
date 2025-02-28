"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Pediatrician",
    experience: "10 years",
    hospital: "LifeLine Children's Hospital",
    rating: 4.8,
    fee: 150,
    availability: "Available today",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Cardiologist",
    experience: "15 years",
    hospital: "LifeLine Heart Center",
    rating: 4.9,
    fee: 200,
    availability: "Next available: Tomorrow",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    experience: "8 years",
    hospital: "LifeLine Skin Clinic",
    rating: 4.7,
    fee: 180,
    availability: "Available today",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function DoctorSearch() {
  const [specialty, setSpecialty] = useState("")
  const [consultationType, setConsultationType] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select onValueChange={setSpecialty}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setConsultationType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Consultation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video Call</SelectItem>
            <SelectItem value="in-person">In-Person</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{doctor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Experience: {doctor.experience}</div>
                  <div>Hospital: {doctor.hospital}</div>
                  <div>Rating: {doctor.rating}/5</div>
                  <div>Fee: ${doctor.fee}</div>
                </div>
                <Badge className="mt-2" variant="secondary">
                  {doctor.availability}
                </Badge>
                <Button className="w-full mt-4">Book Now</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

