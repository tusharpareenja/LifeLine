import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Calendar, Stethoscope, Pill, Microscope, Heart, CheckCircle, AlertCircle } from "lucide-react"

export function DashboardPerks() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Perks & Benefits</h2>
        <p className="text-muted-foreground">Exclusive benefits for LifeLine members</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Priority Treatment</CardTitle>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <CardDescription>Skip the queue at partner hospitals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Priority appointments</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Reduced waiting time</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Available at 15+ hospitals</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Partner Hospitals
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Medical Discounts</CardTitle>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <CardDescription>Save on checkups, medicines, and tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Pill className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">10% off on medications</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">15% off on lab tests</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">5% off on consultations</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Discount Partners
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Health Checkup</CardTitle>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <CardDescription>Annual free health assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Heart className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Comprehensive health check</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Blood work and vitals</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Doctor consultation included</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Appointment</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Diagnostic Tests</CardTitle>
              <Badge className="bg-amber-600">Premium Only</Badge>
            </div>
            <CardDescription>Discounted advanced diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Microscope className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">MRI scans (25% off)</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">CT scans (20% off)</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Ultrasound (15% off)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Upgrade to Access
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Health Workshops</CardTitle>
              <Badge>Coming Soon</Badge>
            </div>
            <CardDescription>Free health education sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Nutrition guidance</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Preventive healthcare</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Mental wellness</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Coming June 2023
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Family Benefits</CardTitle>
              <Badge>Coming Soon</Badge>
            </div>
            <CardDescription>Extend benefits to family members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <Gift className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Add up to 4 family members</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Shared savings benefits</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">Family health tracking</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Coming July 2023
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perk Eligibility</CardTitle>
          <CardDescription>How to qualify for additional benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Basic Plan Members</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Priority Treatment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">10% Medical Discounts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Annual Health Checkup</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Standard Plan Members</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">All Basic Plan Benefits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">15% Medical Discounts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Semi-Annual Health Checkups</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Premium Plan Members</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">All Standard Plan Benefits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">25% Medical Discounts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Advanced Diagnostic Tests</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <h3 className="font-medium mb-2">Savings Milestone Benefits</h3>
            <p className="text-sm text-muted-foreground mb-3">Unlock additional perks as your savings grow</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="font-medium text-sm">₹2,500 Milestone</div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">5% LifeLine Bonus Match</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">₹5,000 Milestone</div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">7% LifeLine Bonus Match</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">₹10,000 Milestone</div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">10% LifeLine Bonus Match</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

