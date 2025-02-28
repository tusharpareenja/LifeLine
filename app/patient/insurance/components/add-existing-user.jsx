"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Check, AlertCircle, X } from "lucide-react"

export function AddExistingInsurance() {
  const [formState, setFormState] = useState({
    policyNumber: "",
    insurerName: "",
    file: null,
    isUploading: false,
    isVerifying: false,
    isSuccess: false,
    error: "",
  })

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({
        ...formState,
        file: e.target.files[0],
        error: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formState.policyNumber || !formState.insurerName || !formState.file) {
      setFormState({
        ...formState,
        error: "Please fill all required fields and upload your insurance card.",
      })
      return
    }

    setFormState({ ...formState, isUploading: true, error: "" })

    setTimeout(() => {
      setFormState({ ...formState, isUploading: false, isVerifying: true })

      setTimeout(() => {
        setFormState({
          ...formState,
          isVerifying: false,
          isSuccess: true,
        })
      }, 2000)
    }, 2000)
  }

  const resetForm = () => {
    setFormState({
      policyNumber: "",
      insurerName: "",
      file: null,
      isUploading: false,
      isVerifying: false,
      isSuccess: false,
      error: "",
    })
  }

  return (
    <div className="dark:bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Add Existing Insurance
          </h2>
          <p className="text-gray-400 mt-1">Link your current insurance policy to your account</p>
        </div>

        {formState.isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark:bg-gray-900/60 bg-white backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center"
          >
            <div className="mx-auto w-16 h-16 dark:bg-green-500/20 bg-white rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Insurance Linked Successfully!</h3>
            <p className="text-gray-400 mb-6">
              Your insurance policy has been verified and linked to your account. You can view your coverage details
              anytime.
            </p>
            <div className="dark:bg-gray-900 bg-transparent rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-sm text-gray-400">Policy Number</p>
                  <p className="font-medium">{formState.policyNumber}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Insurance Provider</p>
                  <p className="font-medium">{formState.insurerName}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-medium text-green-400">Active</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Linked On</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Add Another Insurance
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            onSubmit={handleSubmit}
          >
            {formState.error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-400">{formState.error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, error: "" })}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Policy Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formState.policyNumber}
                  onChange={(e) => setFormState({ ...formState, policyNumber: e.target.value })}
                  placeholder="Enter your policy number"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Insurance Provider <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formState.insurerName}
                  onChange={(e) => setFormState({ ...formState, insurerName: e.target.value })}
                  placeholder="Enter your insurance provider"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Upload Insurance Card <span className="text-red-400">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  formState.file ? "border-purple-500/50 bg-purple-500/5" : "border-gray-700 hover:border-gray-600"
                }`}
              >
                {formState.file ? (
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Check className="h-6 w-6 text-purple-400" />
                    </div>
                    <p className="text-sm font-medium">{formState.file.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{(formState.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={() => setFormState({ ...formState, file: null })}
                      className="mt-3 text-sm text-purple-400 hover:text-purple-300"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center mb-4">
                      <Upload className="h-10 w-10 text-gray-500" />
                    </div>
                    <p className="text-gray-400 mb-2">Drag and drop your insurance card here</p>
                    <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                    <label className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer inline-block">
                      <span>Browse Files</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={formState.isUploading || formState.isVerifying}
                className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center gap-2 ${
                  formState.isUploading || formState.isVerifying ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {formState.isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : formState.isVerifying ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Link Insurance</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  )
}

