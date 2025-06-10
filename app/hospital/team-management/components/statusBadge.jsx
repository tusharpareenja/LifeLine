"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


export function StatusBadge({ status, className }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Available":
        return {
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
          pulse: "animate-pulse",
        }
      case "On Duty":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          pulse: "",
        }
      case "In OT":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          pulse: "animate-pulse",
        }
      case "With Patient":
        return {
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
          pulse: "",
        }
      case "Off Duty":
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
          pulse: "",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
          pulse: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge className={cn(config.color, config.pulse, "font-medium border-0", className)}>
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${status === "Available" || status === "In OT" ? "bg-current animate-pulse" : "bg-current"}`}
        />
        <span>{status}</span>
      </div>
    </Badge>
  )
}
