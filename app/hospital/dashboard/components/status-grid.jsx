"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Bed, Users, AlertTriangle, HeartPulse } from "lucide-react"
import { getHospitalDetails } from "@/app/actions/admin"
import { getBeds } from "@/app/actions/beds"

export function StatsGrid() {
  const [stats, setStats] = useState([
    {
      title: "Total Beds",
      value: "0",
      total: "0",
      subtitle: "0% Occupancy Rate",
      trend: "Loading...",
      trendColor: "text-gray-500",
      icon: Bed,
      iconColor: "text-teal-500",
    },
    {
      title: "ICU Beds",
      value: "0",
      total: "0",
      subtitle: "0% Utilization",
      trend: "Loading...",
      trendColor: "text-gray-500",
      icon: HeartPulse,
      iconColor: "text-red-500",
    },
    {
      title: "Doctors On Duty",
      value: "0",
      total: "",
      subtitle: "Loading staff data",
      trend: "Loading...",
      trendColor: "text-gray-500",
      icon: Users,
      iconColor: "text-blue-500",
    },
    {
      title: "Emergency Patients",
      value: "0",
      total: "",
      subtitle: "Last 24 hours",
      trend: "Loading...",
      trendColor: "text-gray-500",
      icon: AlertTriangle,
      iconColor: "text-orange-500",
    },
  ])

  const fetchHospitalDetails = async () => {
    try {
      const hospitalId = sessionStorage.getItem("hospitalId")
      if (!hospitalId) {
        console.error("Hospital ID not found in session storage")
        return
      }

      // Fetch both hospital details and beds
      const [details, bedsResult] = await Promise.all([
        getHospitalDetails(hospitalId),
        getBeds(hospitalId)
      ])

      // Calculate bed statistics
      const allBeds = bedsResult?.success ? bedsResult.data : []
      const totalBeds = allBeds.length
      const availableBeds = allBeds.filter(bed => bed.status === "AVAILABLE").length
      const occupiedBeds = allBeds.filter(bed => bed.status === "OCCUPIED").length
      const maintenanceBeds = allBeds.filter(bed => bed.status === "MAINTENANCE").length
      
      // Calculate ICU specific stats
      const icuBeds = allBeds.filter(bed => bed.type.toLowerCase() === "icu").length
      const occupiedIcuBeds = allBeds.filter(bed => 
        bed.type.toLowerCase() === "icu" && bed.status === "OCCUPIED"
      ).length

      // Calculate percentages safely
      const totalOccupancy = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0
      const icuUtilization = icuBeds > 0 ? Math.round((occupiedIcuBeds / icuBeds) * 100) : 0

      // Determine trends
      const totalTrend = availableBeds < (totalBeds / 2) ? 
        { text: `${availableBeds} beds available`, color: "text-orange-600" } : 
        { text: `${availableBeds} beds available`, color: "text-teal-600" }
      
      const icuTrend = occupiedIcuBeds > (icuBeds / 2) ? 
        { text: `${icuBeds - occupiedIcuBeds} ICU beds free`, color: "text-orange-600" } : 
        { text: `${icuBeds - occupiedIcuBeds} ICU beds free`, color: "text-teal-600" }

      // Update stats with real-time bed data
      setStats([
        {
          title: "Total Beds",
          value: occupiedBeds.toString(),
          total: totalBeds.toString(),
          subtitle: `${totalOccupancy}% Occupancy Rate`,
          trend: totalTrend.text,
          trendColor: totalTrend.color,
          icon: Bed,
          iconColor: "text-teal-500",
        },
        {
          title: "ICU Beds",
          value: occupiedIcuBeds.toString(),
          total: icuBeds.toString(),
          subtitle: `${icuUtilization}% Utilization`,
          trend: icuTrend.text,
          trendColor: icuTrend.color,
          icon: HeartPulse,
          iconColor: "text-red-500",
        },
        {
          title: "Doctors Available",
          value: "12",
          total: "",
          subtitle: "Not available",
          trend: "N/A",
          trendColor: "text-gray-400",
          icon: Users,
          iconColor: "text-blue-500",
        },
        {
          title: "Emergency Patients",
          value: "N/A",
          total: "",
          subtitle: "Not available",
          trend: "N/A",
          trendColor: "text-gray-400",
          icon: AlertTriangle,
          iconColor: "text-orange-500",
        },
      ])
    } catch (error) {
      console.error("Failed to fetch hospital details:", error)
      // Update stats with error state
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        subtitle: "Error loading data",
        trend: "Data unavailable",
        trendColor: "text-red-500"
      })))
    }
  }

  useEffect(() => {
    fetchHospitalDetails()
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchHospitalDetails, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                {stat.total && <span className="text-xl text-gray-400">/ {stat.total}</span>}
              </div>
              <p className="text-sm text-gray-600">{stat.subtitle}</p>
              <p className={`text-xs ${stat.trendColor} flex items-center gap-1`}>
                {stat.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}