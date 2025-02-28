"use client"
import React, { useState } from 'react';

import { Check, X, Info, Building2, Users, Bed, Activity, Phone, MapPin, Calendar } from 'lucide-react';

// Define the combined type for hospitals with user data and approval status


function App() {
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleApprove = (id) => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === id ? { ...hospital, approved: true, pending: false } : hospital
    ));
  };

  const handleReject = (id) => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === id ? { ...hospital, approved: false, pending: false } : hospital
    ));
  };

  const handleShowDetails = (hospital) => {
    setSelectedHospital(hospital);
    setShowDetailModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailModal(false);
    // Only clear the selected hospital after animation would complete
    setTimeout(() => setSelectedHospital(null), 200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Lifeline Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Admin Dashboard</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Hospital Approval Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Review and manage hospital requests to join the Lifeline network.
          </p>

          {/* Hospital List */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {hospitals.map((hospital) => (
                  <tr 
                    key={hospital.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{hospital.name}</div>
                          <div className="text-sm text-gray-500">{hospital.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{hospital.phone}</div>
                      <div className="text-sm text-gray-500">{hospital.user.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">{hospital.availableBeds}</span>/{hospital.totalBeds} beds
                      </div>
                      <div className="text-sm text-gray-500">
                        {hospital.icuBeds} ICU, {hospital.ventilators} ventilators
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {hospital.pending ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      ) : hospital.approved ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {hospital.pending && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(hospital.id)}
                            className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            title="Approve"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(hospital.id)}
                            className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            title="Reject"
                          >
                            <X className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleShowDetails(hospital)}
                            className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            title="View Details"
                          >
                            <Info className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                      {!hospital.pending && (
                        <button
                          onClick={() => handleShowDetails(hospital)}
                          className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="View Details"
                        >
                          <Info className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hospital Detail Modal */}
        {showDetailModal && selectedHospital && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedHospital.name}</h3>
                <button 
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Building2 className="h-4 w-4 mr-2" /> Hospital Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" /> 
                      {selectedHospital.address}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" /> 
                      {selectedHospital.phone}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" /> 
                      Joined: {new Date(selectedHospital.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Account Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {selectedHospital.user.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">User ID:</span> {selectedHospital.userId}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Account Created:</span> {
                        selectedHospital.user.createdAt 
                          ? new Date(selectedHospital.user.createdAt).toLocaleDateString() 
                          : 'Not available'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Bed className="h-4 w-4 mr-2" /> Capacity Information
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-500 font-medium">Total Beds</div>
                      <div className="text-xl font-semibold text-blue-700">{selectedHospital.totalBeds}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-green-500 font-medium">Available Beds</div>
                      <div className="text-xl font-semibold text-green-700">{selectedHospital.availableBeds}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs text-purple-500 font-medium">ICU Beds</div>
                      <div className="text-xl font-semibold text-purple-700">{selectedHospital.icuBeds}</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="text-xs text-orange-500 font-medium">Ventilators</div>
                      <div className="text-xl font-semibold text-orange-700">{selectedHospital.ventilators}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {selectedHospital.pending && (
                  <>
                    <button 
                      onClick={() => {
                        handleReject(selectedHospital.id);
                        handleCloseDetails();
                      }}
                      className="px-4 py-2 bg-white border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Reject Request
                    </button>
                    <button 
                      onClick={() => {
                        handleApprove(selectedHospital.id);
                        handleCloseDetails();
                      }}
                      className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                    >
                      Approve Request
                    </button>
                  </>
                )}
                {!selectedHospital.pending && (
                  <button 
                    onClick={handleCloseDetails}
                    className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Mock data for demonstration
const mockHospitals = [
  {
    id: "1",
    userId: "user1",
    name: "City General Hospital",
    address: "123 Main St, Cityville, CA 90001",
    phone: "+1 (555) 123-4567",
    totalBeds: 200,
    availableBeds: 45,
    icuBeds: 20,
    ventilators: 15,
    createdAt: "2023-01-15T08:30:00Z",
    pending: true,
    approved: false,
    user: {
      id: "user1",
      name: "City General Admin",
      email: "admin@citygeneral.com",
      password: "hashed_password",
      role: "HOSPITAL",
      createdAt: "2023-01-10T10:00:00Z"
    }
  },
  {
    id: "2",
    userId: "user2",
    name: "Memorial Medical Center",
    address: "456 Oak Ave, Townsville, CA 90002",
    phone: "+1 (555) 987-6543",
    totalBeds: 350,
    availableBeds: 120,
    icuBeds: 40,
    ventilators: 30,
    createdAt: "2023-02-20T14:15:00Z",
    pending: true,
    approved: false,
    user: {
      id: "user2",
      name: "Memorial Admin",
      email: "admin@memorialmed.com",
      password: "hashed_password",
      role: "HOSPITAL",
      createdAt: "2023-02-15T09:30:00Z"
    }
  },
  {
    id: "3",
    userId: "user3",
    name: "Riverside Healthcare",
    address: "789 River Rd, Riverside, CA 90003",
    phone: "+1 (555) 456-7890",
    totalBeds: 150,
    availableBeds: 30,
    icuBeds: 15,
    ventilators: 10,
    createdAt: "2023-03-10T11:45:00Z",
    pending: false,
    approved: true,
    user: {
      id: "user3",
      name: "Riverside Admin",
      email: "admin@riverside.com",
      password: "hashed_password",
      role: "HOSPITAL",
      createdAt: "2023-03-05T13:20:00Z"
    }
  },
  {
    id: "4",
    userId: "user4",
    name: "Lakeside Medical Center",
    address: "321 Lake Blvd, Laketown, CA 90004",
    phone: "+1 (555) 789-0123",
    totalBeds: 250,
    availableBeds: 75,
    icuBeds: 25,
    ventilators: 20,
    createdAt: "2023-04-05T16:30:00Z",
    pending: false,
    approved: true,
    user: {
      id: "user4",
      name: "Lakeside Admin",
      email: "admin@lakesidemed.com",
      password: "hashed_password",
      role: "HOSPITAL",
      createdAt: "2023-04-01T10:45:00Z"
    }
  },
  {
    id: "5",
    userId: "user5",
    name: "Valley Community Hospital",
    address: "567 Valley Way, Valleytown, CA 90005",
    phone: "+1 (555) 234-5678",
    totalBeds: 180,
    availableBeds: 50,
    icuBeds: 18,
    ventilators: 12,
    createdAt: "2023-05-12T09:15:00Z",
    pending: true,
    approved: false,
    user: {
      id: "user5",
      name: "Valley Admin",
      email: "admin@valleyhosp.com",
      password: "hashed_password",
      role: "HOSPITAL",
      createdAt: "2023-05-10T08:00:00Z"
    }
  }
];

export default App;