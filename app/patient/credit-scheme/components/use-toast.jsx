"use client"

// Simplified toast implementation
import { createContext, useContext } from "react"

const ToastContext = createContext({
  toast: ({ title, description, variant }) => {},
})

export const useToast = () => {
  return useContext(ToastContext)
}

export const toast = ({ title, description, variant }) => {
  console.log({ title, description, variant })
}

