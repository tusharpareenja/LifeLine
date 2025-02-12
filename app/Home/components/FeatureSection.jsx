"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Activity, Video, Brain, FileText, Users, Hospital } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const features = [
  {
    icon: Activity,
    title: "Real-Time Bed Availability",
    description: "Find hospitals with vacant beds instantly.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Video,
    title: "24/7 Telemedicine",
    description: "Talk to doctors anytime via video consultations.",
    color: "from-orange-400 to-amber-500",
  },
  {
    icon: Brain,
    title: "AI Symptom Checker",
    description: "Get health insights instantly with our AI-powered tool.",
    color: "from-yellow-400 to-lime-500",
  },
  {
    icon: FileText,
    title: "Secure Health Records",
    description: "Store & access your medical history anytime, anywhere.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "Family Medical History",
    description: "Track and identify hereditary health risks.",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: Hospital,
    title: "Live Hospital Dashboard",
    description: "Track ICU, general, and ventilator beds in real-time.",
    color: "from-blue-400 to-indigo-500",
  },
]

const FeatureCard = React.memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card
            className={`bg-gradient-to-br ${feature.color} text-white hover:shadow-lg transition-all duration-300 h-full transform hover:scale-105`}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <feature.icon className="h-12 w-12 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{feature.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </motion.div>
))

FeatureCard.displayName = "FeatureCard"

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Core Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

