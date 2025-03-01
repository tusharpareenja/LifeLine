import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Syringe, 
  AlertCircle, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  Home,
  Activity,
  Pill as Pills,
  Thermometer,
  Dna,
  Clock,
  CalendarClock,
  Stethoscope
} from 'lucide-react';
import { chatSession } from '@/config/AiModel';

const MedicalRecord = ({user}) => {
  // State for managing the overview data
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setIsLoading(true);
      try {
        const BASIC_PROMPT = `Generate a 100-word medical overview for a patient with the following details:
        - Name: ${user.name}
        - Medications: Lisinopril 10mg daily, Albuterol inhaler as needed
        - Allergies: Penicillin (severe), Pollen (moderate)
        - Past Surgeries: Appendectomy (2015), Knee Arthroscopy (2018)`;
  
        const result = await chatSession.sendMessage(BASIC_PROMPT);
        
        // Ensure response is properly retrieved
        const Overview = result?.response?.text || "No response received";  
        
        console.log(Overview); // Now this should log properly
        setOverview(Overview); // Update state so it renders in the UI
      } catch (error) {
        console.error('Error generating overview:', error);
        setError('Failed to fetch medical overview.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOverview();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full width with container for content */}
      <div className="bg-blue-600 w-full text-white top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Lifeline Medical Record</h1>
          </div>
          <div className="text-sm">
            <p>Record ID: LF-2024-0001</p>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Overview Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Medical Overview
            </h2>
            {isLoading ? (
              <p className="text-gray-500">Loading overview...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-gray-700">{overview}</p>
            )}
          </div>
        </div>

        {/* Existing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date of Birth: {new Date(user.dob)?.toDateString()}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact: {user?.phone ?? "null"}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Email: {user?.user?.email}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Home className="w-4 h-4 mr-2" />
                    Address: 123 Medical Ave, Health City
                  </p>
                </div>
              </div>
            </div>

            {/* Current Medical Conditions */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Current Medical Conditions
                </h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Mild Asthma (Diagnosed 2010)</li>
                    <li>Seasonal Allergies</li>
                    <li>Hypertension (Controlled)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Known Allergies
                </h2>
                <div className="bg-red-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm mr-2">Severe</span>
                      <span>Penicillin - Anaphylactic reaction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm mr-2">Moderate</span>
                      <span>Pollen - Respiratory symptoms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">Mild</span>
                      <span>Shellfish - Skin rash</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Middle and Right Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Medications */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Pills className="w-5 h-5 mr-2" />
                  Current Medications
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Regular Medications */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Daily Medications
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-blue-700">Lisinopril 10mg</h4>
                            <p className="text-sm text-gray-600">For Hypertension</p>
                            <div className="mt-2 text-sm">
                              <p className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Once daily, morning
                              </p>
                              <p className="text-gray-500 mt-1">Take with or without food</p>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-blue-700">Vitamin D3 2000 IU</h4>
                            <p className="text-sm text-gray-600">Supplement</p>
                            <div className="mt-2 text-sm">
                              <p className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Once daily with breakfast
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* As Needed Medications */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <CalendarClock className="w-4 h-4 mr-2" />
                          As Needed Medications
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-blue-700">Albuterol Inhaler</h4>
                            <p className="text-sm text-gray-600">For Asthma Symptoms</p>
                            <div className="mt-2 text-sm">
                              <p className="flex items-center">
                                <Stethoscope className="w-3 h-3 mr-1" />
                                2 puffs as needed
                              </p>
                              <p className="text-gray-500 mt-1">Max 4 times daily</p>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-blue-700">Zyrtec 10mg</h4>
                            <p className="text-sm text-gray-600">For Seasonal Allergies</p>
                            <div className="mt-2 text-sm">
                              <p className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Once daily during allergy season
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                      <p className="text-sm text-yellow-800 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Last medication review: March 15, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Surgical History */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Syringe className="w-5 h-5 mr-2" />
                  Surgical History
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Appendectomy</h3>
                    <p className="text-sm text-gray-600">Date: March 2015</p>
                    <p className="text-sm text-gray-600">Hospital: Central Medical Center</p>
                    <p className="mt-2">Laparoscopic procedure with no complications</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">Knee Arthroscopy</h3>
                    <p className="text-sm text-gray-600">Date: June 2018</p>
                    <p className="text-sm text-gray-600">Hospital: Sports Medicine Institute</p>
                    <p className="mt-2">Meniscus repair, full recovery achieved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Family History */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Dna className="w-5 h-5 mr-2" />
                  Family Medical History
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold">Maternal Side</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Diabetes Type 2 (Grandmother)</li>
                      <li>Hypertension (Mother)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Paternal Side</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>Coronary Artery Disease (Father)</li>
                      <li>Asthma (Multiple relatives)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;