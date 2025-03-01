"use client"

import React, { useEffect, useState } from "react"
import { Search, Upload, Download, Share2, Moon, Sun, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import HeroSection from "./components/HeroSection"
import SearchAndFilters from "./components/SearchAndFilters"
import QuickActions from "./components/QuickActions"
import CategorizedMedicalRecords from "./components/CategorizedMedicalRecords"
import EmergencyHealthSummary from "./components/EmergencyHealthSummary"
import { useSession } from "next-auth/react"
import { getPatientById } from "@/app/actions/patients"

export default function MedicalHistory() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [user, setPatientData] = useState({});
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientId = sessionStorage.getItem("patientId");
        console.log("Fetching patient details with ID:", patientId);
        
        const response = await getPatientById(patientId);
        console.log("Patient data structure:", JSON.stringify(response, null, 2));
        
        if (response && response.success && response.data) {
          setPatientData(response.data);
        } else {
          console.error("Failed to fetch patient data or invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    
    fetchPatientDetails();
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Medical History</h1>
        
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection user={user}/>
        <SearchAndFilters/>
        <QuickActions />
        <CategorizedMedicalRecords />
        <EmergencyHealthSummary />
      </main>
    </div>
  )
}




