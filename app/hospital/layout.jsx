"use client"

import Sidebar from "./components/Sidebar"
import { usePathname } from "next/navigation"
import { getSocket } from "@/lib/socket"
import { useEffect } from "react";
import { toast } from "sonner";
import { getPatientById } from "../actions/hospitals";

const Layout = ({ children }) => {
  const pathname = usePathname()

  // Define an array of paths where Sidebar should be hidden
  const hiddenSidebarPaths = ["/login", "/register", "/admin/login", "/patient/login", "/doctor/login" , "/admin/register", "/patient/register", "/doctor/register"]

  const socket = getSocket("hospital");

  useEffect(() => {
    if (!socket) return;
    const handler = async (data) => {
      const timeout = setTimeout(() => {
        toast.dismiss();
        // shareMedicalDetails(data.patientId);
        // callAmbulance(data.patientId);
      });
      console.log(data);
      const res = await getPatientById(data.patientId);
      console.log(res);
      toast(`Ambulance request received for ${res.data.name} with blood group ${res.data.bloodType}`, {
        action: {
          label: 'Cancel',
          onClick: () => {
            clearTimeout(timeout);
            toast.dismiss();
          }
        },
      })
      console.log(data);
    };
    socket.on("AMBULANCE_ALERT", handler);
    return () => socket.off("AMBULANCE_ALERT", handler);
  }, [socket]);

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
