"use client"

import { useState } from "react"
import { Eye, EyeOff, Fingerprint, ChromeIcon as Google } from "lucide-react"
import { handleGoogleSignIn } from "./signinserver"
import { adminLogin, adminRegister } from "@/app/actions/actions"
import { toast } from "sonner"

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try{
      console.log(email,password,name)
      const res = await adminRegister({
        email ,
        password,
        name
      })
      console.log(res)

      if (res.success) {
        // Login successful
        toast.success("Login successful")
      } else {
        // Login failed
        console.log("insdin")
        toast.error("Login failed")
      }
    } catch(err){
      toast.error("Login failed " ,err)
    }
    setLoading(false)
  }
  const handleGoogleLogin = async() => {
    await handleGoogleSignIn();
   
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email / Phone Number
        </label>
        <input
          id="email"
          type="text"
          placeholder="Enter your registered email or phone"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="text-right">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Login"
        )}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="flex items-center justify-between">
        <hr className="w-full border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="w-full border-gray-300" />
      </div>
      <button
       onClick={handleGoogleLogin}
        type="button"
        className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out mb-2"
      >
        <Google className="h-5 w-5 mr-2 text-red-500" />
        Continue with Google
      </button>
      <button
        type="button"
        className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        <Fingerprint className="h-5 w-5 mr-2 text-blue-500" />
        Fingerprint Login
      </button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        New to LifeLine?{" "}
        <a href="/admin/login" className="font-medium text-blue-600 hover:text-blue-500">
          Login Here
        </a>
      </p>
    </form>
  )
}

export default RegisterForm

