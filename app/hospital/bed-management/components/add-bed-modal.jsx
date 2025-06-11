"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"


export function AddBedModal({ isOpen, onClose, onAddBed }) {
  const [formData, setFormData] = useState({
    id: "",
    room: "",
    type: "",
  })

  const [errors, setErrors] = useState({})

  // Use enum values for BedType
  const bedTypes = [
    { value: "ICU", label: "ICU" },
    { value: "GENERAL", label: "General" },
    { value: "EMERGENCY", label: "Emergency" },
    { value: "PEDIATRIC", label: "Pediatric" },
    { value: "CARDIAC", label: "Cardiac" },
    { value: "SURGICAL", label: "Surgical" },
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.id.trim()) {
      newErrors.id = "Bed ID is required"
    }
    if (!formData.room.trim()) {
      newErrors.room = "Room number is required"
    }
    if (!formData.type) {
      newErrors.type = "Bed type is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Prepare data for backend
    const hospitalId = typeof window !== 'undefined' ? sessionStorage.getItem("hospitalId") : null;
    const newBed = {
      id: formData.id,
      room: formData.room,
      type: formData.type,
      status: "AVAILABLE",
      hospitalId,
    }

    // Call backend action
    console.log("Submitting new bed to backend:", newBed)
    const result = await onAddBed(newBed)
    console.log("Backend addBed result:", result)
    if (result?.success) {
      // Reset form
      setFormData({
        id: "",
        room: "",
        type: "",
      })
      setErrors({})
      onClose()
    } else {
      setErrors({ form: result?.error || "Failed to add bed" })
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Add New Bed
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="id">Bed ID *</Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              placeholder="e.g., B001"
              className={errors.id ? "border-red-500" : ""}
            />
            {errors.id && <p className="text-sm text-red-500 mt-1">{errors.id}</p>}
          </div>

          <div>
            <Label htmlFor="room">Room Number *</Label>
            <Input
              id="room"
              value={formData.room}
              onChange={(e) => handleInputChange("room", e.target.value)}
              placeholder="e.g., 101"
              className={errors.room ? "border-red-500" : ""}
            />
            {errors.room && <p className="text-sm text-red-500 mt-1">{errors.room}</p>}
          </div>

          <div>
            <Label htmlFor="type">Bed Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="Select bed type" />
              </SelectTrigger>
              <SelectContent>
                {bedTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
          </div>

          {errors.form && <p className="text-sm text-red-500 mt-1">{errors.form}</p>}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Bed
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
