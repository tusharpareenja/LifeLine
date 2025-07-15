"use client"

import { getSocket } from "@/lib/socket";
import Sidebar from "../Components/Sidebar"
import { usePathname } from "next/navigation"
import { useEffect } from "react";

const Layout = ({ children }) => {
  const pathname = usePathname()

  const hiddenSidebarPaths = ["/login", "/register", "/admin/login", "/patient/login", "/doctor/login"]

  const socket = getSocket("patient");

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => console.log(data);
    const handleAlert = (data) => console.log(data);

    socket.on("message", handleMessage);
    socket.on("AMBULANCE_ALERT", handleAlert);

    return () => {
      socket.off("message", handleMessage);
      socket.off("AMBULANCE_ALERT", handleAlert);
    };
  }, [socket]);
  
  return (
    <div className="flex h-screen">
      {!hiddenSidebarPaths.includes(pathname) && <Sidebar />}
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
