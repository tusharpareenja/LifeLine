"use client"

import { Button } from "@/components/ui/button"
import { Stethoscope, Users, Grid3X3, Table } from "lucide-react"



export function DoctorManagementHeader({
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === "doctors" ? "Doctor" : "Nurse"} Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor {activeTab === "doctors" ? "medical staff" : "nursing staff"} across all departments
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("cards")}
              className={`${
                viewMode === "cards"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("table")}
              className={`${
                viewMode === "table"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Table className="h-4 w-4" />
            </Button>
          </div>

          {/* Tab Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={activeTab === "doctors" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("doctors")}
              className={`${
                activeTab === "doctors"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Doctors
            </Button>
            <Button
              variant={activeTab === "nurses" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("nurses")}
              className={`${
                activeTab === "nurses"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Nurses
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
