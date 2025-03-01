'use client'
import { CollapsibleSection } from "./components/collapsible-section"
import { Header } from "./components/header"
import { StatusBadge } from "./components/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto p-4 space-y-6">
        <Tabs defaultValue="patients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patients">Patients & Subsidies</TabsTrigger>
            <TabsTrigger value="matching">Subsidy Matching</TabsTrigger>
            <TabsTrigger value="programs">Subsidy Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="mt-6">
            <CollapsibleSection title="Patients & Assigned Subsidies">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Disease Type</option>
                      <option>Heart Disease</option>
                      <option>Cancer</option>
                      <option>Kidney Failure</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Subsidy Status</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Patient Name</th>
                        <th className="text-left p-4">Disease</th>
                        <th className="text-left p-4">Assigned Subsidy</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Rahul Verma</td>
                        <td className="p-4">Heart Disease</td>
                        <td className="p-4">Ayushman Bharat</td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Meena Sharma</td>
                        <td className="p-4">Cancer</td>
                        <td className="p-4">State Govt Cancer Fund</td>
                        <td className="p-4">
                          <StatusBadge status="Approved" variant="success" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">Amit Kumar</td>
                        <td className="p-4">Kidney Failure</td>
                        <td className="p-4">PMJAY Dialysis</td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          <TabsContent value="matching" className="mt-6">
            <CollapsibleSection title="Subsidy Matching & Approval">
              <div className="space-y-4">
                <div className="bg-card rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Patient</th>
                        <th className="text-left p-4">Disease</th>
                        <th className="text-left p-4">Match Options</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Rahul Verma</td>
                        <td className="p-4">Heart Disease</td>
                        <td className="p-4">
                          <select className="bg-background border border-input rounded-md px-2 py-1 text-sm w-full">
                            <option>Ayushman Bharat</option>
                            <option>PMJAY</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Assign
                          </Button>
                          <Button variant="success" size="sm" className="mr-2">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            Reject
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">Amit Kumar</td>
                        <td className="p-4">Kidney Failure</td>
                        <td className="p-4">
                          <select className="bg-background border border-input rounded-md px-2 py-1 text-sm w-full">
                            <option>PMJAY Dialysis</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Assign
                          </Button>
                          <Button variant="success" size="sm" className="mr-2">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            Reject
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <CollapsibleSection title="Subsidy Programs">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Disease Type</option>
                      <option>Heart Disease</option>
                      <option>Cancer</option>
                      <option>Kidney Failure</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Hospital Branch</option>
                      <option>Main Branch</option>
                      <option>North Wing</option>
                      <option>South Wing</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Program Name</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Ayushman Bharat - Heart Surgery</td>
                        <td className="p-4">
                          <StatusBadge status="Available" variant="success" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">PMJAY - Dialysis Support</td>
                        <td className="p-4">
                          <StatusBadge status="Limited" variant="warning" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">State Govt Cancer Fund</td>
                        <td className="p-4">
                          <StatusBadge status="Closed" variant="danger" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

