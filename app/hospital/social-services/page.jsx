'use client'
import { CollapsibleSection } from "./components/collapsible-section"
import { Header } from "./components/header"
import { StatusBadge } from "./components/status-badge"
import { ProgressBar } from "./components/progress-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto p-4 space-y-6">
        <Tabs defaultValue="ngo-matching" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ngo-matching">NGO Matching</TabsTrigger>
            <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="partnerships">NGO Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="ngo-matching" className="mt-6">
            <CollapsibleSection title="NGO & Patient Aid Matching">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Disease Type</option>
                      <option>Heart Surgery</option>
                      <option>Cancer Treatment</option>
                      <option>Kidney Dialysis</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>NGO Partner</option>
                      <option>Heart Foundation</option>
                      <option>Tata Trust</option>
                      <option>Kidney Care India</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Patient Name</th>
                        <th className="text-left p-4">Disease</th>
                        <th className="text-left p-4">Matching NGOs</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Rahul Verma</td>
                        <td className="p-4">Heart Surgery</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                              Heart Foundation
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                              Red Cross
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Match NGO
                          </Button>
                          <Button variant="success" size="sm" className="mr-2">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            Reject
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Meena Sharma</td>
                        <td className="p-4">Cancer Treatment</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                              Tata Trust
                            </span>
                            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                              Aarogya Foundation
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status="Approved" variant="success" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            Match NGO
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

          <TabsContent value="crowdfunding" className="mt-6">
            <CollapsibleSection title="Crowdfunding Campaigns">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Goal Amount</option>
                      <option>Under ₹5,00,000</option>
                      <option>₹5,00,000 - ₹10,00,000</option>
                      <option>Above ₹10,00,000</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Status</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Rahul Verma - Heart Surgery</h3>
                        <p className="text-sm text-muted-foreground">Goal: ₹10,00,000</p>
                      </div>
                      <StatusBadge status="Active" variant="success" />
                    </div>
                    <ProgressBar value={78.5} />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Raised: ₹7,85,000</span>
                      <span className="text-muted-foreground">78.5%</span>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Close Campaign
                      </Button>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Meena Sharma - Cancer Treatment</h3>
                        <p className="text-sm text-muted-foreground">Goal: ₹5,00,000</p>
                      </div>
                      <StatusBadge status="Completed" variant="success" />
                    </div>
                    <ProgressBar value={100} />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Raised: ₹5,00,000</span>
                      <span className="text-muted-foreground">100%</span>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Close Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          <TabsContent value="donors" className="mt-6">
            <CollapsibleSection title="Donor & Contribution Management">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Donation Amount</option>
                      <option>Under ₹10,000</option>
                      <option>₹10,000 - ₹50,000</option>
                      <option>Above ₹50,000</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Status</option>
                      <option>Successful</option>
                      <option>Pending</option>
                      <option>Failed</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card rounded-lg overflow-hidden border border-border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Donor Name</th>
                        <th className="text-left p-4">Amount</th>
                        <th className="text-left p-4">Campaign Supported</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Anil Mehta</td>
                        <td className="p-4">₹25,000</td>
                        <td className="p-4">Rahul Verma - Heart Surgery</td>
                        <td className="p-4">
                          <StatusBadge status="Successful" variant="success" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="success" size="sm" className="mr-2">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm" className="mr-2">
                            Reject
                          </Button>
                          <Button variant="outline" size="sm">
                            Refund
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">Ravi Kumar</td>
                        <td className="p-4">₹15,000</td>
                        <td className="p-4">Amit Kumar - Kidney Dialysis</td>
                        <td className="p-4">
                          <StatusBadge status="Pending" />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="success" size="sm" className="mr-2">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm" className="mr-2">
                            Reject
                          </Button>
                          <Button variant="outline" size="sm">
                            Refund
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          <TabsContent value="partnerships" className="mt-6">
            <CollapsibleSection title="NGO Partnerships & Approvals">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Focus Area</option>
                      <option>Cardiac Surgeries</option>
                      <option>Cancer Care</option>
                      <option>Dialysis Support</option>
                    </select>
                    <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
                      <option>Approval Status</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Heart Foundation</h3>
                        <p className="text-sm text-muted-foreground">Focus: Cardiac Surgeries</p>
                      </div>
                      <StatusBadge status="Approved" variant="success" />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="success" size="sm">
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        Request Info
                      </Button>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Tata Trust</h3>
                        <p className="text-sm text-muted-foreground">Focus: Cancer Care</p>
                      </div>
                      <StatusBadge status="Pending Approval" />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="success" size="sm">
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        Request Info
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

