"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function SearchFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedCategory,
  filteredCount,
  totalCount,
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${selectedCategory === "ventilators" ? "ventilators" : "beds"}...`}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value={selectedCategory === "ventilators" ? "in-use" : "occupied"}>
                {selectedCategory === "ventilators" ? "In Use" : "Occupied"}
              </SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} {selectedCategory === "ventilators" ? "ventilators" : "beds"}
        </div>
      </CardContent>
    </Card>
  )
}
