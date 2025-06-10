'use client'
import React, { useEffect, useState } from 'react';
import { PatientForm } from '../components/PatientForm';
import { PatientList } from '../components/PatientList';
import { Plus } from 'lucide-react';
import { createPatient, deletePatient, getPatients, updatePatient } from '@/app/actions/hospitals';
import { toast } from 'sonner';
import useSendEmail, { generatePassword } from '@/lib/utils';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const hospitalId = sessionStorage.getItem("hospitalId");
  const { sendEmail } = useSendEmail();

  const handleSubmit = async (data) => {
    const password = generatePassword(8);
    const newData = { ...data, password };
    
    try {
      if (selectedPatient) {
        const result = await updatePatient(selectedPatient.id, data);
        if (result.success) {
          toast.success('Patient updated successfully');
          fetchPatients();
        } else {
          toast.error(result.error || 'Failed to update patient');
        }
      } else {
        const result = await createPatient({
          data : newData,
          hospitalId
        });
        if (result.success) {
          toast.success('Patient added successfully');
          console.log(result)
          await sendEmail({
            to: result.data.user.email,
            subject: 'Patient Account created succesfully !',
            text: `Your patient account has been created by ${result.data.hospital?.name}`,
            html: `<p>Your password is: <strong>${password}</strong></p>`
          })
          fetchPatients();
        } else {
          toast.error(result.error || 'Failed to add patient');
        }
      }
      setShowForm(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error submitting patient:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const handleDelete = async (patient) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        const result = await deletePatient(patient.id);
        if (result.success) {
          toast.success('Patient deleted successfully');
          fetchPatients();
        } else {
          toast.error(result.error || 'Failed to delete patient');
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleView = (patient) => {
    // You can implement view functionality here
    // For example, navigate to a patient detail page or show a modal
    toast.success(`Viewing details for ${patient.user?.name || 'patient'}`);
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const id = sessionStorage.getItem("hospitalId")
      const result = await getPatients(id);
      if (result.success) {
        setPatients(result.data);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Patient Management System</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedPatient(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <PatientForm
            patient={selectedPatient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedPatient(null);
            }}
          />
        ) : (
          <PatientList
            patients={patients}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </main>
    </div>
  );
}

export default App;