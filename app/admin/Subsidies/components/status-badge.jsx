import { cn } from "@/lib/utils"


export function StatusBadge({ status, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
        variant === "success" && "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
        variant === "warning" && "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400",
        variant === "danger" && "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
        status === "Available" && "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
        status === "Limited" && "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400",
        status === "Closed" && "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
        status === "Pending" && "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
        status === "Awaiting Approval" && "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
        status === "Pending Approval" && "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
        status === "Approved" && "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
      )}
    >
      {status}
    </span>
  )
}

