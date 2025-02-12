"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoConsultation from "./components/VideoConsultation";
import SymptomChecker from "./components/SymptomChecker";
import PrescriptionsAndReports from "./components/PrescriptionAndReports";
import MedicineOrdering from "./components/MedicineOrdering";
import MentalHealth from "./components/MentalHealth";

export default function TelemedicineServices() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Telemedicine & Health Services
          </h1>
          {/* <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button> */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="video-consultation" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-4">
            <TabsTrigger value="video-consultation" className="text-sm md:text-base">
              Video Consultation
            </TabsTrigger>
            <TabsTrigger value="symptom-checker" className="text-sm md:text-base">
              Symptom Checker
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-sm md:text-base">
              Prescriptions & Reports
            </TabsTrigger>
            <TabsTrigger value="medicine-ordering" className="text-sm md:text-base">
              Medicine Ordering
            </TabsTrigger>
            <TabsTrigger value="mental-health" className="text-sm md:text-base">
              Mental Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video-consultation">
            <VideoConsultation />
          </TabsContent>

          <TabsContent value="symptom-checker">
            <SymptomChecker />
          </TabsContent>

          <TabsContent value="prescriptions">
            <PrescriptionsAndReports />
          </TabsContent>

          <TabsContent value="medicine-ordering">
            <MedicineOrdering />
          </TabsContent>

          <TabsContent value="mental-health">
            <MentalHealth />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
