"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { HeartHandshake, Users, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "sonner"

// Mock donation pool data
const donationPool = {
  totalAvailable: 2500,
  recentDonors: [
    { id: 1, name: "Anonymous", amount: 100, date: "2024-02-20" },
    { id: 2, name: "John D.", amount: 50, date: "2024-02-19" },
    { id: 3, name: "Sarah M.", amount: 75, date: "2024-02-18" },
  ],
}

export default function Donations({ onReceiveDonation, currentCredits }) {
  const [requestReason, setRequestReason] = useState("")
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [requestAmount, setRequestAmount] = useState(50) // Default request amount

  const handleSubmitRequest = () => {
    if (requestReason.trim()) {
      setRequestSubmitted(true)
      toast({
        title: "Request Submitted",
        description: "Your donation request has been submitted for review.",
        variant: "default",
      })

      // Simulate approval after 3 seconds
      setTimeout(() => {
        onReceiveDonation(requestAmount)
        toast({
          title: "Donation Approved!",
          description: `You've received ${requestAmount} credits from the donation pool.`,
          variant: "default",
        })
      }, 3000)
    }
  }

  const handleResetRequest = () => {
    setRequestSubmitted(false)
    setRequestReason("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Donation Center</h2>
        <p className="text-muted-foreground">Request credits from our donation pool or view recent donations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" />
              Request Donation
            </CardTitle>
            <CardDescription>Patients in need can request credits from our donation pool</CardDescription>
          </CardHeader>
          <CardContent>
            {!requestSubmitted ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Amount</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRequestAmount(Math.max(25, requestAmount - 25))}
                    >
                      -
                    </Button>
                    <div className="text-center font-bold text-lg flex-1">{requestAmount} Credits</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRequestAmount(Math.min(200, requestAmount + 25))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium">
                    Reason for Request
                  </label>
                  <Textarea
                    id="reason"
                    placeholder="Please explain why you need these credits..."
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="rounded-lg bg-primary/10 p-4 text-center">
                  <h3 className="font-medium mb-1">Request Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Your request for {requestAmount} credits is being reviewed
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing</span>
                    <span>Please wait...</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {!requestSubmitted ? (
              <Button onClick={handleSubmitRequest} disabled={!requestReason.trim()}>
                Submit Request
              </Button>
            ) : (
              <Button variant="outline" onClick={handleResetRequest}>
                New Request
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Donation Pool
            </CardTitle>
            <CardDescription>View available credits and recent donors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Available Credits</span>
                <span className="text-xl font-bold text-primary">{donationPool.totalAvailable}</span>
              </div>
              <Progress value={donationPool.totalAvailable / 50} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">Updated daily</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Recent Donors</h3>
              <div className="space-y-3">
                {donationPool.recentDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex items-center justify-between p-3 rounded-md bg-card/50 border border-border"
                  >
                    <div>
                      <div className="font-medium">{donor.name}</div>
                      <div className="text-xs text-muted-foreground">{donor.date}</div>
                    </div>
                    <div className="text-primary font-bold">+{donor.amount} Credits</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <span>View All Donations</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

