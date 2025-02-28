"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import QuickOverview from "./components/QuickOverview";
import NextAppointments from "./components/NextAppointments";
import PatientManagement from "./components/PatientManagement";
import AIInsights from "./components/AiInsight";
import SmartActionsSidebar from "./components/SmartActionSidebar";

export default function DoctorDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
        <HeroSection darkMode={darkMode} setDarkMode={setDarkMode} />
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
