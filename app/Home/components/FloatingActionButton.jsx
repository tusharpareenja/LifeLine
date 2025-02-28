"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import React from "react"


export default function FloatingActionButton({ icon, onClick }) {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        onClick={onClick}
      >
        {icon}
      </Button>
    </motion.div>
  )
}

