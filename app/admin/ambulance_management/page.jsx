"use client"
import { MapPin, Truck, PenToolIcon as Tool, FileText, Settings, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AmbulanceMap } from "../components/ambulance_map"
import { AmbulanceList } from "../components/ambulance_list"
import { MaintenanceHistory } from "../components/maintenance_history"
import { AnalyticsCharts } from "../components/ambulance_chart"
import { AmbulanceForm } from "../components/ambulance_form"

export default function AmbulanceManagement() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Ambulance Management</h1>
      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tracking">
            <MapPin className="mr-2 h-4 w-4" />
            Live Tracking
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Truck className="mr-2 h-4 w-4" />
            Availability & Dispatch
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Tool className="mr-2 h-4 w-4" />
            Maintenance & Service
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <FileText className="mr-2 h-4 w-4" />
            Analytics & Reports
          </TabsTrigger>
          <TabsTrigger value="admin">
            <Settings className="mr-2 h-4 w-4" />
            Admin Controls
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Ambulance Tracking</CardTitle>
              <CardDescription>Real-time location and status of all ambulances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <Input
                  icon={<Search className="mr-2 h-4 w-4" />}
                  placeholder="Search ambulances..."
                  className="flex-grow"
                />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="on-duty">On Duty</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bls">Basic Life Support</SelectItem>
                    <SelectItem value="als">Advanced Life Support</SelectItem>
                    <SelectItem value="icu">ICU-equipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AmbulanceMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ambulance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Total Ambulances:</span>
                    <Badge>20</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Available:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      12
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>On Duty:</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      6
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Under Maintenance:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      2
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Dispatch Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {/* Dispatch queue items would go here */}
                    <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <div>
                        <p className="font-semibold">Emergency Call #1234</p>
                        <p className="text-sm text-gray-500">123 Main St, Cityville</p>
                      </div>
                      <Button size="sm">Assign Ambulance</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <div>
                        <p className="font-semibold">Emergency Call #1235</p>
                        <p className="text-sm text-gray-500">456 Oak Ave, Townsburg</p>
                      </div>
                      <Button size="sm">Assign Ambulance</Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          <AmbulanceList />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <MaintenanceHistory />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsCharts />
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ambulance Management</CardTitle>
              <CardDescription>Add, edit, or update ambulance details</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mb-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Ambulance
              </Button>
              <AmbulanceForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

