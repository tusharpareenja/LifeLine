"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { navigationItems } from "../utils/constants"
import { cn } from "@/lib/utils"


export function NavigationBar({ selectedCategory, onCategoryChange, stats }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = selectedCategory === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "outline"}
                onClick={() => onCategoryChange(item.id)}
                className={cn("flex items-center gap-2 h-auto py-3 px-4", isActive && "bg-blue-600 hover:bg-blue-700")}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
                <Badge
                  variant="secondary"
                  className={cn("ml-1", isActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600")}
                >
                  {item.id === "all"
                    ? stats.total
                    : item.id === "ventilators"
                      ? 45
                      : Math.floor(stats.total * (item.count / 200))}
                </Badge>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
