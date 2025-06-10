"use client"

import { useState, useMemo, useEffect } from "react"
import { DoctorManagementHeader } from "./components/Header"
import { StatusSummary } from "./components/statussummary"
import { SearchFilters } from "./components/searchFilter"
import { DoctorCard } from "./components/doctorCard"
import { DoctorTable } from "./components/doctorTable"
import { AddDoctorModal } from "./components/addDoctor,odal"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { getDoctors } from "@/app/actions/doctors"

// Mock data
const initialNurses = [
  {
    id: "n1",
    name: "Nurse Jennifer Adams",
    email: "jennifer.adams@hospital.com",
    phone: "+1 (555) 111-2222",
    specialty: "ICU",
    status: "On Duty",
    currentPatients: 8,
    profileImage: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "n2",
    name: "Nurse Robert Martinez",
    email: "robert.martinez@hospital.com",
    phone: "+1 (555) 222-3333",
    specialty: "Emergency",
    status: "Available",
    currentPatients: 4,
    profileImage: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "n3",
    name: "Nurse Maria Garcia",
    email: "maria.garcia@hospital.com",
    phone: "+1 (555) 333-4444",
    specialty: "Pediatrics",
    status: "With Patient",
    currentPatients: 6,
    profileImage: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "n4",
    name: "Nurse John Smith",
    email: "john.smith@hospital.com",
    phone: "+1 (555) 444-5555",
    specialty: "Surgery",
    status: "In OT",
    currentPatients: 2,
    profileImage: "/placeholder.svg?height=64&width=64",
  },
]

export default function DoctorManagement() {
  const [activeTab, setActiveTab] = useState("doctors")
  const [viewMode, setViewMode] = useState("cards")
  const [doctors, setDoctors] = useState([])
  const [nurses, setNurses] = useState(initialNurses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [doctorCount, setDoctorCount] = useState(0)

  useEffect(() => {
    // Fetch doctors for the logged-in hospital
    const hospitalId = typeof window !== 'undefined' ? sessionStorage.getItem("hospitalId") : null
    if (hospitalId) {
      getDoctors(hospitalId).then(res => {
        if (res.success && Array.isArray(res.data)) {
          setDoctors(res.data.map(doc => ({
            id: doc.id,
            name: doc.user?.name || "",
            email: doc.user?.email || "",
            phone: doc.phone || "",
            specialty: doc.specialization || "",
            status: doc.availability ? "On Duty" : "Off Duty",
            currentPatients: 0, // Not implemented
            profileImage: "/placeholder.svg?height=64&width=64"
          })))
          setDoctorCount(res.data.length)
        } else {
          setDoctors([])
          setDoctorCount(0)
        }
      })
    }
  }, [])

  const currentData = activeTab === "doctors" ? doctors : nurses

  // Calculate metrics
  const metrics = useMemo(() => {
    if (activeTab === "doctors") {
      return {
        total: doctorCount,
        onDuty: 0,
        inOT: 0,
        withPatients: 0,
      }
    }
    const data = currentData
    return {
      total: data.length,
      onDuty: data.filter((d) => d.status === "On Duty").length,
      inOT: data.filter((d) => d.status === "In OT").length,
      withPatients: data.filter((d) => d.status === "With Patient").length,
    }
  }, [currentData, activeTab, doctorCount])

  // Filter data
  const filteredData = useMemo(() => {
    return currentData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        selectedSpecialty === "All Departments" ||
        item.specialty === selectedSpecialty
      const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus

      return matchesSearch && matchesSpecialty && matchesStatus
    })
  }, [currentData, searchQuery, selectedSpecialty, selectedStatus])

  const handleAddDoctor = (doctorData) => {
    if (activeTab === "doctors") {
      setDoctors([...doctors, doctorData])
    } else {
      setNurses([...nurses, doctorData])
    }
  }

  const handleViewProfile = (id) => {
    console.log("View profile:", id)
  }

  const handleEditDetails = (id) => {
    console.log("Edit details:", id)
  }

  const handleToggleDuty = (id) => {
    if (activeTab === "doctors") {
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === id
            ? {
                ...doctor,
                status: doctor.status === "Off Duty" ? "On Duty" : "Off Duty",
                currentPatients: doctor.status === "Off Duty" ? doctor.currentPatients : 0,
              }
            : doctor,
        ),
      )
    } else {
      setNurses(
        nurses.map((nurse) =>
          nurse.id === id
            ? {
                ...nurse,
                status: nurse.status === "Off Duty" ? "On Duty" : "Off Duty",
                currentPatients: nurse.status === "Off Duty" ? nurse.currentPatients : 0,
              }
            : nurse,
        ),
      )
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-white dark:bg-gray-800 shadow-lg"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Header */}
        <DoctorManagementHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Status Summary */}
          <StatusSummary type={activeTab} metrics={metrics} />

          {/* Search and Filters */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onAddClick={() => setIsAddModalOpen(true)}
            type={activeTab}
          />

          {/* Content - Cards or Table View */}
          {viewMode === "cards" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredData.map((item) => (
                <DoctorCard
                  key={item.id}
                  doctor={item}
                  onViewProfile={handleViewProfile}
                  onEditDetails={handleEditDetails}
                  onToggleDuty={handleToggleDuty}
                />
              ))}
            </div>
          ) : (
            <DoctorTable
              data={filteredData}
              onViewProfile={handleViewProfile}
              onEditDetails={handleEditDetails}
              onToggleDuty={handleToggleDuty}
            />
          )}

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No {activeTab} found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Add Doctor/Nurse Modal */}
        <AddDoctorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddDoctor}
          type={activeTab}
        />
      </div>
    </div>
  )
}
