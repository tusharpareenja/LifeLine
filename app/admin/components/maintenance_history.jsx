import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const maintenanceHistory = [
  { id: 1, regNo: "AMB-001", lastService: "2025-05-01", nextService: "2025-08-01", status: "OK" },
  { id: 2, regNo: "AMB-002", lastService: "2025-04-15", nextService: "2025-07-15", status: "Due Soon" },
  { id: 3, regNo: "AMB-003", lastService: "2025-03-01", nextService: "2025-06-01", status: "Overdue" },
]

export function MaintenanceHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance & Service History</CardTitle>
        <CardDescription>Track the maintenance schedule of your ambulance fleet</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reg. No.</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.regNo}</TableCell>
                <TableCell>{item.lastService}</TableCell>
                <TableCell>{item.nextService}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.status === "OK"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Due Soon"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

