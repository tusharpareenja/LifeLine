import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


export default function PrescriptionCard({ doctor, date, medications }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{doctor}</h3>
            <p className="text-sm text-gray-500">{date}</p>
            <ul className="mt-2 text-sm">
              {medications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          </div>
          <div className="space-x-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

