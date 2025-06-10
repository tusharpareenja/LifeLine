"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText, AlertTriangle, BarChart3 } from "lucide-react"

const actions = [
  { icon: Plus, label: "Add New Doctor" },
  { icon: FileText, label: "Update Bed Count" },
  { icon: AlertTriangle, label: "Trigger Emergency Mode" },
  { icon: BarChart3, label: "Change Chart Type" },
]

export function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button key={action.label} variant="outline" className="flex items-center gap-2 bg-white hover:bg-gray-50">
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
