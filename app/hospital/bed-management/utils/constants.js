import { Building2, Bed, Heart, Zap, Baby, Activity, Stethoscope } from "lucide-react"

export const statusConfig = {
  available: {
    label: "Available",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  occupied: {
    label: "Occupied",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  reserved: {
    label: "Reserved",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-gray-500",
    textColor: "text-gray-700",
    bgColor: "bg-gray-50 dark:bg-gray-950",
  },
  "in-use": {
    label: "In Use",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
}

export const navigationItems = [
  { id: "all", label: "All Beds", icon: Building2, count: 200 },
  { id: "general", label: "General", icon: Bed, count: 85 },
  { id: "icu", label: "ICU", icon: Heart, count: 45 },
  { id: "emergency", label: "Emergency", icon: Zap, count: 25 },
  { id: "pediatric", label: "Pediatric", icon: Baby, count: 20 },
  { id: "cardiac", label: "Cardiac", icon: Activity, count: 15 },
  { id: "surgical", label: "Surgical", icon: Stethoscope, count: 10 },
  { id: "ventilators", label: "Ventilators", icon: Activity, count: 45 },
]
