"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { GetInsurance } from "@/components/get-insurance"
import { AddExistingInsurance } from "@/components/add-existing-insurance"
import { ArrowLeft } from "lucide-react"



export function InsuranceInterface({ initialTab, onReset }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 md:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onBack={onReset} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "get" && (
            <motion.div
              key="get"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GetInsurance />
            </motion.div>
          )}

          {activeTab === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddExistingInsurance />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

