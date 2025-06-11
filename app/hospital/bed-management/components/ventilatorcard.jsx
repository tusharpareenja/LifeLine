"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { statusConfig } from "../utils/constants"
import { cn } from "@/lib/utils"


export function VentilatorCard({ ventilator, onClick }) {
  return (
    <Card
      className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-l-4"
      style={{ borderLeftColor: statusConfig[ventilator.status].color.replace("bg-", "#") }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{ventilator.id}</h3>
            <p className="text-sm text-muted-foreground">{ventilator.model}</p>
          </div>
          <Badge
            variant="secondary"
            className={cn(statusConfig[ventilator.status].textColor, statusConfig[ventilator.status].bgColor)}
          >
            {statusConfig[ventilator.status].label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Location:</span>
            <span className="text-sm">{ventilator.location}</span>
          </div>

          {ventilator.assignedBed && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Assigned Bed:</span>
              <span className="text-sm">{ventilator.assignedBed}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Battery:</span>
            <span className={cn("text-sm", ventilator.batteryLevel < 20 ? "text-red-500" : "text-green-500")}>
              {ventilator.batteryLevel}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
