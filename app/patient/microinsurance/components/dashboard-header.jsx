import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"



export function DashboardHeader({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your health finances and insurance in one place.</p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="savings">My Savings</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="perks">Perks</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

