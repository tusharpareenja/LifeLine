"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AppleIcon, SmartphoneIcon as AndroidIcon } from "lucide-react"

const DownloadButton = React.memo(({ icon, children }) => (
  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
    {icon}
    {children}
  </Button>
))

DownloadButton.displayName = "DownloadButton"

export default function DownloadSection() {
  return (
    <section id="download" className="py-12 bg-gradient-to-br from-blue-600 to-green-400 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Get LifeLine on Your Mobile</h2>
          <p className="text-xl mb-6">Download our app for instant access to healthcare, anytime, anywhere.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <DownloadButton icon={<AppleIcon className="mr-2 h-5 w-5" />}>Download for iOS</DownloadButton>
            <DownloadButton icon={<AndroidIcon className="mr-2 h-5 w-5" />}>Download for Android</DownloadButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/path/to/app-screenshot.png"
            alt="LifeLine App Screenshot"
            className="max-w-xs mx-auto rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}

