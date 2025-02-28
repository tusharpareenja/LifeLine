"use client"

import { useState } from "react"
import { DashboardHeader } from "./components/dashboard-header"
// import { DashboardShell } from "./components/dashboard-shell"
import { DashboardOverview } from "./components/dashboard-overview"
import { DashboardInsurance } from "./components/dashboard-insurance"
import { DashboardSavings } from "./components/dashboard-savings"
import { DashboardTransactions } from "./components/dashboard-transactions"
import { DashboardPerks } from "./components/dashboard-perks"



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto p-4 md:p-6">
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "insurance" && <DashboardInsurance />}
        {activeTab === "savings" && <DashboardSavings />}
        {activeTab === "transactions" && <DashboardTransactions />}
        {activeTab === "perks" && <DashboardPerks />}
      </div>
    </div>
  )
}

