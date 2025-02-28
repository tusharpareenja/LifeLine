import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PiggyBank, Shield, Receipt, TrendingUp, Download, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardTransactions() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View and track all your financial activities</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Transactions
          </label>
          <Input id="search" placeholder="Search by transaction ID, type, or amount" />
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="type" className="text-sm font-medium">
            Type
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="premium">Premium Payments</SelectItem>
              <SelectItem value="claim">Insurance Claims</SelectItem>
              <SelectItem value="bonus">LifeLine Bonus</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="date" className="text-sm font-medium">
            Date Range
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="date">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full md:w-auto">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>All your financial activities in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
              <div>Date</div>
              <div>Type</div>
              <div>Description</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Status</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">May 1, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Deposit</span>
                  </div>
                </div>
                <div className="text-sm">Monthly Savings Contribution</div>
                <div className="text-right font-medium text-green-600 dark:text-green-400">+₹250.00</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">May 1, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Bonus</span>
                  </div>
                </div>
                <div className="text-sm">LifeLine Matching Contribution</div>
                <div className="text-right font-medium text-green-600 dark:text-green-400">+₹12.50</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">Apr 15, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Premium</span>
                  </div>
                </div>
                <div className="text-sm">Insurance Premium Payment</div>
                <div className="text-right font-medium text-red-600 dark:text-red-400">-₹10.00</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">Apr 10, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Claim</span>
                  </div>
                </div>
                <div className="text-sm">Medication Reimbursement</div>
                <div className="text-right font-medium text-green-600 dark:text-green-400">+₹850.00</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">Apr 1, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Deposit</span>
                  </div>
                </div>
                <div className="text-sm">Monthly Savings Contribution</div>
                <div className="text-right font-medium text-green-600 dark:text-green-400">+₹250.00</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">Apr 1, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Bonus</span>
                  </div>
                </div>
                <div className="text-sm">LifeLine Matching Contribution</div>
                <div className="text-right font-medium text-green-600 dark:text-green-400">+₹12.50</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div className="text-sm">Mar 15, 2023</div>
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Premium</span>
                  </div>
                </div>
                <div className="text-sm">Insurance Premium Payment</div>
                <div className="text-right font-medium text-red-600 dark:text-red-400">-₹10.00</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Showing 7 of 24 transactions</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>Overview of your financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Total Deposits</div>
              <div className="mt-1 flex items-center">
                <div className="text-2xl font-bold">₹3,750</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>15%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Total Withdrawals</div>
              <div className="mt-1 flex items-center">
                <div className="text-2xl font-bold">₹0</div>
                <div className="ml-2 flex items-center text-sm text-muted-foreground">
                  <span>0%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Premium Payments</div>
              <div className="mt-1 flex items-center">
                <div className="text-2xl font-bold">₹50</div>
                <div className="ml-2 flex items-center text-sm text-muted-foreground">
                  <span>5 months</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">LifeLine Bonus</div>
              <div className="mt-1 flex items-center">
                <div className="text-2xl font-bold">₹125</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

