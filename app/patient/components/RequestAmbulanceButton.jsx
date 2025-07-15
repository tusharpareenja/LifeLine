"use client";
import { getSocket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function RequestAmbulanceButton({ hospitalId }) {
  const socket = getSocket("patient");
  const { data: session } = useSession();

  const handleRequest = () => {
    if (socket && session?.user?.id && hospitalId) {
      socket.emit("AMBULANCE_REQUEST", {
        patientId: session.user.id,
        hospitalId,
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    if (!socket) return;
    const handler = (data) => {
      alert("Ambulance is on the way!");
    };
    socket.on("SEND_AMBULANCE", handler);
    return () => socket.off("SEND_AMBULANCE", handler);
  }, [socket]);

  return <button onClick={handleRequest}>Request Ambulance</button>;
} 