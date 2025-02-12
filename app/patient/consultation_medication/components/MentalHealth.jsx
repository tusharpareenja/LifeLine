"use client"

import React from "react"
import { Lock, MessageSquare, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function MentalHealth() {
  const [anonymityMode, setAnonymityMode] = React.useState(false)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Mental Health Support</CardTitle>
          <CardDescription>Access therapy sessions and mental health resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="anonymity-mode" checked={anonymityMode} onCheckedChange={setAnonymityMode} />
              <Label htmlFor="anonymity-mode">Anonymity Mode</Label>
              {anonymityMode ? (
                <Lock className="h-4 w-4 text-green-500" />
              ) : (
                <Unlock className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <Button className="w-full">Schedule Therapy Session</Button>
            <Button variant="outline" className="w-full">
              Browse Mental Health Resources
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>How are you feeling today?</p>
            <div className="flex justify-between">
              <Button variant="outline">😔</Button>
              <Button variant="outline">😐</Button>
              <Button variant="outline">🙂</Button>
              <Button variant="outline">😊</Button>
              <Button variant="outline">😄</Button>
            </div>
            <Input type="text" placeholder="Add a journal entry..." />
            <Button>Save Entry</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24/7 Support Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-100 rounded-lg p-2 max-w-[70%]">
                    <p className="text-sm">Hello, I'm feeling anxious today.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-2 max-w-[70%]">
                    <p className="text-sm">
                      I'm here to listen. Can you tell me more about what's causing your anxiety?
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="flex space-x-2">
              <Input type="text" placeholder="Type your message..." className="flex-grow" />
              <Button>
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

