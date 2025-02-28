"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Header from "../components/header"
import DoctorSearch from "../components/doctor-section"
import AppointmentScheduling from "../components/appointment-scheduling"
import LiveDoctorAvailability from "../components/live-doctor-availability"
import AppointmentManagement from "../components/appointment-management"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, PhoneCall, Download } from "lucide-react"
import Link from "next/link"

export default function ConsultationAppointmentPage() {
  const [activeTab, setActiveTab] = useState("search")
  const { setTheme, theme } = useTheme()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Header />

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button variant={activeTab === "search" ? "default" : "outline"} onClick={() => setActiveTab("search")}>
            Find & Book Doctors
          </Button>
          <Button
            variant={activeTab === "appointments" ? "default" : "outline"}
            onClick={() => setActiveTab("appointments")}
          >
            Your Appointments
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {activeTab === "search" ? (
          <>
            <DoctorSearch />
            <LiveDoctorAvailability />
          </>
        ) : (
          <AppointmentManagement />
        )}
      </motion.div>

      <AppointmentScheduling />

      <div className="fixed bottom-4 right-4 space-x-2">
        <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
          <PhoneCall className="mr-2 h-4 w-4" />
          Emergency Consultation
        </Button>
        <Link href={'/patient/medical-records/download_record'}>
        <Button size="lg" variant="outline">
           
          <Download className="mr-2 h-4 w-4" />
          Download Reports
        </Button>
            
        </Link>
        
      </div>
    </div>
  )
}

