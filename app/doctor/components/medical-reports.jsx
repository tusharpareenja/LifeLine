"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Download, AlertTriangle } from "lucide-react"

// Mock data for medical reports
const mockReports = [
  { id: 1, patientName: "Karan", type: "Blood Test", date: "2023-06-10", status: "Normal" },
  { id: 2, patientName: "Ram", type: "X-Ray", date: "2023-06-12", status: "Abnormal" },
  { id: 3, patientName: "Johnny", type: "MRI Scan", date: "2023-06-14", status: "Normal" },
  // Add more mock data as needed
]

export function MedicalReports() {
  const [reports, setReports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.date.includes(searchTerm),
  )

  const handleUploadReport = () => {
    // Implement upload report functionality
    console.log("Uploading new report")
  }

  const handleDownloadReport = (id) => {
    // Implement download report functionality
    console.log(`Downloading report ${id}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
        <Button onClick={handleUploadReport}>
          <Upload className="mr-2 h-4 w-4" /> Upload Report
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Report Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.patientName}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Badge className={report.status === "Normal" ? "bg-green-500" : "bg-red-500"}>
                  {report.status}
                  {report.status === "Abnormal" && <AlertTriangle className="ml-1 h-4 w-4 inline" />}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id)}>
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

