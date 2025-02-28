import React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { DashboardNav } from "@/components/dashboard-nav"




export function DashboardShell({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-primary text-xl">LifeLine</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <DashboardNav />
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
              <div className="flex flex-1 items-center gap-2">
                <h1 className="text-lg font-semibold">LifeLine Financial Security</h1>
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

