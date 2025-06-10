"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "./statusBadge"
import { Eye, Edit, Phone, Mail, Users } from "lucide-react"


export function DoctorTable({ data, onViewProfile, onEditDetails, onToggleDuty }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-[300px]">Staff Member</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Department/Specialty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Current Patients</TableHead>
              <TableHead className="text-center">Duty Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((person) => (
              <TableRow key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {/* Staff Member */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-blue-100 dark:ring-blue-900">
                      <AvatarImage src={person.profileImage || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 font-semibold text-sm">
                        {getInitials(person.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{person.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">ID: {person.id}</div>
                    </div>
                  </div>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-3 w-3 mr-2" />
                      <span className="truncate max-w-[200px]">{person.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-3 w-3 mr-2" />
                      <span>{person.phone}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Department/Specialty */}
                <TableCell>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{person.specialty}</span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={person.status} />
                </TableCell>

                {/* Current Patients */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{person.currentPatients}</span>
                  </div>
                </TableCell>

                {/* Duty Status Toggle */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleDuty(person.id)}
                      className={`${
                        person.status === "Off Duty"
                          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
                      } transition-colors duration-200`}
                    >
                      {person.status === "Off Duty" ? "Set On Duty" : "Set Off Duty"}
                    </Button>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(person.id)}
                      className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditDetails(person.id)}
                      className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No staff members found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
