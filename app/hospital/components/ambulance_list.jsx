import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const ambulances = [
  { id: 1, regNo: "AMB-001", driver: "John Doe", status: "available", type: "BLS" },
  { id: 2, regNo: "AMB-002", driver: "Jane Smith", status: "on-duty", type: "ALS" },
  { id: 3, regNo: "AMB-003", driver: "Mike Johnson", status: "maintenance", type: "ICU" },
]

export function AmbulanceList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reg. No.</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ambulances.map((ambulance) => (
          <TableRow key={ambulance.id}>
            <TableCell>{ambulance.regNo}</TableCell>
            <TableCell>{ambulance.driver}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  ambulance.status === "available"
                    ? "bg-green-100 text-green-800"
                    : ambulance.status === "on-duty"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }
              >
                {ambulance.status}
              </Badge>
            </TableCell>
            <TableCell>{ambulance.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

