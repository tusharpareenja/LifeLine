import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, AlertTriangle } from "lucide-react"

export default function QuickOverview() {
  return (
    <>
      <Card className="glassmorphism hover-expand">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients Today</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold animate-pulse">42</div>
          <p className="text-xs text-muted-foreground">+8% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="glassmorphism hover-expand">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">Next in 30 minutes</p>
        </CardContent>
      </Card>
      <Card className="glassmorphism hover-expand">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">13</div>
          <p className="text-xs text-muted-foreground">5 urgent reviews</p>
        </CardContent>
      </Card>
      <Card className="glassmorphism hover-expand">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Emergency Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500 animate-pulse">2</div>
          <p className="text-xs text-muted-foreground">Immediate attention required</p>
        </CardContent>
      </Card>
    </>
  )
}

