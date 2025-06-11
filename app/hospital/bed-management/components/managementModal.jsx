"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function ManagementModal({
  isOpen,
  onClose,
  selectedItem,
  onItemChange,
  onUpdate,
  selectedCategory,
}) {
  if (!selectedItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Manage {selectedCategory === "ventilators" ? "Ventilator" : "Bed"} {selectedItem.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {selectedCategory === "ventilators" ? (
            <>
              <div>
                <Label>Model</Label>
                <Input value={selectedItem.model} readOnly />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={selectedItem.location} readOnly />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={selectedItem.status}
                  onValueChange={(value) => onItemChange({ ...selectedItem, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in-use">In Use</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assigned Bed</Label>
                <Input
                  value={selectedItem.assignedBed || ""}
                  onChange={(e) => onItemChange({ ...selectedItem, assignedBed: e.target.value || null })}
                  placeholder="Enter bed ID"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ward</Label>
                  <Input value={selectedItem.ward} readOnly />
                </div>
                <div>
                  <Label>Room</Label>
                  <Input value={selectedItem.room} readOnly />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={selectedItem.status}
                  onValueChange={(value) => onItemChange({ ...selectedItem, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Patient Name</Label>
                <Input
                  value={selectedItem.patient || ""}
                  onChange={(e) => onItemChange({ ...selectedItem, patient: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={onUpdate} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Update {selectedCategory === "ventilators" ? "Ventilator" : "Bed"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
