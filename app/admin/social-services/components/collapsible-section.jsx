"use client"

import  React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"


export function CollapsibleSection({ title, children, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-lg font-medium">{title}</h2>
        <button className="text-muted-foreground hover:text-foreground">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isExpanded && <div className="p-4 border-t border-border">{children}</div>}
    </div>
  )
}

