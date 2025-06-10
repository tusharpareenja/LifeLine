"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const tabs = ["Admissions", "Discharges", "Emergency", "Occupancy"]

// Sample data for different chart types
const admissionsData = [
  { day: "Mon", value: 45, previous: 38 },
  { day: "Tue", value: 52, previous: 42 },
  { day: "Wed", value: 38, previous: 35 },
  { day: "Thu", value: 61, previous: 48 },
  { day: "Fri", value: 55, previous: 52 },
  { day: "Sat", value: 42, previous: 38 },
  { day: "Sun", value: 35, previous: 32 },
]

const dischargesData = [
  { day: "Mon", value: 32 },
  { day: "Tue", value: 28 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 38 },
  { day: "Fri", value: 52 },
  { day: "Sat", value: 35 },
  { day: "Sun", value: 28 },
]

const emergencyData = [
  { day: "Mon", critical: 8, urgent: 15, stable: 22 },
  { day: "Tue", critical: 12, urgent: 18, stable: 25 },
  { day: "Wed", critical: 6, urgent: 12, stable: 18 },
  { day: "Thu", critical: 15, urgent: 22, stable: 28 },
  { day: "Fri", critical: 10, urgent: 20, stable: 24 },
  { day: "Sat", critical: 7, urgent: 14, stable: 19 },
  { day: "Sun", critical: 5, urgent: 10, stable: 16 },
]

const occupancyData = [
  { name: "ICU", value: 75, color: "#ef4444" },
  { name: "General", value: 78, color: "#3b82f6" },
  { name: "Emergency", value: 65, color: "#f59e0b" },
  { name: "Surgery", value: 82, color: "#10b981" },
]

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"]

export function WeeklyActivity() {
  const [activeTab, setActiveTab] = useState("Admissions")

  const renderChart = () => {
    switch (activeTab) {
      case "Admissions":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={admissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: "#14b8a6", strokeWidth: 2, r: 4 }}
                name="This Week"
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#94a3b8", strokeWidth: 2, r: 3 }}
                name="Previous Week"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "Discharges":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dischargesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "Emergency":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emergencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
              <Bar dataKey="urgent" stackId="a" fill="#f59e0b" name="Urgent" />
              <Bar dataKey="stable" stackId="a" fill="#10b981" name="Stable" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "Occupancy":
        return (
          <div className="flex items-center justify-center h-[300px]">
            <div className="flex items-center gap-8">
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Occupancy"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {occupancyData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Weekly Hospital Activity</CardTitle>
        <p className="text-sm text-gray-600">Detailed view of hospital operations and trends</p>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              className={`flex-1 ${
                activeTab === tab
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">{renderChart()}</div>

        {/* Chart Legend/Info */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          {activeTab === "Admissions" && "Comparing current week admissions with previous week"}
          {activeTab === "Discharges" && "Daily discharge patterns throughout the week"}
          {activeTab === "Emergency" && "Emergency cases categorized by severity level"}
          {activeTab === "Occupancy" && "Current occupancy rates across different departments"}
        </div>
      </CardContent>
    </Card>
  )
}
