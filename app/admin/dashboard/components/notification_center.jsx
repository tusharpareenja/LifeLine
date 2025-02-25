"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, X } from "lucide-react"

const initialNotifications = [
  { id: 1, message: "New emergency case admitted", type: "emergency" },
  { id: 2, message: "Dr. Smith's shift starts in 30 minutes", type: "info" },
  { id: 3, message: "Low stock alert: Surgical masks", type: "warning" },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(initialNotifications)

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New notification ${Math.floor(Math.random() * 100)}`,
        type: ["emergency", "info", "warning"][Math.floor(Math.random() * 3)],
      }
      setNotifications((prev) => [newNotification, ...prev.slice(0, 2)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="mb-2"
          >
            <Card
              className={`bg-gray-800 border-l-4 ${
                notification.type === "emergency"
                  ? "border-red-500"
                  : notification.type === "warning"
                    ? "border-yellow-500"
                    : "border-blue-500"
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-gray-300">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

