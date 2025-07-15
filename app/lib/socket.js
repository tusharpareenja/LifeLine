"use client"
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useSocket(role) {
  const socketRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function connectSocket() {
    const id = sessionStorage.getItem("patientId") || sessionStorage.getItem("doctorId");
    if (isMounted && id && role) {
        socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080", {
        query: { userId: id, role },
        });
        setIsReady(true);
    }
    }
    connectSocket();
    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [role]);

  return isReady ? socketRef.current : null;
} 