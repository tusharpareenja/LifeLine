import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, PiggyBank, Receipt, TrendingUp, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,250</div>
            <p className="text-xs text-muted-foreground">+₹250 this month</p>
            <Progress value={65} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">65% of your goal (₹6,500)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Basic Plan (₹10/month)</p>
            <div className="mt-3 flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <span>Next payment: 15 May 2023</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Claims</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Processed on 28 Apr 2023</p>
            <div className="mt-3 flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
              <span>₹850 for medication</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LifeLine Bonus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹125</div>
            <p className="text-xs text-muted-foreground">Matching contributions</p>
            <div className="mt-3 flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
              <span>5% of your deposits</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Health Check Reminder</AlertTitle>
        <AlertDescription>
          You're eligible for a free annual health check-up at our partner hospitals. Book your appointment today!
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your last 3 financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                  <PiggyBank className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Monthly Savings Deposit</p>
                  <p className="text-xs text-muted-foreground">May 1, 2023</p>
                </div>
                <div className="font-medium text-green-600 dark:text-green-400">+₹250</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                  <TrendingUp className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">LifeLine Bonus Credit</p>
                  <p className="text-xs text-muted-foreground">May 1, 2023</p>
                </div>
                <div className="font-medium text-green-600 dark:text-green-400">+₹12.50</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-red-100 dark:bg-red-900">
                  <Shield className="h-4 w-4 text-red-700 dark:text-red-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Insurance Premium Payment</p>
                  <p className="text-xs text-muted-foreground">Apr 15, 2023</p>
                </div>
                <div className="font-medium text-red-600 dark:text-red-400">-₹10</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your health finances</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full">Add Savings</Button>
              <Button variant="outline" className="w-full">
                File Claim
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full">
                View Policy
              </Button>
              <Button variant="outline" className="w-full">
                Get Support
              </Button>
            </div>
            <div className="mt-2">
              <h4 className="mb-2 text-sm font-medium">Recommended for you</h4>
              <div className="rounded-lg border p-3">
                <h5 className="font-medium">Upgrade to Standard Plan</h5>
                <p className="text-xs text-muted-foreground mt-1">
                  Get additional coverage for just ₹15 more per month, including specialist consultations and dental
                  care.
                </p>
                <Button size="sm" className="mt-2 w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

