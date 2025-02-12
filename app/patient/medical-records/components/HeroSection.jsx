"use client"

import React from "react"
import { Search, Upload, Download, Share2, Moon, Sun, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function HeroSection() {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-500 dark:text-gray-400">Patient ID: 123456</p>
              <div className="mt-2 flex items-center">
                <span className="text-sm font-medium mr-2">Health Score:</span>
                <Badge variant="secondary">85/100</Badge>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <QuickSummaryItem title="Last Consultation" value="May 15, 2025" />
            <QuickSummaryItem title="Chronic Conditions" value="None" />
            <QuickSummaryItem title="Latest Report" value="Blood Test (May 10, 2025)" />
          </div>
        </CardContent>
      </Card>
    )
  }


  function QuickSummaryItem({ title, value }) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-1 text-lg font-semibold">{value}</p>
      </div>
    )
  }