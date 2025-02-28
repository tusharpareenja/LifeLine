import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DashboardInsurance() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Insurance</h2>
        <p className="text-muted-foreground">Manage your microinsurance plans and coverage details</p>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Plan</TabsTrigger>
          <TabsTrigger value="claims">Claims History</TabsTrigger>
          <TabsTrigger value="upgrade">Upgrade Options</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Basic Health Plan</CardTitle>
                    <CardDescription>Active since January 15, 2023</CardDescription>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Monthly Premium</div>
                  <div className="font-medium">₹10/month</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Next Payment Due</div>
                  <div className="font-medium">May 15, 2023</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Coverage Period</div>
                  <div className="font-medium">May 15, 2023 - June 14, 2023</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">Policy Number</div>
                  <div className="font-medium">LL-INS-2023-0042-B</div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Coverage Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Doctor Visits (up to 4 per year)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Emergency Treatment (up to ₹5,000)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Medications & OPD (up to ₹2,000)</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Specialist Consultations (not covered)</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Dental & Vision Care (not covered)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Policy
                </Button>
                <Button>Make Payment</Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>AI-Based Risk Assessment</CardTitle>
                <CardDescription>Your personalized health risk profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Overall Risk</span>
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Chronic Conditions</span>
                    <span className="text-sm font-medium">Very Low</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Emergency Risk</span>
                    <span className="text-sm font-medium">Moderate</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Medication Needs</span>
                    <span className="text-sm font-medium">Low</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>

                <div className="rounded-lg border p-3 mt-4">
                  <h4 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Recommendation
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your profile, the Basic Plan is suitable for your current needs. Consider upgrading to
                    Standard Plan if your medication needs increase.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Health Information
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>View and track your insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Medication Reimbursement</h4>
                      <p className="text-sm text-muted-foreground">Claim ID: CL-2023-0089</p>
                    </div>
                    <Badge>Approved</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date Filed</p>
                      <p className="font-medium">Apr 25, 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">₹850</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p className="font-medium">City Health Center</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Processed On</p>
                      <p className="font-medium">Apr 28, 2023</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Doctor Consultation</h4>
                      <p className="text-sm text-muted-foreground">Claim ID: CL-2023-0042</p>
                    </div>
                    <Badge>Approved</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date Filed</p>
                      <p className="font-medium">Feb 10, 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">₹300</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p className="font-medium">LifeLine Partner Clinic</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Processed On</p>
                      <p className="font-medium">Feb 12, 2023</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download All Claims</Button>
              <Button>File New Claim</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="upgrade">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Basic Plan</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">
                  ₹10<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Doctor Visits (4/year)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Emergency (₹5,000)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Medications (₹2,000)</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Specialist Consultations</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Dental & Vision</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Standard Plan</CardTitle>
                    <CardDescription>Recommended for you</CardDescription>
                  </div>
                  <Badge className="bg-green-600">Best Value</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">
                  ₹25<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Doctor Visits (8/year)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Emergency (₹10,000)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Medications (₹5,000)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Specialist (2/year)</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Dental & Vision</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade Now</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardDescription>Complete coverage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">
                  ₹50<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Unlimited Doctor Visits</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Emergency (₹25,000)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Medications (₹10,000)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Specialist (6/year)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Dental & Vision Coverage</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

