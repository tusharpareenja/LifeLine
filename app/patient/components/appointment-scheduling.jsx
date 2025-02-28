"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AppointmentScheduling() {
  const [date, setDate] = useState(new Date())
  const [consultationType, setConsultationType] = useState("video")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Schedule Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
          <DialogDescription>Choose your preferred date, time, and consultation type.</DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="mt-4">
              <Label>Consultation Type</Label>
              <RadioGroup defaultValue="video" onValueChange={setConsultationType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Video Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person">In-Person Visit</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full mt-4">Confirm & Pay</Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}