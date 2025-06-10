"use client"

import { Button } from "@/components/ui/button"

export function HospitalStatus() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">Hospital Status:</h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 font-medium">Normal Operations</span>
          </div>
        </div>
        <p className="text-gray-600">All systems operational. Hospital running at optimal capacity.</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="bg-gray-900 text-white hover:bg-gray-800">
          View Reports
        </Button>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">Manage Resources</Button>
      </div>
    </div>
  )
}
