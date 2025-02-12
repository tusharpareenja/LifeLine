"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const y2 = useTransform(scrollY, [0, 1000], [0, -300])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0 bg-blue-200 dark:bg-blue-800 opacity-20" style={{ y: y1 }} />
      <motion.div className="absolute inset-0 bg-green-200 dark:bg-green-800 opacity-20" style={{ y: y2 }} />
    </div>
  )
}

