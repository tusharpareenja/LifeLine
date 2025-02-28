import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PiggyBank, TrendingUp, ArrowUpRight, Calendar, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardSavings() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Savings</h2>
        <p className="text-muted-foreground">Manage your health savings plan for future medical expenses</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹4,250</div>
            <div className="flex items-center pt-1 text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>6.25% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LifeLine Bonus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹125</div>
            <div className="flex items-center pt-1 text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>5% matching on deposits</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Contribution</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹250</div>
            <div className="flex items-center pt-1 text-sm">
              <span className="text-muted-foreground">Next deposit: May 15, 2023</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Progress</CardTitle>
          <CardDescription>Track your progress towards your savings goal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Current: ₹4,250</span>
              <span className="text-sm">Goal: ₹6,500</span>
            </div>
            <Progress value={65} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              At your current rate, you'll reach your goal in approximately 9 months.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Savings Breakdown</h4>
              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your Contributions</span>
                  <span className="font-medium">₹4,125</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">LifeLine Bonus</span>
                  <span className="font-medium">₹125</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Savings Benefits</h4>
              <div className="rounded-lg border p-3">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Priority treatment at partner hospitals</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">10% discount on medical services</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">5% LifeLine matching contributions</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Make a Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Request Withdrawal</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <Card>
            <CardHeader>
              <CardTitle>Add to Your Health Savings</CardTitle>
              <CardDescription>Contribute to your future medical expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Deposit Amount (₹50 - ₹500)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" defaultValue="250" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="upi">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="card">Debit/Credit Card</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Bonus Opportunity</AlertTitle>
                <AlertDescription>
                  Deposit ₹300 or more this month to receive an additional 2% bonus on top of the standard 5% match!
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Schedule Monthly</Button>
              <Button>Make Deposit Now</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle>Request a Withdrawal</CardTitle>
              <CardDescription>Funds can only be used for verified medical expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                  <Input id="withdraw-amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Medical Purpose</Label>
                  <Select>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="consultation">Doctor Consultation</SelectItem>
                      <SelectItem value="treatment">Medical Treatment</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic Tests</SelectItem>
                      <SelectItem value="other">Other Medical Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital/Medical Facility</Label>
                <Select>
                  <SelectTrigger id="hospital">
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city-health">City Health Center</SelectItem>
                    <SelectItem value="lifeline-clinic">LifeLine Partner Clinic</SelectItem>
                    <SelectItem value="metro-hospital">Metro General Hospital</SelectItem>
                    <SelectItem value="other">Other (Verification Required)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input id="notes" placeholder="Provide details about the medical expense" />
              </div>

              <Alert className="bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  You'll need to upload medical bills or prescriptions to verify this withdrawal. Funds will be
                  transferred directly to the medical facility when possible.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Withdrawal Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

