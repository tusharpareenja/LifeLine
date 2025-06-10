"use client"

import { useState } from "react"

import { TopHeader } from "./components/top-header"
import { HospitalStatus } from "./components/hospital-status"
import { StatsGrid } from "./components/status-grid"
import { QuickActions } from "./components/QuickAction"
import { WeeklyActivity } from "./components/WeeklyActivity"

export default function LifeLineDashboard() {
  const [isDark, setIsDark] = useState(false)
  const [accent, setAccent] = useState("teal")

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader isDark={isDark} setIsDark={setIsDark} accent={accent} setAccent={setAccent} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <HospitalStatus />
          <StatsGrid />
          <QuickActions />
          <WeeklyActivity />
        </main>
      </div>
    </div>
  )
}
