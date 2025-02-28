import { Button } from "@/components/ui/button"
import { FileUp, Edit, Video, Ambulance } from "lucide-react"

export default function SmartActionsSidebar() {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900"
      >
        <FileUp className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900"
      >
        <Edit className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900"
      >
        <Video className="h-6 w-6" />
      </Button>
      <Button variant="destructive" size="icon" className="rounded-full shadow-lg animate-pulse">
        <Ambulance className="h-6 w-6" />
      </Button>
    </div>
  )
}

