"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sun, Moon, Award, Gift, History, HeartHandshake } from "lucide-react"
import EarnCredits from "./components/earn-credits"
import RedeemCredits from "./components/redeem-credits"
import CreditsHistory from "./components/credits-history"
import Donations from "./components/donation"
import { useTheme } from "next-themes"

export default function Dashboard() {
  const [credits, setCredits] = useState(75)
  const [transactions, setTransactions] = useState([
    { id: 1, type: "earned", activity: "Vaccination", amount: 10, date: "2024-02-15", location: "City Hospital" },
    { id: 2, type: "earned", activity: "Blood Donation", amount: 20, date: "2024-02-10", location: "Red Cross Center" },
    { id: 3, type: "earned", activity: "Health Checkup", amount: 15, date: "2024-01-25", location: "Community Clinic" },
    {
      id: 4,
      type: "redeemed",
      service: "Doctor Consultation",
      amount: 30,
      date: "2024-02-01",
      location: "Medical Center",
    },
    {
      id: 5,
      type: "received",
      source: "Donation Pool",
      amount: 60,
      date: "2024-01-15",
      location: "LifeLine Foundation",
    },
  ])

  const { setTheme, theme } = useTheme()

  const handleEarnCredits = (activity, amount) => {
    setCredits((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: prev.length + 1,
        type: "earned",
        activity,
        amount,
        date: new Date().toISOString().split("T")[0],
        location: "City Hospital",
      },
      ...prev,
    ])
  }

  const handleRedeemCredits = (service, amount) => {
    if (credits >= amount) {
      setCredits((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: prev.length + 1,
          type: "redeemed",
          service,
          amount,
          date: new Date().toISOString().split("T")[0],
          location: "Medical Center",
        },
        ...prev,
      ])
      return true
    }
    return false
  }

  const handleReceiveDonation = (amount) => {
    setCredits((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: prev.length + 1,
        type: "received",
        source: "Donation Pool",
        amount,
        date: new Date().toISOString().split("T")[0],
        location: "LifeLine Foundation",
      },
      ...prev,
    ])
  }

  // Calculate progress percentage (assuming 500 is max for visual purposes)
  const progressPercentage = Math.min((credits / 500) * 100, 100)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">LifeLine Credit System</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6 bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold">Welcome</h2>
                <p className="text-muted-foreground">Manage your healthcare credits</p>
              </div>
              <div className="bg-primary/10 px-4 py-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold text-primary">{credits} Credits</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{credits} / 500 Credits</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="earn" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="earn" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Earn</span>
            </TabsTrigger>
            <TabsTrigger value="redeem" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Redeem</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" />
              <span className="hidden sm:inline">Donations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earn">
            <EarnCredits onEarnCredits={handleEarnCredits} />
          </TabsContent>

          <TabsContent value="redeem">
            <RedeemCredits onRedeemCredits={handleRedeemCredits} currentCredits={credits} />
          </TabsContent>

          <TabsContent value="history">
            <CreditsHistory transactions={transactions} />
          </TabsContent>

          <TabsContent value="donations">
            <Donations onReceiveDonation={handleReceiveDonation} currentCredits={credits} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

