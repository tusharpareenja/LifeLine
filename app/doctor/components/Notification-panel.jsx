"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, FileText, AlertTriangle } from "lucide-react"

// Mock data for notifications
const mockNotifications = [
  { id: 1, type: "appointment", message: "New appointment request from John Doe", time: "5 minutes ago" },
  { id: 2, type: "report", message: "Lab test results uploaded for Jane Smith", time: "1 hour ago" },
  { id: 3, type: "emergency", message: "Emergency case: Cardiology consultation needed", time: "30 minutes ago" },
  // Add more mock data as needed
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: notifications.length + 1,
        type: ["appointment", "report", "emergency"][Math.floor(Math.random() * 3)],
        message: `New notification ${notifications.length + 1}`,
        time: "Just now",
      }
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications])
    }, 30000) // Add a new notification every 30 seconds

    return () => clearInterval(interval)
  }, [notifications])

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "report":
        return <FileText className="h-5 w-5 text-green-500" />
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardHeader className="flex flex-row items-center space-x-4 py-4">
            {getNotificationIcon(notification.type)}
            <CardTitle>{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</CardTitle>
            <Badge variant="outline" className="ml-auto">
              {notification.time}
            </Badge>
          </CardHeader>
          <CardContent>
            <p>{notification.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

