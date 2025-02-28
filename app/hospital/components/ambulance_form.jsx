"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function AmbulanceForm() {
  const [equipmentChecklist, setEquipmentChecklist] = React.useState({
    oxygen: false,
    defibrillator: false,
    stretcher: false,
  })

  const handleChecklistChange = (item) => {
    setEquipmentChecklist((prev) => ({ ...prev, [item]: !prev[item] }))
  }

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="regNo">Registration Number</Label>
          <Input id="regNo" placeholder="Enter registration number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="driver">Driver Name</Label>
          <Input id="driver" placeholder="Enter driver name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Ambulance Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bls">Basic Life Support</SelectItem>
              <SelectItem value="als">Advanced Life Support</SelectItem>
              <SelectItem value="icu">ICU-equipped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="on-duty">On Duty</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Equipment Checklist</Label>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="oxygen"
              checked={equipmentChecklist.oxygen}
              onCheckedChange={() => handleChecklistChange("oxygen")}
            />
            <Label htmlFor="oxygen">Oxygen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="defibrillator"
              checked={equipmentChecklist.defibrillator}
              onCheckedChange={() => handleChecklistChange("defibrillator")}
            />
            <Label htmlFor="defibrillator">Defibrillator</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="stretcher"
              checked={equipmentChecklist.stretcher}
              onCheckedChange={() => handleChecklistChange("stretcher")}
            />
            <Label htmlFor="stretcher">Stretcher</Label>
          </div>
        </div>
      </div>
      <Button type="submit">Save Ambulance Details</Button>
    </form>
  )
}

