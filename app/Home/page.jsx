"use client"

import { useState, useEffect, useMemo } from "react"
import { Sun, Moon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Hero"
import FeaturesSection from "./components/FeatureSection"
import TestimonialsSection from "./components/Testimonial"
import SecuritySection from "./components/SecuritySection"
import DownloadSection from "./components/DownloadSection"
import Footer from "./components/Footer"
import FloatingActionButton from "./components/FloatingActionButton"
import StickyNavigation from "./components/StickyNavigation"

const ParallaxBackground = dynamic(() => import("./components/ParallaxBackground"), { ssr: false })

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress((currentScroll / totalScroll) * 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const memoizedSections = useMemo(
    () => (
      <>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <SecuritySection />
        <DownloadSection />
      </>
    ),
    [],
  )

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 text-indigo-900 dark:text-indigo-50 transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <ParallaxBackground />
      <Navbar scrollProgress={scrollProgress} />
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
      <main className="relative overflow-hidden">{memoizedSections}</main>
      <Footer />
      <FloatingActionButton icon={<Plus />} onClick={() => console.log("FAB clicked")} />
      <StickyNavigation />
    </div>
  )
}

