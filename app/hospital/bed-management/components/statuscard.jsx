"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bed, CheckCircle, Users, AlertTriangle, Activity } from "lucide-react"
import { cn } from "@/lib/utils"


export function StatsCards({ stats, selectedCategory }) {
  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <Card className={cn("transition-all duration-200 hover:shadow-lg", bgColor)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn("p-2 rounded-full", color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Total"
        value={stats.total}
        icon={selectedCategory === "ventilators" ? Activity : Bed}
        color="bg-blue-500"
        bgColor="bg-blue-50 dark:bg-blue-950"
      />
      <StatCard
        title="Available"
        value={stats.available}
        icon={CheckCircle}
        color="bg-green-500"
        bgColor="bg-green-50 dark:bg-green-950"
      />
      <StatCard
        title={selectedCategory === "ventilators" ? "In Use" : "Occupied"}
        value={stats.occupied}
        icon={Users}
        color="bg-red-500"
        bgColor="bg-red-50 dark:bg-red-950"
      />
      <StatCard
        title="Maintenance"
        value={stats.maintenance}
        icon={AlertTriangle}
        color="bg-yellow-500"
        bgColor="bg-yellow-50 dark:bg-yellow-950"
      />
    </div>
  )
}
