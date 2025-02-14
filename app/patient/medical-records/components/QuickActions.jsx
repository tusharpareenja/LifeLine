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
import Link from "next/link"

export default function QuickActions() {
    return (
      <div className="mb-8 flex justify-center sm:justify-end space-x-4">
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Report
        </Button>
        <Link href={'/patient/medical-records/download_record'} >

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download All
        </Button>
        
        </Link>

        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" /> Share with Doctor
        </Button>
      </div>
    )
  }