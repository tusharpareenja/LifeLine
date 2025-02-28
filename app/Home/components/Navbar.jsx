"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function Navbar({ scrollProgress }) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">LifeLine</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Testimonials</Button>
          <Button variant="ghost">Security</Button>
          <Button variant="ghost">Download</Button>
        </div>
        <div className="flex space-x-2 mr-10">
          <Link href="/login/role">
            <Button variant="outline">Start Here</Button>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }} />
    </nav>
  )
}
