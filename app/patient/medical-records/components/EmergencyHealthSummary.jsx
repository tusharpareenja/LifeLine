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

export default function EmergencyHealthSummary() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
            Emergency Health Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Blood Type:</strong> A+
            </p>
            <p>
              <strong>Allergies:</strong> Penicillin
            </p>
            <p>
              <strong>Chronic Conditions:</strong> None
            </p>
            <p>
              <strong>Emergency Contact:</strong> Jane Doe (Spouse) - 555-1234
            </p>
          </div>
          <Button className="mt-4" variant="destructive">
            View Full Emergency Profile
          </Button>
        </CardContent>
      </Card>
    )
  }