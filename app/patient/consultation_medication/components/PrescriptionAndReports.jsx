import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import PrescriptionCard from "./PrescriptionCard"
import ReportCard from "./ReportCard"

export default function PrescriptionsAndReports() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Digital Prescriptions & Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="text" placeholder="Search prescriptions or reports..." />
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <PrescriptionCard
                  doctor="Dr. Emily Chen"
                  date="May 10, 2025"
                  medications={["Lisinopril 10mg", "Metformin 500mg"]}
                />
                <PrescriptionCard doctor="Dr. Michael Lee" date="April 22, 2025" medications={["Amoxicillin 500mg"]} />
                <ReportCard title="Blood Test Results" date="May 5, 2025" type="PDF" />
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Insights</CardTitle>
          <CardDescription>AI-driven analysis of your medical history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Based on your recent prescriptions and reports:</p>
            <ul className="list-disc list-inside">
              <li>Your blood pressure has improved over the last 3 months</li>
              <li>Consider scheduling a follow-up for your recent antibiotic course</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

