import React, { useState } from 'react';
import { Save, X, RotateCcw } from 'lucide-react';

export function PatientForm({ patient, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(patient || {
    personalInfo: {},
    medicalDetails: {},
    admissionDetails: {},
    insuranceDetails: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(patient || {
      personalInfo: {},
      medicalDetails: {},
      admissionDetails: {},
      insuranceDetails: {},
    });
  };

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.personalInfo?.fullName || ''}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, fullName: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.personalInfo?.dateOfBirth || ''}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.personalInfo?.gender || ''}
              onChange={(e) => setFormData({
                ...formData,
                personalInfo: { ...formData.personalInfo, gender: e.target.value }
              })}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medical Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Medical Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.medicalDetails?.weight || ''}
              onChange={(e) => setFormData({
                ...formData,
                medicalDetails: { ...formData.medicalDetails, weight: Number(e.target.value) }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.medicalDetails?.bloodPressure || ''}
              onChange={(e) => setFormData({
                ...formData,
                medicalDetails: { ...formData.medicalDetails, bloodPressure: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.medicalDetails?.allergies || ''}
              onChange={(e) => setFormData({
                ...formData,
                medicalDetails: { ...formData.medicalDetails, allergies: e.target.value }
              })}
            />
          </div>
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
  );
}
