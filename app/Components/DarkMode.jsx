"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Check for localStorage and window object in useEffect to prevent SSR errors
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      // Check localStorage first, then fallback to system preference
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Default to system preference
        setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      }
    }
  }, []);

  // Update theme on mount and whenever theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      // Save to localStorage
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed right-4 top-4 flex items-center justify-center p-2 bg-transparent border rounded-full z-10"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500 transition-transform duration-300" />
      ) : (
        <Moon className="h-[1.5rem] w-[1.5rem] text-gray-800 transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DarkModeToggle;
