"use client";

import { useState, useEffect } from "react";
import { Shield, Upload } from "lucide-react";
import { GetInsurance } from "./components/get-insurance";
import { AddExistingInsurance } from "./components/add-existing-user";

export default function Home() {
  const [activeTab, setActiveTab] = useState("get");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 -mb-px">
            <button
              onClick={() => setActiveTab("get")}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === "get"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <Shield className="h-4 w-4" />
              Get Insurance
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === "add"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              <Upload className="h-4 w-4" />
              Add Existing Insurance
            </button>
          </div>
        </div>
      </div>

      {activeTab === "get" ? <GetInsurance /> : <AddExistingInsurance />}
    </div>
  );
}
