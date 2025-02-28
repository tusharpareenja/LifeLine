
  
  export function ProgressBar({ value }) {
    return (
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    )
  }
  
  