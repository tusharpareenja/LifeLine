"use client";
import React, { useState } from "react";
import { Building2, Activity, ArrowLeft, MapPin, Phone, Mail, Bed, User, Lock } from "lucide-react";
import { registerHospital } from "@/app/actions/hospitals";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import "maplibre-gl/dist/maplibre-gl.css";

const MapLibreMap = dynamic(() => import("@/app/HospitalRequestForm/MapLibreMap"), { ssr: false });

const initialFormData = {
  email: "",
  password: "",
  name: "",
  address: "",
  phone: "",
  totalBeds: 0,
  icuBeds: 0,
  ventilators: 0,
  contactName: "",
  latitude: null,
  longitude: null,
};

function HospitalRequestForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1); // Start with Step 1 for email and password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle number inputs
    if (["totalBeds", "icuBeds", "ventilators"].includes(name)) {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      // Validate email and password
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.password.trim()) newErrors.password = "Password is required";
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
    }

    if (currentStep === 2) {
      // Validate hospital information
      if (!formData.name.trim()) newErrors.name = "Hospital name is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!/^\+?[\d\s()-]{10,15}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
      if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    }    if (currentStep === 3) {
      // Validate capacity information
      if (formData.totalBeds <= 0) newErrors.totalBeds = "Total beds must be greater than 0";
      if (formData.icuBeds < 0) newErrors.icuBeds = "ICU beds cannot be negative";
      if (formData.icuBeds > formData.totalBeds) {
        newErrors.icuBeds = "ICU beds cannot exceed total beds";
      }
      if (formData.ventilators < 0) newErrors.ventilators = "Ventilators cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(step)) {
      setIsSubmitting(true);

      try {
        const res = await registerHospital(formData);
        if (res.success) {
          toast.success("Request submitted successfully");
          setIsSubmitted(true);
        } else {
          setErrors({ submit: res.error });
        }
      } catch (error) {
        setErrors({ submit: "An error occurred. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNewRequest = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Lifeline</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your hospital registration request has been submitted successfully. Our team will review your information and get back to you shortly.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Request ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <button
              onClick={handleNewRequest}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Lifeline</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-6">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Hospital Registration Request
            </h2>
            <p className="text-blue-600 mt-2">
              Complete the form below to request your hospital to be added to the Lifeline network.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-4">
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Email and Password */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Credentials</h3>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="admin@hospital.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="********"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Hospital Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Information</h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="General Hospital"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={async (e) => {
                        handleChange(e);
                        // Two-way sync: update map when address changes
                        // (MapLibreMap will handle this via props)
                      }}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.address ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="123 Main St, Cityville, CA 90001"
                    />
                  </div>
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pin Hospital Location on Map</label>
                    <div className="h-64 rounded-lg overflow-hidden border border-blue-200">
                      <MapLibreMap
                        latitude={formData.latitude}
                        longitude={formData.longitude}
                        address={formData.address}
                        onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                        onAddressChange={(addr) => setFormData((prev) => ({ ...prev, address: addr }))}
                      />
                    </div>
                    {formData.latitude && formData.longitude && (
                      <div className="text-xs text-gray-600 mt-2">Selected: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.contactName ? "border-red-300" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Capacity Information */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Capacity Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="totalBeds" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Beds*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Bed className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="totalBeds"
                        name="totalBeds"
                        min="0"
                        value={formData.totalBeds}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.totalBeds ? "border-red-300" : "border-gray-300"
                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.totalBeds && <p className="mt-1 text-sm text-red-600">{errors.totalBeds}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="icuBeds" className="block text-sm font-medium text-gray-700 mb-1">
                      ICU Beds
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Bed className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="icuBeds"
                        name="icuBeds"
                        min="0"
                        value={formData.icuBeds}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.icuBeds ? "border-red-300" : "border-gray-300"
                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.icuBeds && <p className="mt-1 text-sm text-red-600">{errors.icuBeds}</p>}
                  </div>

                  <div>
                    <label htmlFor="ventilators" className="block text-sm font-medium text-gray-700 mb-1">
                      Ventilators
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Activity className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="ventilators"
                        name="ventilators"
                        min="0"
                        value={formData.ventilators}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.ventilators ? "border-red-300" : "border-gray-300"
                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.ventilators && <p className="mt-1 text-sm text-red-600">{errors.ventilators}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Submit</h3>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Hospital Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Hospital Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{formData.contactName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{formData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Capacity Information</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Beds</p>
                      <p className="font-medium">{formData.totalBeds}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Beds</p>
                      <p className="font-medium">{formData.availableBeds}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ICU Beds</p>
                      <p className="font-medium">{formData.icuBeds}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ventilators</p>
                      <p className="font-medium">{formData.ventilators}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">
                    By submitting this form, you confirm that all the information provided is accurate and you are authorized to register this hospital with Lifeline.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// Missing Check icon import
function Check(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export default HospitalRequestForm;