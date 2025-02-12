"use client"

import React from "react"
import { Shield, Lock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const securityFeatures = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your medical data is protected by industry-leading security standards.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your data is encrypted in transit and at rest for maximum security.",
  },
  {
    icon: CheckCircle,
    title: "GDPR Compliant",
    description: "We adhere to strict data protection regulations to ensure your privacy.",
  },
]

const SecurityFeature = React.memo(({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="bg-blue-800 rounded-full p-4 inline-block mb-4">
      <feature.icon className="h-8 w-8 text-green-400" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
    <p className="text-sm text-blue-200">{feature.description}</p>
  </motion.div>
))

SecurityFeature.displayName = "SecurityFeature"

export default function SecuritySection() {
  return (
    <section id="security" className="py-12 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Your Data, Our Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <SecurityFeature key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

