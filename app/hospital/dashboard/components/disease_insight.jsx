"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const initialData = [
  { name: "Jan", covid: 4000, flu: 2400, pneumonia: 2400 },
  { name: "Feb", covid: 3000, flu: 1398, pneumonia: 2210 },
  { name: "Mar", covid: 2000, flu: 9800, pneumonia: 2290 },
  { name: "Apr", covid: 2780, flu: 3908, pneumonia: 2000 },
  { name: "May", covid: 1890, flu: 4800, pneumonia: 2181 },
  { name: "Jun", covid: 2390, flu: 3800, pneumonia: 2500 },
]

export default function DiseaseInsights() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          covid: item.covid + Math.floor(Math.random() * 200 - 100),
          flu: item.flu + Math.floor(Math.random() * 200 - 100),
          pneumonia: item.pneumonia + Math.floor(Math.random() * 200 - 100),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gray-800 border-blue-500 border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-400">Disease Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip contentStyle={{ backgroundColor: "#2D3748", border: "none" }} itemStyle={{ color: "#A0AEC0" }} />
              <Line type="monotone" dataKey="covid" stroke="#3182CE" strokeWidth={2} />
              <Line type="monotone" dataKey="flu" stroke="#48BB78" strokeWidth={2} />
              <Line type="monotone" dataKey="pneumonia" stroke="#ED8936" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  )
}

