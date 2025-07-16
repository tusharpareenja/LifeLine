"use client"

import React, { useEffect, useState } from "react"
import { Search, Upload, Download, Share2, Moon, Sun, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMedicalReportsByPatientId } from "@/app/actions/appointments"

export default function CategorizedMedicalRecords({ patientId }) {
    return (
      <Tabs defaultValue="consultations" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-4">
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="surgeries">Surgeries</TabsTrigger>
        </TabsList>
        <TabsContent value="consultations">
          <ConsultationHistory patientId={patientId} />
        </TabsContent>
        <TabsContent value="lab-reports">
          <LabReports />
        </TabsContent>
        <TabsContent value="medications">
          <Medications />
        </TabsContent>
        <TabsContent value="vaccinations">
          <Vaccinations />
        </TabsContent>
        <TabsContent value="surgeries">
          <Surgeries />
        </TabsContent>
      </Tabs>
    )
  }

  function ConsultationHistory({ patientId }) {
    const [consultations, setConsultations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
      async function fetchReports() {
        setLoading(true)
        setError("")
        if (!patientId) {
          setError("No patient ID provided.")
          setConsultations([])
          setLoading(false)
          return
        }
        try {
          const res = await getMedicalReportsByPatientId(patientId)
          console.log("Fetched consultations response:", res)
          if (res && res.success) {
            setConsultations(Array.isArray(res.data) ? res.data : [])
            console.log("Consultations data:", res.data)
          } else {
            setError(res?.error || "Failed to fetch medical reports")
            setConsultations([])
          }
        } catch (err) {
          setError("Failed to fetch medical reports: " + (err?.message || err))
          setConsultations([])
        }
        setLoading(false)
      }
      fetchReports()
    }, [patientId])

    if (loading) return <div className="text-center py-4 text-gray-500">Loading...</div>
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>

    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No consultations found.</div>
          ) : (
            consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <CardTitle>
                    {new Date(consultation.date).toLocaleDateString()} - {consultation.doctor?.user?.name || "Unknown Doctor"}
                  </CardTitle>
                  <CardDescription>{consultation.diagnosis}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Prescription:</strong> {consultation.prescription}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    )
  }
  function LabReports() {
    const reports = [
      { id: 1, date: "May 10, 2025", type: "Blood Test", result: "Normal", file: "blood_test_may_2025.pdf" },
      {
        id: 2,
        date: "April 5, 2025",
        type: "X-Ray",
        result: "No abnormalities detected",
        file: "chest_xray_april_2025.jpg",
      },
    ]
  
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>
                  {report.date} - {report.type}
                </CardTitle>
                <CardDescription>Result: {report.result}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Download {report.file}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    )
  }

  function Medications() {
    const medications = [
      {
        id: 1,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "Jan 1, 2025",
        endDate: "Ongoing",
      },
      {
        id: 2,
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "Mar 15, 2025",
        endDate: "Ongoing",
      },
    ]
  
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {medications.map((medication) => (
            <Card key={medication.id}>
              <CardHeader>
                <CardTitle>{medication.name}</CardTitle>
                <CardDescription>
                  {medication.dosage}, {medication.frequency}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Start Date: {medication.startDate}</p>
                <p>End Date: {medication.endDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    )
  }


  function Vaccinations() {
    const vaccinations = [
      { id: 1, name: "COVID-19 Vaccine", date: "Feb 15, 2025", type: "Pfizer-BioNTech" },
      { id: 2, name: "Influenza Vaccine", date: "Oct 1, 2024", type: "Quadrivalent" },
    ]
  
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {vaccinations.map((vaccination) => (
            <Card key={vaccination.id}>
              <CardHeader>
                <CardTitle>{vaccination.name}</CardTitle>
                <CardDescription>{vaccination.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Type: {vaccination.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    )
  }


  function Surgeries() {
    const surgeries = [
      { id: 1, name: "Appendectomy", date: "July 10, 2024", hospital: "City General Hospital" },
      { id: 2, name: "Knee Arthroscopy", date: "March 5, 2023", hospital: "Ortho Specialty Center" },
    ]
  
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {surgeries.map((surgery) => (
            <Card key={surgery.id}>
              <CardHeader>
                <CardTitle>{surgery.name}</CardTitle>
                <CardDescription>{surgery.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hospital: {surgery.hospital}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    )
  }