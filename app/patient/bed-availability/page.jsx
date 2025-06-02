"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertTriangle,
  Clock,
  Filter,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Search,
  Shield,
  Stethoscope,
} from "lucide-react"
import { getNearbyHospitals } from "@/app/actions/hospitals"

export default function NearbyHospitals() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBedType, setSelectedBedType] = useState("all")
  const [selectedInsurance, setSelectedInsurance] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [nearbyHospitals, setNearbyHospitals] = useState([])

  // Fetch hospitals within 10km when user location is set
  useEffect(() => {
    if (userLocation) {
      getNearbyHospitals(userLocation.latitude, userLocation.longitude, 10).then((hospitals) => {
        setNearbyHospitals(hospitals)
      })
    }
  }, [userLocation])

  const getBedAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "bg-green-500"
    if (percentage > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getBedAvailabilityPercentage = (available, total) => {
    return (available / total) * 100
  }

  // Remove mock hospitals array and use only nearbyHospitals
  const hospitalsToShow = userLocation ? nearbyHospitals : [];
  const totalHospitals = hospitalsToShow.length;
  const emergencyHospitals = hospitalsToShow.filter((h) => h.isEmergency).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bed-type">Bed Type</Label>
        <Select value={selectedBedType} onValueChange={setSelectedBedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select bed type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bed Types</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="icu">ICU</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="insurance">Insurance Accepted</Label>
        <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
          <SelectTrigger>
            <SelectValue placeholder="Select insurance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Insurance</SelectItem>
            <SelectItem value="medicare">Medicare</SelectItem>
            <SelectItem value="aetna">Aetna</SelectItem>
            <SelectItem value="blue-cross">Blue Cross</SelectItem>
            <SelectItem value="united-health">United Health</SelectItem>
            <SelectItem value="cigna">Cigna</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="availability">Availability</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  // Get user's current location
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ latitude, longitude })
          alert(latitude + ", " + longitude + " - Location set successfully!")
        },
        (error) => {
          alert("Unable to retrieve your location. Please allow location access.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">LifeLine</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency: 911
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nearby Hospitals</h1>
          <p className="text-gray-600">Find hospitals near you with real-time bed availability</p>
        </div>

        {/* Search and Location */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hospitals by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2" onClick={handleUseMyLocation}>
              <Navigation className="h-4 w-4" />
              <span>Use My Location</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Hospitals</span>
                  <span className="font-semibold text-blue-600">{totalHospitals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Emergency Ready</span>
                  <span className="font-semibold text-green-600">{emergencyHospitals}</span>
                </div>
                <Separator />
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Emergency Alert</span>
                  </div>
                  <p className="text-xs text-red-700">High demand period. Call ahead for non-emergency visits.</p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  24/7 Hotline
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters */}
            <div className="lg:hidden mb-4">
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Hospital Cards */}
            <div className="space-y-4">
              {hospitalsToShow.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  {userLocation ? 'No hospitals found nearby.' : 'Set your location to view nearby hospitals.'}
                </div>
              ) : hospitalsToShow.map((hospital) => (
                <Card key={hospital.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Hospital Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{hospital.name}</h3>
                            {hospital.address && (
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                {hospital.address}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              {hospital.distance && !isNaN(Number(hospital.distance)) && (
                                <span className="font-medium text-blue-600">{Number(hospital.distance).toFixed(1)} km away</span>
                              )}
                              {hospital.lastUpdated && (
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {hospital.lastUpdated}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 min-w-[120px]">
                            {hospital.isEmergency && (
                              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 flex items-center mb-1">
                                <Stethoscope className="h-3 w-3 mr-1" /> Emergency
                              </Badge>
                            )}
                            <Button className="bg-blue-600 hover:bg-blue-700 w-24 mb-1 flex items-center justify-center">
                              <Phone className="h-4 w-4 mr-2" /> Call
                            </Button>
                            <Button variant="outline" className="w-24 flex items-center justify-center">
                              <Navigation className="h-4 w-4 mr-2" /> Directions
                            </Button>
                          </div>
                        </div>

                        {/* Bed Availability (backend only) */}
                        <div className="space-y-2 mb-2">
                          <h4 className="text-xs font-medium text-gray-700">Bed Availability</h4>
                          <div className="flex flex-wrap gap-4">
                            {/* General Beds */}
                            {(typeof hospital.availableBeds === 'number' && typeof hospital.totalBeds === 'number') ? (
                              <div className="flex flex-col min-w-[90px]">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">General</span>
                                  <span className={`font-medium ${hospital.availableBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>{hospital.availableBeds}/{hospital.totalBeds}</span>
                                </div>
                                <Progress value={hospital.totalBeds > 0 ? (hospital.availableBeds / hospital.totalBeds) * 100 : 0} className="h-2" />
                              </div>
                            ) : null}
                            {/* ICU Beds */}
                            {typeof hospital.icuBeds === 'number' ? (
                              <div className="flex flex-col min-w-[90px]">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">ICU</span>
                                  <span className={`font-medium ${hospital.icuBeds > 0 ? 'text-green-600' : 'text-red-600'}`}>{hospital.icuBeds}</span>
                                </div>
                                <Progress value={hospital.icuBeds} className="h-2" />
                              </div>
                            ) : null}
                            {/* Ventilators */}
                            {typeof hospital.ventilators === 'number' ? (
                              <div className="flex flex-col min-w-[90px]">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-600">Ventilators</span>
                                  <span className={`font-medium ${hospital.ventilators > 0 ? 'text-green-600' : 'text-red-600'}`}>{hospital.ventilators}</span>
                                </div>
                                <Progress value={hospital.ventilators} className="h-2" />
                              </div>
                            ) : null}
                            {/* Fallback if no bed data */}
                            {(typeof hospital.availableBeds !== 'number' && typeof hospital.icuBeds !== 'number' && typeof hospital.ventilators !== 'number') && (
                              <div className="text-xs text-gray-400">No bed data available.</div>
                            )}
                          </div>
                        </div>

                        {/* Insurance Accepted */}
                        {hospital.insurance && Array.isArray(hospital.insurance) && (
                          <div className="mb-2">
                            <h4 className="text-xs font-medium text-gray-700 mb-1">Insurance Accepted</h4>
                            <div className="flex flex-wrap gap-2">
                              {hospital.insurance.map((insurance) => (
                                <Badge key={insurance} variant="secondary" className="text-xs px-2 py-1 rounded-full">
                                  {insurance}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Ayushman Card Supported (mock, always show for now) */}
                        <div className="mb-2">
                          <h4 className="text-xs font-medium text-gray-700 mb-1">Ayushman Card Supported</h4>
                          <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border-green-200">Yes</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile Summary - Bottom */}
          <div className="lg:hidden mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Quick Summary</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalHospitals}</div>
                    <div className="text-xs text-gray-600">Total Hospitals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{emergencyHospitals}</div>
                    <div className="text-xs text-gray-600">Emergency Ready</div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  24/7 Emergency Hotline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
