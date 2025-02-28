"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Syringe, Droplet, Stethoscope, Heart } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "sonner"

const activities = [
  {
    id: 1,
    name: "Vaccination",
    description: "Get vaccinated at any registered hospital",
    credits: 10,
    icon: Syringe,
  },
  {
    id: 2,
    name: "Blood Donation",
    description: "Donate blood at a blood bank or donation drive",
    credits: 20,
    icon: Droplet,
  },
  {
    id: 3,
    name: "Routine Health Checkup",
    description: "Complete your annual health examination",
    credits: 15,
    icon: Stethoscope,
  },
  {
    id: 4,
    name: "Redeem Coupon",
    description: "Add a custom health-positive activity",
    credits: 0,
    icon: Heart,
    custom: true,
  },
]

export default function EarnCredits({ onEarnCredits }) {
  const [customActivity, setCustomActivity] = useState("")
  const [customCredits, setCustomCredits] = useState(0)

  const handleEarnCredits = (activity, credits) => {
    onEarnCredits(activity, credits)
    toast({
      title: "Credits Earned!",
      description: `You've earned ${credits} credits for ${activity}`,
      variant: "default",
    })
  }

  const handleCustomActivity = () => {
    if (customActivity.trim() && customCredits > 0) {
      onEarnCredits(customActivity, customCredits)
      toast({
        title: "Custom Credits Earned!",
        description: `You've earned ${customCredits} credits for ${customActivity}`,
        variant: "default",
      })
      setCustomActivity("")
      setCustomCredits(0)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Earn LifeLine Credits</h2>
        <p className="text-muted-foreground">Complete health-positive activities to earn credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{activity.name}</CardTitle>
                <activity.icon className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {!activity.custom ? (
                <div className="text-2xl font-bold text-primary">{activity.credits} Credits</div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      value={customActivity}
                      onChange={(e) => setCustomActivity(e.target.value)}
                      placeholder="Enter activity name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="activity-credits">Coupon Code</Label>
                    <Input
                      id="activity-credits"
                      type="number"
                      min="1"
                      value={customCredits || ""}
                      onChange={(e) => setCustomCredits(Number.parseInt(e.target.value) || 0)}
                      placeholder="Enter credits amount"
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-card">
              {!activity.custom ? (
                <Button className="w-full" onClick={() => handleEarnCredits(activity.name, activity.credits)}>
                  Earn Credits
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleCustomActivity}
                  disabled={!customActivity || customCredits <= 0}
                >
                  Redeem Coupon
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
    </div>
  )
}

