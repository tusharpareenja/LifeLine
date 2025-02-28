"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

const ambulanceUsageData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Ambulance Dispatches",
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
}

const responseTimeData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Average Response Time (minutes)",
      data: [8, 7, 6, 5],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
}

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Ambulance Usage</CardTitle>
          <CardDescription>Number of ambulance dispatches per day</CardDescription>
        </CardHeader>
        <CardContent>
          <Bar data={ambulanceUsageData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Response Time</CardTitle>
          <CardDescription>Weekly average response time in minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <Line data={responseTimeData} />
        </CardContent>
      </Card>
    </div>
  )
}

