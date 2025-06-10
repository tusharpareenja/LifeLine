"use client"

import { Bell, Sun, Moon, HelpCircle, User, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function TopHeader({ isDark, setIsDark, accent, setAccent }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-teal-500" />
          <span className="text-xl font-semibold text-gray-900">LifeLine</span>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-teal-500 text-white text-xs">
              3
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Accent Color Selector */}
          <Select value={accent} onValueChange={(value) => setAccent(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teal">Teal</SelectItem>
              <SelectItem value="violet">Violet</SelectItem>
              <SelectItem value="green">Green</SelectItem>
            </SelectContent>
          </Select>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Sarah Chen</p>
            </div>
          </div>

          {/* Mode Indicator */}
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Normal Mode
          </Badge>
        </div>
      </div>
    </header>
  )
}
