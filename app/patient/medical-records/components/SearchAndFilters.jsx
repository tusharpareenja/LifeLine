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
export default function SearchAndFilters() {
    return (
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search medical records..." className="pl-10 w-full" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date: Newest First</DropdownMenuItem>
            <DropdownMenuItem>Date: Oldest First</DropdownMenuItem>
            <DropdownMenuItem>Category</DropdownMenuItem>
            <DropdownMenuItem>Doctor's Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }