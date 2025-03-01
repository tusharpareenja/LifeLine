"use client"

import { useState } from "react"
import { UserCog, UserCircle, Stethoscope } from "lucide-react"
import React from "react"
import Link from "next/link"

export default function UserRolesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="p-8 transition-colors duration-200 ease-in-out bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 hover:cursor-pointer">
            {/* Use Link for direct navigation */}
            <Link href="/login/hospital">
              <RoleCard icon={<UserCog size={48} />} title="Hospital" />
            </Link>

            <Link href="/login/patient">
              <RoleCard icon={<UserCircle size={48} />} title="Patient" />
            </Link>

            <Link href="/login/doctor">
              <RoleCard icon={<Stethoscope size={48} />} title="Doctor" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleCard({ icon, title }) {
  return (
    <div className="w-48 h-48 flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer">
      <div className="text-blue-500 dark:text-blue-400 mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
    </div>
  )
}
