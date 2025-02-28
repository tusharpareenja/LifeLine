"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Star, ArrowRight, Zap, ChevronDown } from "lucide-react"

export function GetInsurance() {
  const [premiumRange, setPremiumRange] = useState([50000, 500000])
  const [coverageFilter, setCoverageFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const insuranceProviders = [
    {
      id: 1,
      name: "BlueCross Health",
      logo: "/placeholder.svg?height=60&width=60",
      premium: 120000,
      coverage: "Comprehensive",
      claimRatio: 98,
      rating: 4.8,
      features: ["Hospitalization", "Medications", "Specialist Visits", "Emergency Care"],
    },
    {
      id: 2,
      name: "MediShield Plus",
      logo: "/placeholder.svg?height=60&width=60",
      premium: 95000,
      coverage: "Standard",
      claimRatio: 92,
      rating: 4.5,
      features: ["Hospitalization", "Medications", "Emergency Care"],
    },
    {
      id: 3,
      name: "Guardian Health",
      logo: "/placeholder.svg?height=60&width=60",
      premium: 150000,
      coverage: "Premium",
      claimRatio: 96,
      rating: 4.7,
      features: ["Hospitalization", "Medications", "Specialist Visits", "Emergency Care", "Wellness Programs"],
    },
    {
      id: 4,
      name: "Secure Medical",
      logo: "/placeholder.svg?height=60&width=60",
      premium: 80000,
      coverage: "Basic",
      claimRatio: 90,
      rating: 4.2,
      features: ["Hospitalization", "Emergency Care"],
    },
  ]

  return (
    <div className="bg-white min-h-screen dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              LifeLine – Get Medical Insurance
            </h2>
            <p className="text-gray-400 mt-1">Compare and choose from top insurance providers with ease.</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg flex items-center gap-2 transition-colors">
              <Zap className="h-4 w-4" />
              <span>Quick Estimate</span>
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search providers..."
                className="px-4 py-2 pl-10 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-900 rounded-xl border border-gray-800"
            >
              <div>
                <label className="text-sm text-gray-400 block mb-2">Premium Range</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">₹{premiumRange[0].toLocaleString()}</span>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="10000"
                    value={premiumRange[1]}
                    onChange={(e) => setPremiumRange([premiumRange[0], Number.parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-sm">₹{premiumRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Coverage Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["all", "basic", "standard", "comprehensive", "premium"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="coverage"
                        checked={coverageFilter === type}
                        onChange={() => setCoverageFilter(type)}
                        className="h-4 w-4 accent-blue-500"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Minimum Claim Ratio</label>
                <select className="w-full px-3 py-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          {insuranceProviders.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 dark:bg-gray-800 bg-white rounded-lg flex items-center justify-center">
                    <img src={provider.logo || "/placeholder.svg"} alt={provider.name} className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{provider.rating}</span>
                      <span className="text-sm text-gray-400 ml-2">Claim Ratio: {provider.claimRatio}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-400">Monthly Premium</span>
                    <p className="font-semibold text-lg">₹{provider.premium.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Coverage Type</span>
                    <p className="font-semibold">{provider.coverage}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Key Features</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {provider.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-blue-900/30 px-2 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                      {provider.features.length > 2 && (
                        <span className="text-xs dark:bg-gray-800 bg-white px-2 py-0.5 rounded">
                          +{provider.features.length - 2} more
                        </span>
                      )}
                    </div>
                    <div className="hidden group-hover:block mt-2 transition-all duration-300">
                      <div className="flex flex-wrap gap-1">
                        {provider.features.slice(2).map((feature, index) => (
                          <span key={index} className="text-xs bg-blue-900/30 px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
                    Details
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center gap-2">
                    <span>Select</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

