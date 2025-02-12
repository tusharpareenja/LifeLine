"use client"

import { useState } from "react"
import { Bell, Sun, Moon, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export default function HeroSection({ darkMode, setDarkMode }) {
  const [notifications, setNotifications] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-900 dark:to-teal-700 text-white py-6 px-4 rounded-b-3xl shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Dr. John Doe</h1>
            <p className="text-sm opacity-75">Cardiologist</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>New York, NY</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setNotifications(!notifications)}>
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-blue-600" />
            <Moon className="h-5 w-5" />
          </div> */}
        </div>
      </div>
    </header>
  )
}

