"use client"

import Sidebar from "../Components/Sidebar"
import { usePathname } from "next/navigation"

const Layout = ({ children }) => {
  const pathname = usePathname()

  // Define an array of paths where Sidebar should be hidden
  const hiddenSidebarPaths = ["/login", "/register", "/admin/login", "/patient/login", "/doctor/login"]

  return (
    <div className="flex h-screen">
      {/* Render Sidebar only if the current pathname is NOT in the hiddenSidebarPaths */}
      {!hiddenSidebarPaths.includes(pathname) && <Sidebar />}

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
