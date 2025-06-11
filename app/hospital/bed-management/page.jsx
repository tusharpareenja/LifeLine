"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Moon, Sun, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { addBed, getBeds, updateBed } from "@/app/actions/beds"

import { NavigationBar } from "./components/navigation-bar"
import { StatsCards } from "./components/statuscard"
import { SearchFilters } from "./components/searchfilter"
import { BedCard } from "./components/bed-card"
import { VentilatorCard } from "./components/ventilatorcard"
import { ManagementModal } from "./components/managementModal"
import { Pagination } from "./components/pagination"
import { generateMockBeds, generateVentilators } from "./utils/datagenerator"
import { navigationItems } from "./utils/constants"
import { AddBedModal } from "./components/add-bed-modal"

export default function BedManagement() {
  const [beds, setBeds] = useState([])
  const [ventilators, setVentilators] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 12
  const [isAddBedModalOpen, setIsAddBedModalOpen] = useState(false)

  // Fetch beds from backend on mount
  useEffect(() => {
    async function fetchBeds() {
      setIsLoading(true)
      const hospitalId = typeof window !== "undefined" ? sessionStorage.getItem("hospitalId") : null
      if (!hospitalId) {
        setBeds([])
        setIsLoading(false)
        return
      }
      const result = await getBeds(hospitalId)
      console.log("Fetched beds from backend:", result?.data) // Debug log
      if (result?.success) {
        const mappedBeds = result.data.map((bed) => ({
          ...bed,
          patient: bed.patientName || "",
          ward: bed.ward || "",
          color: bed.color || "",
        }))
        console.log("Mapped beds with status:", mappedBeds.map(bed => bed.status)) // Debug log
        setBeds(mappedBeds)
      } else {
        setBeds([])
      }
      setIsLoading(false)
    }
    fetchBeds()
  }, [])

  // Initialize data
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setVentilators(generateVentilators())
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter data based on category and search
  const filteredData = useMemo(() => {
    let data = []

    if (selectedCategory === "ventilators") {
      data = ventilators.filter((item) => {
        const matchesSearch =
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "All" || item.status === statusFilter
        return matchesSearch && matchesStatus
      })
    } else {
      data = beds.filter((bed) => {
        const matchesSearch =
          bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bed.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory === "all" || bed.type.toLowerCase() === selectedCategory
        const matchesStatus = statusFilter === "All" || bed.status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
      })
    }

    return data
  }, [beds, ventilators, searchTerm, selectedCategory, statusFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    if (selectedCategory === "ventilators") {
      const total = ventilators.length
      const available = ventilators.filter((v) => v.status === "available").length
      const inUse = ventilators.filter((v) => v.status === "in-use").length
      const maintenance = ventilators.filter((v) => v.status === "maintenance").length
      const reserved = ventilators.filter((v) => v.status === "reserved").length

      return { total, available, occupied: inUse, maintenance, reserved }
    } else {
      const relevantBeds =
        selectedCategory === "all" ? beds : beds.filter((bed) => bed.type.toLowerCase() === selectedCategory)

      const total = relevantBeds.length
      const available = relevantBeds.filter((bed) => bed.status === "AVAILABLE").length
      const occupied = relevantBeds.filter((bed) => bed.status === "OCCUPIED").length
      const maintenance = relevantBeds.filter((bed) => bed.status === "MAINTENANCE").length
      const reserved = relevantBeds.filter((bed) => bed.status === "RESERVED").length

      return { total, available, occupied, maintenance, reserved }
    }
  }, [beds, ventilators, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, statusFilter])

  // Update bed handler (for ManagementModal)
  const handleItemUpdate = async (itemId, updates) => {
    if (selectedCategory === "ventilators") {
      setVentilators((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)))
    } else {
      // Map status to match BedStatus enum
      const statusMapping = {
        available: "AVAILABLE",
        occupied: "OCCUPIED",
        reserved: "RESERVED",
        maintenance: "MAINTENANCE",
      }

      const updatePayload = {
        status: statusMapping[updates.status],
        room: updates.room,
        type: updates.type,
        patient: updates.patient || "",  // This will be saved as patientName in the database
      }

      await updateBed(itemId, updatePayload)

      // Refresh beds after update
      const hospitalId = typeof window !== "undefined" ? sessionStorage.getItem("hospitalId") : null
      if (hospitalId) {
        const result = await getBeds(hospitalId)
        if (result?.success) {
          setBeds(
            result.data.map((bed) => ({
              ...bed,
              patient: bed.patientName || "",     // Use patientName from the database
              ward: bed.ward || "",
              color: bed.color || "",
            }))
          )
        }
      }
    }
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setStatusFilter("All")
    setSearchTerm("")
  }

  // Replace the old handleAddBed with a version that calls the backend and does not add 'ward'
  const handleAddBed = async (newBedData) => {
    // Call backend action to add bed to the database
    const result = await addBed(newBedData)
    // Optionally, refresh beds from backend here if you want to show the new bed in the UI
    return result
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium">Loading hospital data...</p>
          <p className="text-sm text-muted-foreground">Initializing</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark bg-gray-900" : "bg-gray-50")}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {navigationItems.find((item) => item.id === selectedCategory)?.label || "Bed Management"}
            </h1>
            <p className="text-muted-foreground">
              {selectedCategory === "ventilators"
                ? "Monitor and manage ventilator equipment"
                : "Monitor and manage hospital bed availability"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {selectedCategory !== "ventilators" && (
              <Button onClick={() => setIsAddBedModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Bed
              </Button>
            )}

            <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Navigation Bar */}
        <NavigationBar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} stats={stats} />

        {/* Statistics Cards */}
        <StatsCards stats={stats} selectedCategory={selectedCategory} />

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          selectedCategory={selectedCategory}
          filteredCount={paginatedData.length}
          totalCount={filteredData.length}
        />

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((item) =>
            selectedCategory === "ventilators" ? (
              <VentilatorCard
                key={item.id}
                ventilator={item}
                onClick={() => {
                  setSelectedItem(item)
                  setIsModalOpen(true)
                }}
              />
            ) : (
              <BedCard
                key={item.id}
                bed={item}
                onClick={() => {
                  setSelectedItem(item)
                  setIsModalOpen(true)
                }}
              />
            ),
          )}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {/* Management Modal */}
        <ManagementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedItem={selectedItem}
          onItemChange={setSelectedItem}
          onUpdate={() => handleItemUpdate(selectedItem.id, selectedItem)}
          selectedCategory={selectedCategory}
        />

        {/* Add Bed Modal */}
        <AddBedModal isOpen={isAddBedModalOpen} onClose={() => setIsAddBedModalOpen(false)} onAddBed={handleAddBed} />
      </div>
    </div>
  )
}
