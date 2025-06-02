"use client"


import { useState, useEffect } from "react"
import { Save, X, RotateCcw } from "lucide-react"


export function PatientForm({ patient, onSubmit, onCancel }) {
  // Initialize form with default values or patient data
  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      phone: "",
    },
    dob: "",
    gender: "",
    bloodType: "",
    allergy: "",
    surgery: "",
    state: "",
    city: "",
    address: "",
    medicalIssue: "",
    emergencyContact: "",
    yearlyIncome: "",
    geneticDiseases: "",
    longTermMedication: "",
    hasSubsidy: "",
    subsidyType: "",
    subsidyDetails: "",
  })

  // Populate form with patient data when editing
  useEffect(() => {
    if (patient) {
      setFormData({
        user: {
          name: patient.user?.name || "",
          email: patient.user?.email || "",
          phone: patient.user?.phone || "",
        },
        dob: patient.dob ? new Date(patient.dob).toISOString().split("T")[0] : "",
        gender: patient.gender || "",
        bloodType: patient.bloodType || "",
        allergy: patient.allergy || "",
        surgery: patient.surgery || "",
        state: patient.state || "",
        city: patient.city || "",
        address: patient.address || "",
        medicalIssue: patient.medicalIssue || "",
        emergencyContact: patient.emergencyContact || "",
        yearlyIncome: patient.yearlyIncome ?? "",
        geneticDiseases: patient.geneticDiseases ?? "",
        longTermMedication: patient.longTermMedication ?? "",
        hasSubsidy: patient.hasSubsidy ?? "",
        subsidyType: patient.subsidyType ?? "",
        subsidyDetails: patient.subsidyDetails ?? "",
      })
    }
  }, [patient])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    console.log("Form submitted with data:", formData)
  }

  const handleReset = () => {
    if (patient) {
      setFormData({
        user: {
          name: patient.user?.name || "",
          email: patient.user?.email || "",
          phone: patient.user?.phone || "",
        },
        dob: patient.dob ? new Date(patient.dob).toISOString().split("T")[0] : "",
        gender: patient.gender || "",
        bloodType: patient.bloodType || "",
        allergy: patient.allergy || "",
        surgery: patient.surgery || "",
        state: patient.state || "",
        city: patient.city || "",
        address: patient.address || "",
        medicalIssue: patient.medicalIssue || "",
        emergencyContact: patient.emergencyContact || "",
        yearlyIncome: patient.yearlyIncome ?? "",
        geneticDiseases: patient.geneticDiseases ?? "",
        longTermMedication: patient.longTermMedication ?? "",
        hasSubsidy: patient.hasSubsidy ?? "",
        subsidyType: patient.subsidyType ?? "",
        subsidyDetails: patient.subsidyDetails ?? "",
      })
    } else {
      setFormData({
        user: {
          name: "",
          email: "",
          phone: "",
        },
        dob: "",
        gender: "",
        bloodType: "",
        allergy: "",
        surgery: "",
        state: "",
        city: "",
        address: "",
        medicalIssue: "",
        emergencyContact: "",
        yearlyIncome: "",
        geneticDiseases: "",
        longTermMedication: "",
        hasSubsidy: "",
        subsidyType: "",
        subsidyDetails: "",
      })
    }
  }

  const handleSubsidyChange = (value) => {
    setFormData({
      ...formData,
      hasSubsidy: value,
      // Reset subsidy details if "No" is selected
      subsidyType: value === "No" ? "" : formData.subsidyType,
      subsidyDetails: value === "No" ? "" : formData.subsidyDetails,
    })
  }

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-lg">
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.user.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user: { ...formData.user, name: e.target.value },
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.user.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user: { ...formData.user, email: e.target.value },
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.user.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  user: { ...formData.user, phone: e.target.value },
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.dob}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dob: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value,
                })
              }
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Yearly Income</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.yearlyIncome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearlyIncome: e.target.value,
                })
              }
              placeholder="e.g. 50000"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
              required
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Full Address</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              rows={3}
              placeholder="Enter your complete address"
              required
            />
          </div>
        </div>
      </div>

      {/* Medical Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Medical Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.bloodType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bloodType: e.target.value,
                })
              }
            >
              <option value="">Select Blood Type</option>
              <option value="A_POSITIVE">A+</option>
              <option value="A_NEGATIVE">A-</option>
              <option value="B_POSITIVE">B+</option>
              <option value="B_NEGATIVE">B-</option>
              <option value="O_POSITIVE">O+</option>
              <option value="O_NEGATIVE">O-</option>
              <option value="AB_POSITIVE">AB+</option>
              <option value="AB_NEGATIVE">AB-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.allergy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allergy: e.target.value,
                })
              }
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Surgery History</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.surgery}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  surgery: e.target.value,
                })
              }
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Issues</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.medicalIssue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medicalIssue: e.target.value,
                })
              }
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.emergencyContact}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact: e.target.value,
                })
              }
              placeholder="Name: John Doe, Phone: 123-456-7890"
            />
          </div>
        </div>
      </div>

      {/* Additional Medical Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Additional Medical Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Genetic Diseases</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.geneticDiseases}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  geneticDiseases: e.target.value,
                })
              }
              rows={3}
              placeholder="List any hereditary or genetic conditions"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Long-term Medication</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              value={formData.longTermMedication}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longTermMedication: e.target.value,
                })
              }
              rows={3}
              placeholder="List medications with dosage and frequency"
            />
          </div>
        </div>
      </div>

      {/* Subsidy Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Healthcare Subsidy Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you have any healthcare subsidy?</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="subsidy-yes"
                  name="hasSubsidy"
                  type="radio"
                  value="Yes"
                  checked={formData.hasSubsidy === "Yes"}
                  onChange={(e) => handleSubsidyChange(e.target.value)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="subsidy-yes" className="ml-3 block text-sm font-medium text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="subsidy-no"
                  name="hasSubsidy"
                  type="radio"
                  value="No"
                  checked={formData.hasSubsidy === "No"}
                  onChange={(e) => handleSubsidyChange(e.target.value)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="subsidy-no" className="ml-3 block text-sm font-medium text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Conditional Subsidy Details */}
          {formData.hasSubsidy === "Yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subsidy Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                  value={formData.subsidyType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subsidyType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Subsidy Type</option>
                  <option value="Ayushman Bharat">Ayushman Bharat (PM-JAY)</option>
                  <option value="CGHS">Central Government Health Scheme (CGHS)</option>
                  <option value="ESIC">Employee State Insurance Corporation (ESIC)</option>
                  <option value="State Health Insurance">State Health Insurance Scheme</option>
                  <option value="Rashtriya Swasthya Bima Yojana">Rashtriya Swasthya Bima Yojana (RSBY)</option>
                  <option value="Ex-Servicemen Contributory Health Scheme">
                    Ex-Servicemen Contributory Health Scheme (ECHS)
                  </option>
                  <option value="Railway Health Service">Railway Health Service</option>
                  <option value="Other Government Scheme">Other Government Scheme</option>
                  <option value="Private Insurance">Private Health Insurance</option>
                  <option value="Corporate Insurance">Corporate Health Insurance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subsidy Details</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                  value={formData.subsidyDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subsidyDetails: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Enter card number, policy details, or other relevant information"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Panel */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
      </div>
    </form>
  )
}
