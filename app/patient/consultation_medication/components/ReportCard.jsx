import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function ReportCard({ title, date, type }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
          <div className="space-x-2">
            <Badge variant="secondary">{type}</Badge>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

