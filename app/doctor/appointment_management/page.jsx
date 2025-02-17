'use client'
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentManagement } from "../components/appointment_management"
import { MedicalReports } from "../components/medical-reports"
import { NotificationsPanel } from "../components/Notification-panel"

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("appointments")

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Appointments</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reports">Medical Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <AppointmentManagement />
        </TabsContent>
        <TabsContent value="reports">
          <MedicalReports />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
