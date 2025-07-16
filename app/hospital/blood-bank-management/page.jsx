
"use client"
const BLOOD_TYPE_MAP = {
  "A+": "A_POSITIVE",
  "A-": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B-": "B_NEGATIVE",
  "O+": "O_POSITIVE",
  "O-": "O_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB-": "AB_NEGATIVE",
}


import { useState, useEffect } from "react"
import { Bell, Edit3, AlertTriangle, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/app/patient/credit-scheme/components/use-toast"


// Dynamic import for server actions
const getBloodBankStock = async (hospitalId) => {
  const { getBloodBankStock } = await import("@/app/actions/bloodbank")
  return getBloodBankStock(hospitalId)
}

const updateBloodStock = async ({ hospitalId, bloodType, quantity, threshold }) => {
  const { updateBloodStock } = await import("@/app/actions/bloodbank")
  return updateBloodStock({ hospitalId, bloodType, quantity, threshold })
}

const addBloodStock = async ({ hospitalId, bloodType, quantity, threshold }) => {
  const { addBloodStock } = await import("@/app/actions/bloodbank")
  return addBloodStock({ hospitalId, bloodType, quantity, threshold })
}


const notifyDonors = async ({ bloodType, hospitalId }) => {
  const { notifyDonors } = await import("@/app/actions/bloodbank")
  // Always send enum value to backend
  let enumType = bloodType
  if (BLOOD_TYPE_MAP[bloodType]) {
    enumType = BLOOD_TYPE_MAP[bloodType]
  }
  return notifyDonors({ bloodType: enumType, hospitalId })
}



export default function BloodBankPage() {
  const { toast } = useToast()
  // Use sessionStorage for hospitalId
  const hospitalId = typeof window !== "undefined" ? sessionStorage.getItem("hospitalId") : null
  const [bloodGroups, setBloodGroups] = useState([])

  const [editingGroup, setEditingGroup] = useState(null)
  const [newQuantity, setNewQuantity] = useState("")
  // For Add Stock Dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addType, setAddType] = useState("")
  const [addQuantity, setAddQuantity] = useState("")
  const [addThreshold, setAddThreshold] = useState(5)
  // Add new blood group stock
  const handleAddStock = async () => {
    if (!addType || !addQuantity) {
      toast({ title: "Error", description: "Please fill all fields." })
      return
    }
    const enumType = BLOOD_TYPE_MAP[addType]
    if (!enumType) {
      toast({ title: "Error", description: "Invalid blood group. Use A+, A-, B+, B-, O+, O-, AB+, AB-." })
      return
    }
    try {
      await addBloodStock({ hospitalId, bloodType: enumType, quantity: Number(addQuantity), threshold: Number(addThreshold) })
      // Refetch from backend to avoid duplicates and ensure correct state
      const stocks = await getBloodBankStock(hospitalId)
      setBloodGroups(
        stocks.map((s) => ({
          type: s.bloodType,
          quantity: s.quantity,
          threshold: s.threshold ?? 5,
        }))
      )
      toast({ title: "Stock Added", description: `${addType} stock added.` })
      setAddDialogOpen(false)
      setAddType("")
      setAddQuantity("")
      setAddThreshold(5)
    } catch (e) {
      toast({ title: "Error", description: e?.message || "Failed to add stock." })
    }
  }

  const handleNotifyDonors = async (bloodType) => {
    try {
      const result = await notifyDonors({ bloodType, hospitalId })
      if (result?.request) {
        toast({
          title: "Blood Request Created",
          description: `Request for ${bloodType} at this hospital is now visible to all users. Notified ${result.notified} patients.`,
        })
      } else {
        toast({ title: "Error", description: "Failed to create blood request." })
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to notify donors." })
    }
  }

  const handleUpdateStock = async (bloodType, quantity) => {
    // Map display type to enum
    const enumType = BLOOD_TYPE_MAP[bloodType] || bloodType
    try {
      await updateBloodStock({ hospitalId, bloodType: enumType, quantity })
      setBloodGroups((prev) => prev.map((group) => (group.type === bloodType ? { ...group, quantity } : group)))
      toast({
        title: "Stock Updated",
        description: `${bloodType} stock updated to ${quantity} units.`,
      })
      setEditingGroup(null)
      setNewQuantity("")
    } catch (e) {
      toast({ title: "Error", description: "Failed to update stock." })
    }
  }
  // Fetch blood bank stock on mount
  useEffect(() => {
    async function fetchStock() {
      try {
        const stocks = await getBloodBankStock(hospitalId)
        // Map backend bloodType to UI type
        // Map enum to display for UI
        setBloodGroups(
          stocks.map((s) => {
            const displayType = Object.entries(BLOOD_TYPE_MAP).find(([, v]) => v === s.bloodType)?.[0] || s.bloodType
            return {
              type: displayType,
              quantity: s.quantity,
              threshold: s.threshold ?? 5,
            }
          })
        )
      } catch (e) {
        // fallback: show nothing or static
        setBloodGroups([])
      }
    }
    fetchStock()
    // eslint-disable-next-line
  }, [hospitalId])

  const openEditDialog = (group) => {
    setEditingGroup(group)
    setNewQuantity(group.quantity.toString())
  }

  const lowStockCount = bloodGroups.filter((group) => group.quantity < group.threshold).length

  return (
    <div className="min-h-screen bg-white to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Blood Bank Management</h1>
              <p className="text-blue-600">Monitor and manage blood inventory levels</p>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAddDialogOpen(true)}>
                + Add Stock
              </Button>
              {lowStockCount > 0 && (
                <Badge variant="destructive" className="px-3 py-1">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {lowStockCount} Low Stock Alert{lowStockCount > 1 ? "s" : ""}
                </Badge>
              )}
              <div className="text-right">
                <p className="text-sm text-blue-600">Total Units</p>
                <p className="text-2xl font-bold text-blue-900">
                  {bloodGroups.reduce((sum, group) => sum + group.quantity, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-900 mb-1">
                {bloodGroups.filter((g) => g.quantity >= g.threshold).length}
              </div>
              <div className="text-sm text-blue-600">Groups Well Stocked</div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-700 mb-1">{lowStockCount}</div>
              <div className="text-sm text-red-600">Groups Need Attention</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-900 mb-1">
                {bloodGroups.reduce((sum, group) => sum + group.quantity, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Units Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Stock Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-blue-900">Add Blood Group Stock</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-type" className="text-blue-700">Blood Group</Label>
                <Input
                  id="add-type"
                  placeholder="e.g. A+, O-, AB+"
                  value={addType}
                  onChange={e => setAddType(e.target.value.toUpperCase())}
                  className="mt-2"
                  maxLength={4}
                />
              </div>
              <div>
                <Label htmlFor="add-quantity" className="text-blue-700">Quantity</Label>
                <Input
                  id="add-quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={addQuantity}
                  onChange={e => setAddQuantity(e.target.value)}
                  className="mt-2"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="add-threshold" className="text-blue-700">Threshold</Label>
                <Input
                  id="add-threshold"
                  type="number"
                  placeholder="Enter threshold"
                  value={addThreshold}
                  onChange={e => setAddThreshold(e.target.value)}
                  className="mt-2"
                  min="0"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddStock}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!addType || !addQuantity || Number(addQuantity) < 0}
                >
                  Add Stock
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cards: Groups Need Attention (Low Stock) */}
        <div className="mb-8">
          {bloodGroups.filter((group) => group.quantity < group.threshold).length > 0 && (
            <>
              <h2 className="text-xl font-bold text-red-700 mb-2">Groups Need Attention</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {bloodGroups.filter((group) => group.quantity < group.threshold).map((group) => (
                  <Card
                    key={group.type}
                    className="relative border-red-500 bg-red-50 shadow-red-100 transition-all duration-200 hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-red-100">
                            <Droplets className="w-5 h-5 text-red-600" />
                          </div>
                          <h3 className="text-xl font-bold text-red-900">{group.type}</h3>
                        </div>
                        <Badge variant="destructive" className="text-xs">LOW</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-700">{group.quantity}</p>
                        <p className="text-sm text-gray-600">Units Available</p>
                      </div>
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleNotifyDonors(group.type)}
                          className="w-full bg-red-600 hover:bg-red-700"
                          size="sm"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Notify Donors
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                              size="sm"
                              onClick={() => openEditDialog(group)}
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Update Stock
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-blue-900">Update {editingGroup?.type} Stock</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="quantity" className="text-blue-700">
                                  Current Quantity: {editingGroup?.quantity} units
                                </Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  placeholder="Enter new quantity"
                                  value={newQuantity}
                                  onChange={(e) => setNewQuantity(e.target.value)}
                                  className="mt-2"
                                  min="0"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => {
                                    if (editingGroup && newQuantity) {
                                      handleUpdateStock(editingGroup.type, Number.parseInt(newQuantity))
                                    }
                                  }}
                                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                                  disabled={!newQuantity || Number.parseInt(newQuantity) < 0}
                                >
                                  Update Stock
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setEditingGroup(null)
                                    setNewQuantity("")
                                  }}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Cards: All Other Blood Groups (Well Stocked) */}
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-2">All Blood Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodGroups.filter((group) => group.quantity >= group.threshold).map((group) => (
              <Card
                key={group.type}
                className="relative border-blue-200 bg-white hover:border-blue-300 transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900">{group.type}</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-700">{group.quantity}</p>
                    <p className="text-sm text-gray-600">Units Available</p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleNotifyDonors(group.type)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notify Donors
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                          size="sm"
                          onClick={() => openEditDialog(group)}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Update Stock
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-blue-900">Update {editingGroup?.type} Stock</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="quantity" className="text-blue-700">
                              Current Quantity: {editingGroup?.quantity} units
                            </Label>
                            <Input
                              id="quantity"
                              type="number"
                              placeholder="Enter new quantity"
                              value={newQuantity}
                              onChange={(e) => setNewQuantity(e.target.value)}
                              className="mt-2"
                              min="0"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                if (editingGroup && newQuantity) {
                                  handleUpdateStock(editingGroup.type, Number.parseInt(newQuantity))
                                }
                              }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              disabled={!newQuantity || Number.parseInt(newQuantity) < 0}
                            >
                              Update Stock
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingGroup(null)
                                setNewQuantity("")
                              }}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
       
      </div>
    </div>
  )
}
