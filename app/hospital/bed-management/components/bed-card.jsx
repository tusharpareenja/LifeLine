"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import { statusConfig } from "../utils/constants"
import { cn } from "@/lib/utils"

export function BedCard({ bed, onClick }) {
  // Defensive: handle missing status or config
  const statusKey = (bed.status || "").toLowerCase();
  const config = statusConfig[statusKey] || statusConfig["available"];
  return (
    <Card
      className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-l-4"
      style={{ borderLeftColor: config.color.replace("bg-", "#") }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {bed.id}
              {bed.hasVentilator && <Activity className="h-4 w-4 text-blue-500" />}
            </h3>
            <p className="text-sm text-muted-foreground">
              {bed.ward} - Room {bed.room}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={cn(config.textColor, config.bgColor)}
          >
            {config.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Type:</span>
            <span className="text-sm">{bed.type}</span>
          </div>

          {bed.patient && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Patient:</span>
              <span className="text-sm">{bed.patient}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Updated:</span>
            <span className="text-xs text-muted-foreground">{bed.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
