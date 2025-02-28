"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Gift, HeartHandshake } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreditsHistory({ transactions }) {
  // Filter transactions by type
  const earnedTransactions = transactions.filter((t) => t.type === "earned")
  const redeemedTransactions = transactions.filter((t) => t.type === "redeemed")
  const receivedTransactions = transactions.filter((t) => t.type === "received")

  const renderTransactionIcon = (type) => {
    switch (type) {
      case "earned":
        return <Award className="h-4 w-4" />
      case "redeemed":
        return <Gift className="h-4 w-4" />
      case "received":
        return <HeartHandshake className="h-4 w-4" />
      default:
        return null
    }
  }

  const renderTransactionBadge = (type) => {
    switch (type) {
      case "earned":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Earned
          </Badge>
        )
      case "redeemed":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Redeemed
          </Badge>
        )
      case "received":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            Received
          </Badge>
        )
      default:
        return null
    }
  }

  const renderTransactionsList = (filteredTransactions) => {
    if (filteredTransactions.length === 0) {
      return <div className="text-center py-8 text-muted-foreground">No transactions to display</div>
    }

    return (
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/50">
            <div className="bg-primary/10 p-2 rounded-full">{renderTransactionIcon(transaction.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h4 className="font-medium">
                    {transaction.type === "earned" && transaction.activity}
                    {transaction.type === "redeemed" && transaction.service}
                    {transaction.type === "received" && "Donation Received"}
                  </h4>
                  <p className="text-sm text-muted-foreground">{transaction.location}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${transaction.type === "redeemed" ? "text-red-500" : "text-green-500"}`}
                    >
                      {transaction.type === "redeemed" ? "-" : "+"}
                      {transaction.amount} Credits
                    </span>
                    {renderTransactionBadge(transaction.type)}
                  </div>
                  <span className="text-xs text-muted-foreground">{transaction.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Credits History</h2>
        <p className="text-muted-foreground">Track all your credit transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="earned">Earned</TabsTrigger>
              <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>

            <TabsContent value="all">{renderTransactionsList(transactions)}</TabsContent>

            <TabsContent value="earned">{renderTransactionsList(earnedTransactions)}</TabsContent>

            <TabsContent value="redeemed">{renderTransactionsList(redeemedTransactions)}</TabsContent>

            <TabsContent value="received">{renderTransactionsList(receivedTransactions)}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

