"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import QuickOverview from "./components/QuickOverview";
import NextAppointments from "./components/NextAppointments";
import PatientManagement from "./components/PatientManagement";
import AIInsights from "./components/AiInsight";
import SmartActionsSidebar from "./components/SmartActionSidebar";
import { getDoctorById } from "@/app/actions/doctors";

export default function DoctorDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [doctorData, setDoctorData] = useState(null);



  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorId = sessionStorage.getItem("doctorId");
        console.log("Fetching doctor details with ID:", doctorId);
        
        const response = await getDoctorById(doctorId);
        console.log("doctor data structure:", JSON.stringify(response, null, 2));
        
        if (response && response.success && response.data) {
          setDoctorData(response.data);
        } else {
          console.error("Failed to fetch patient data or invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    
    fetchDoctorDetails();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
        <HeroSection darkMode={darkMode} setDarkMode={setDarkMode} doctor={doctorData}/>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickOverview />
          </div>
          <div className="mt-8">
            <NextAppointments />
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PatientManagement />
            <AIInsights />
          </div>
        </main>
        <SmartActionsSidebar />
      </div>
    </div>
  );
}
