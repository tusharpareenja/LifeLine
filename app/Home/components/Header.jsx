import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-semibold">MediGlance</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/services" className="text-sm font-medium">
            Services
          </Link>
          <Link href="/contact" className="text-sm font-medium">
            Contact
          </Link>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">Book Now</Button>
        </nav>
      </div>
    </header>
  )
}

