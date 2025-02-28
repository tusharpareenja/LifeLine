"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import HospitalOverview from "./components/hospital_overview"
import DoctorManagement from "./components/doctor_management"
import AmbulanceManagement from "./components/ambulance_management"
import DiseaseInsights from "./components/disease_insight"
import NotificationCenter from "./components/notification_center"
import { auth } from "@/lib/auth"
import { getSession, useSession } from "next-auth/react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-gray-900 text-white">
    
      <main className="flex-1 p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <HospitalOverview />
          <DoctorManagement />
          <AmbulanceManagement />
          <DiseaseInsights />
        </motion.div>
        <NotificationCenter />
      </main>
    </div>
  )
}

