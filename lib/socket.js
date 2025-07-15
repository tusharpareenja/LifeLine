"use client"
import { io } from "socket.io-client";

let socket = null;

export function getSocket(role) {
  if (socket) {
    console.log("✅ Using existing socket:", socket.id);
    return socket;
  }

  const id =
    typeof window !== "undefined" &&
    (sessionStorage.getItem("patientId") || sessionStorage.getItem("doctorId"));

  if (id && role) {
    socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
      { query: { userId: id, role } }
    );

    socket.on("connect", () => {
      console.log("✅ New socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  }

  return socket;
}
