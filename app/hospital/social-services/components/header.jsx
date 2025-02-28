import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              NGO & Crowdfunding Management
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input type="text" placeholder="Search patient, NGO, or campaign" className="pl-10 w-full" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New NGO or Campaign
            </Button>
           
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground">Total NGO Aid Cases</div>
            <div className="text-2xl font-bold text-blue-500">1,520</div>
          </div>
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground">Active Crowdfunding Campaigns</div>
            <div className="text-2xl font-bold text-green-500">145</div>
          </div>
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground">Total Funds Raised</div>
            <div className="text-2xl font-bold text-amber-500">₹8.75 Cr</div>
          </div>
        </div>
      </div>
    </header>
  )
}

