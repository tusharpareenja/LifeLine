"use client"

import Sidebar from "../Components/Sidebar"
import { usePathname } from "next/navigation"
import { useEffect } from "react";
import { useSocket } from "../lib/socket";

const Layout = ({ children }) => {
  const pathname = usePathname()

  const hiddenSidebarPaths = ["/login", "/register", "/admin/login", "/patient/login", "/doctor/login"]

  const socket = useSocket("patient");

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected to socket")
    });
    socket.on("disconnect", () => {
      console.log("disconnected from socket")
    });
    socket.on("message", (data) => {
      console.log(data)
    });
    socket.on("AMBULANCE_ALERT", (data) => {
      console.log(data)
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("AMBULANCE_ALERT");
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
