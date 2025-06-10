"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "./statusBadge"
import { Eye, Edit, UserX, Phone, Mail, Users, UserCheck } from "lucide-react"

export function DoctorCard({ doctor, onViewProfile, onEditDetails, onToggleDuty }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-4 flex-1">
            <Avatar className="h-16 w-16 ring-2 ring-blue-100 dark:ring-blue-900">
              <AvatarImage src={doctor.profileImage || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 font-semibold">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{doctor.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{doctor.specialty}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{doctor.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Metrics */}
          <div className="flex flex-col items-start sm:items-end space-y-3">
            <StatusBadge status={doctor.status} />

            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{doctor.currentPatients} patients</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(doctor.id)}
            className="flex-1 group-hover:border-blue-300 transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditDetails(doctor.id)}
            className="flex-1 group-hover:border-blue-300 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleDuty(doctor.id)}
            className={`flex-1 transition-colors ${
              doctor.status === "Off Duty"
                ? "text-red-600 hover:text-red-700 hover:border-red-300 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                : "text-green-600 hover:text-green-700 hover:border-green-300 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
            }`}
          >
            {doctor.status === "Off Duty" ? (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Set On Duty
              </>
            ) : (
              <>
                <UserX className="h-4 w-4 mr-2" />
                Set Off Duty
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
