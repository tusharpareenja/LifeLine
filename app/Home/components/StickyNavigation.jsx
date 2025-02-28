"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronUp } from "lucide-react"

const navItems = ["Features", "Testimonials", "Security", "Download"]

export default function StickyNavigation() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase())
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.nav
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`w-3 h-3 rounded-full block transition-all duration-300 ${
                activeSection === item.toLowerCase() ? "bg-blue-600 scale-150" : "bg-gray-400 hover:bg-blue-400"
              }`}
            >
              <span className="sr-only">{item}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
          >
            <ChevronUp size={20} />
            <span className="sr-only">Scroll to top</span>
          </button>
        </li>
      </ul>
    </motion.nav>
  )
}

