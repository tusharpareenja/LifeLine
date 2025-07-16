"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  Calendar,
  CreditCard,
  Settings,
  MapPin,
  Clock,
  Droplets,
  Star,
  Gift,
  Navigation,
  Phone,
  AlertTriangle,
  CheckCircle,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "../credit-scheme/components/use-toast"
import { Separator } from "@/components/ui/separator"


export default function DonationDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("alerts")
  const [smartCreditEnabled, setSmartCreditEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [showUrgentAlert, setShowUrgentAlert] = useState(true)

  // Mock data and live blood requests
  const [urgentAlerts, setUrgentAlerts] = useState([
    {
      id: "1",
      hospitalName: "Chakshit Hospital",
      bloodGroup: "O-",
      unitsNeeded: 8,
      location: "Mohali",
      distance: "230 km",
      urgency: "critical",  
    },
  ])

  // Fetch live blood requests from backend and prepend to urgentAlerts
  useEffect(() => {
    async function fetchBloodRequests() {
      try {
        const { getActiveBloodRequests } = await import("@/app/actions/bloodbank")
        const requests = await getActiveBloodRequests()
        if (Array.isArray(requests) && requests.length > 0) {
          // Map backend fields to urgentAlerts format
          const mapped = requests.map((req) => ({
            id: req.id,
            hospitalName: req.hospital?.name || "Hospital",
            bloodGroup: req.bloodType?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-") || "",
            unitsNeeded: req.quantity,
            location: req.hospital?.address || "-",
            distance: req.hospital?.city ? req.hospital.city : "-",
            urgency: "urgent",
          }))
          setUrgentAlerts((prev) => [...mapped, ...prev])
        }
      } catch (e) {
        // ignore error, keep mock data
      }
    }
    fetchBloodRequests()
  }, [])

  const [upcomingEvents] = useState([
    {
      id: "1",
      title: "Community Blood Drive",
      type: "donation",
      location: "Central Community Center",
      date: "2024-01-15",
      time: "09:00 AM - 4:00 PM",
      bloodGroupsNeeded: ["O+", "O-", "A+"],
      creditsOffered: 50,
      registered: false,
    },
    {
      id: "2",
      title: "Medical Volunteer Training",
      type: "volunteering",
      location: "Regional Hospital",
      date: "2024-01-18",
      time: "2:00 PM - 6:00 PM",
      bloodGroupsNeeded: [],
      creditsOffered: 30,
      registered: true,
    },
    {
      id: "3",
      title: "Emergency Response Blood Camp",
      type: "donation",
      location: "University Campus",
      date: "2024-01-22",
      time: "10:00 AM - 3:00 PM",
      bloodGroupsNeeded: ["B+", "B-", "AB+", "AB-"],
      creditsOffered: 75,
      registered: false,
    },
  ])

  const [creditBalance] = useState(245)
  const [creditTransactions] = useState([
    {
      id: "1",
      type: "earned",
      description: "Blood donation at City Hospital",
      amount: 50,
      date: "2024-01-05",
    },
    {
      id: "2",
      type: "earned",
      description: "Volunteering at health camp",
      amount: 30,
      date: "2024-01-02",
    },
    {
      id: "3",
      type: "redeemed",
      description: "Health checkup discount",
      amount: -25,
      date: "2023-12-28",
    },
  ])

  const handleDonateNow = (alert) => {
    toast({
      title: "Donation Interest Registered",
      description: `We'll connect you with ${alert.hospitalName} for ${alert.bloodGroup} donation.`,
    })
  }

  const handleRegisterEvent = (eventId) => {
    toast({
      title: "Successfully Registered",
      description: "You'll receive a reminder 24 hours before the event.",
    })
  }

  const handleSetReminder = (eventId) => {
    toast({
      title: "Reminder Set",
      description: "We'll notify you 24 hours before the event.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Urgent Alert Popup */}
      {showUrgentAlert && urgentAlerts.length > 0 && (
        <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
          <Alert className="border-red-500 bg-red-50 shadow-lg">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Urgent: {urgentAlerts[0].bloodGroup} needed!</p>
                  <p className="text-sm">
                    {urgentAlerts[0].hospitalName} - {urgentAlerts[0].distance} away
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 ml-2"
                  onClick={() => handleDonateNow(urgentAlerts[0])}
                >
                  Donate
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto p-4 pt-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Blood Donation Hub</h1>
          <p className="text-blue-600">Make a difference, earn credits, save lives</p>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="alerts" className="flex items-center gap-1">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Credits</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Donation Alerts</h2>
              <Badge variant="destructive">{urgentAlerts.length} Active</Badge>
            </div>

            {urgentAlerts.map((alert) => (
              <Card key={alert.id} className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-900 flex items-center gap-2">
                        <Droplets className="w-5 h-5" />
                        <Badge variant="destructive" className="text-base px-2 py-1">{alert.bloodGroup}</Badge>
                        <span>Blood Needed</span>
                      </CardTitle>
                      <p className="text-red-700 font-medium">{alert.hospitalName}</p>
                    </div>
                    <Badge
                      variant={alert.urgency === "critical" ? "destructive" : "secondary"}
                      className={alert.urgency === "critical" ? "" : "bg-orange-100 text-orange-800"}
                    >
                      {alert.urgency.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-red-700">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </div>
                    <div className="flex items-center gap-2 text-red-700">
                      <Navigation className="w-4 h-4" />
                      {alert.distance} away
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-800 font-medium">{alert.unitsNeeded} units required</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => handleDonateNow(alert)}>
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Upcoming Events</h2>

            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        {event.type === "donation" ? <Droplets className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                        {event.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {event.type === "donation" ? "Blood Drive" : "Volunteering"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-700 font-semibold">+{event.creditsOffered}</div>
                      <div className="text-xs text-blue-600">credits</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-blue-700">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-blue-700">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  {event.bloodGroupsNeeded.length > 0 && (
                    <div>
                      <p className="text-sm text-blue-600 mb-2">Blood groups needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {event.bloodGroupsNeeded.map((group) => (
                          <Badge key={group} variant="outline" className="border-blue-300 text-blue-700">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {event.registered ? (
                      <Button disabled className="flex-1 bg-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Registered
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleRegisterEvent(event.id)}
                        >
                          Register
                        </Button>
                        <Button
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                          onClick={() => handleSetReminder(event.id)}
                        >
                          <Bell className="w-4 h-4 mr-1" />
                          Remind
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Credits Tab */}
          <TabsContent value="credits" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Smart Credits</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Gift className="w-4 h-4 mr-2" />
                Redeem Credits
              </Button>
            </div>

            {/* Credit Balance Card */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">{creditBalance}</div>
                <div className="text-blue-600">Available Credits</div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-green-600 font-semibold">
                      +{creditTransactions.filter((t) => t.type === "earned").reduce((sum, t) => sum + t.amount, 0)}
                    </div>
                    <div className="text-green-600">Total Earned</div>
                  </div>
                  <div>
                    <div className="text-red-600 font-semibold">
                      {creditTransactions.filter((t) => t.type === "redeemed").reduce((sum, t) => sum + t.amount, 0)}
                    </div>
                    <div className="text-red-600">Total Redeemed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {creditTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-blue-900">{transaction.description}</p>
                      <p className="text-sm text-blue-600">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div
                      className={`font-semibold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "earned" ? "+" : ""}
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Settings</h2>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">Smart Credit Notifications</p>
                    <p className="text-sm text-blue-600">Receive alerts for donation opportunities</p>
                  </div>
                  <Switch checked={smartCreditEnabled} onCheckedChange={setSmartCreditEnabled} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">Location Access</p>
                    <p className="text-sm text-blue-600">Show nearby hospitals and events</p>
                  </div>
                  <Switch checked={locationEnabled} onCheckedChange={setLocationEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-blue-900">Blood Donation</p>
                      <p className="text-sm text-blue-600">City General Hospital - January 5, 2024</p>
                    </div>
                    <Badge variant="secondary">O+</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-blue-900">Volunteer Work</p>
                      <p className="text-sm text-blue-600">Health Camp - January 2, 2024</p>
                    </div>
                    <Badge variant="outline">4 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
