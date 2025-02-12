"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import EmergencyRequestsSection from "../components/EmergencyRequestsSection"
import PrescriptionManagementSection from "../components/PrescriptionManagementSection"
import { ThemeProvider } from "next-themes"
import { useTheme } from "next-themes"

export default function EmergencyDashboard() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-900 dark:to-red-900 text-blue-900 dark:text-blue-50 transition-colors duration-300">
        <header className="p-4 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">LifeLine Emergency Services</h1>

        </header>
        <main className="container mx-auto p-4 space-y-8">
          <EmergencyRequestsSection />
          <PrescriptionManagementSection />
        </main>
        <footer className="p-4 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
          <p className="text-sm text-blue-600 dark:text-blue-400">Every Second Counts. Save Lives, Instantly!</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Your Expertise, Your Control – Handle Emergencies with Confidence!
          </p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

