import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">LifeLine</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300">
              About
            </a>
            <a href="#" className="hover:text-blue-300">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-300">
              Terms
            </a>
            <a href="#" className="hover:text-blue-300">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} LifeLine. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

