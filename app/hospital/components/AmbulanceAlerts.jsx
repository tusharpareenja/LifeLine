"use client";
import { useSocket } from "../../lib/socket";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AmbulanceAlerts() {
  const socket = useSocket("hospital");
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!socket) return;
    const handler = (data) => {
      setRequests((prev) => [...prev, data]);
    };
    socket.on("AMBULANCE_ALERT", handler);
    return () => socket.off("AMBULANCE_ALERT", handler);
  }, [socket]);

  const sendAmbulance = (patientId) => {
    if (socket && session?.user?.id && patientId) {
      socket.emit("SEND_AMBULANCE", {
        hospitalId: session.user.id,
        patientId,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <div>
      <h2>Ambulance Requests</h2>
      {requests.map((req, idx) => (
        <div key={idx} style={{marginBottom: 8}}>
          <span>Patient: {req.patientId}</span>
          <button onClick={() => sendAmbulance(req.patientId)} style={{marginLeft: 8}}>Send Ambulance</button>
        </div>
      ))}
    </div>
  );
} 