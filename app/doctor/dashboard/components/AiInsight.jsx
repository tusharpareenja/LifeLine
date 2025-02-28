"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", Flu: 4000, COVID: 2400, Allergies: 2400 },
  { name: "Feb", Flu: 3000, COVID: 1398, Allergies: 2210 },
  { name: "Mar", Flu: 2000, COVID: 9800, Allergies: 2290 },
  { name: "Apr", Flu: 2780, COVID: 3908, Allergies: 2000 },
  { name: "May", Flu: 1890, COVID: 4800, Allergies: 2181 },
  { name: "Jun", Flu: 2390, COVID: 3800, Allergies: 2500 },
]

export default function AIInsights() {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Flu" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="COVID" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Allergies" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h4 className="font-semibold">Key Insights:</h4>
          <ul className="list-disc list-inside">
            <li>COVID cases peaked in March</li>
            <li>Flu cases are declining</li>
            <li>Allergy cases are on the rise</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

