import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function SymptomChecker() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Symptom Checker</CardTitle>
          <CardDescription>Describe your symptoms and get instant insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="text" placeholder="Describe your symptoms..." />
            <Button className="w-full">Start Assessment</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Symptom Assessment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Possible Conditions:</h3>
              <ul className="list-disc list-inside">
                <li>Common Cold</li>
                <li>Seasonal Allergies</li>
                <li>Sinus Infection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Recommended Action:</h3>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Consult a Doctor
              </Badge>
              <p className="mt-2 text-sm">
                Based on your symptoms, we recommend consulting with a general practitioner.
              </p>
            </div>
            <Button>Book a Consultation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

