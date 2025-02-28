import React, { useState, useEffect } from 'react';
import { Save, X, RotateCcw } from 'lucide-react';

export function PatientForm({ patient, onSubmit, onCancel }) {
  // Initialize form with default values or patient data
  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      phone: ''
    },
    dob: '',
    gender: '',
    bloodType: '',
    allergy: '',
    surgery: '',
    medicalIssue: '',
    emergencyContact: ''
  });

  // Populate form with patient data when editing
  useEffect(() => {
    if (patient) {
      setFormData({
        user: {
          name: patient.user?.name || '',
          email: patient.user?.email || '',
          phone: patient.user?.phone || ''
        },
        dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : '',
        gender: patient.gender || '',
        bloodType: patient.bloodType || '',
        allergy: patient.allergy || '',
        surgery: patient.surgery || '',
        medicalIssue: patient.medicalIssue || '',
        emergencyContact: patient.emergencyContact || ''
      });
    }
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    if (patient) {
      setFormData({
        user: {
          name: patient.user?.name || '',
          email: patient.user?.email || '',
          phone: patient.user?.phone || ''
        },
        dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : '',
        gender: patient.gender || '',
        bloodType: patient.bloodType || '',
        allergy: patient.allergy || '',
        surgery: patient.surgery || '',
        medicalIssue: patient.medicalIssue || '',
        emergencyContact: patient.emergencyContact || ''
      });
    } else {
      setFormData({
        user: {
          name: '',
          email: '',
          phone: ''
        },
        dob: '',
        gender: '',
        bloodType: '',
        allergy: '',
        surgery: '',
        medicalIssue: '',
        emergencyContact: ''
      });
    }
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
              value={formData.user.name}
              onChange={(e) => setFormData({
                ...formData,
                user: { ...formData.user, name: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.user.email}
              onChange={(e) => setFormData({
                ...formData,
                user: { ...formData.user, email: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.user.phone}
              onChange={(e) => setFormData({
                ...formData,
                user: { ...formData.user, phone: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.dob}
              onChange={(e) => setFormData({
                ...formData,
                dob: e.target.value
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.gender}
              onChange={(e) => setFormData({
                ...formData,
                gender: e.target.value
              })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.bloodType}
              onChange={(e) => setFormData({
                ...formData,
                bloodType: e.target.value
              })}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.allergy}
              onChange={(e) => setFormData({
                ...formData,
                allergy: e.target.value
              })}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Surgery History</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.surgery}
              onChange={(e) => setFormData({
                ...formData,
                surgery: e.target.value
              })}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Issues</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.medicalIssue}
              onChange={(e) => setFormData({
                ...formData,
                medicalIssue: e.target.value
              })}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({
                ...formData,
                emergencyContact: e.target.value
              })}
              placeholder="Name: John Doe, Phone: 123-456-7890"
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