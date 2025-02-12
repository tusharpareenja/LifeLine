'use client'
import React from 'react';
import { PatientForm } from '../components/PatientForm';
import { PatientList } from '../components/PatientList';
import { Plus, Moon, Sun } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState();
  const [patients, setPatients] = React.useState([]);

  const handleSubmit = (data) => {
    if (selectedPatient) {
      setPatients(patients.map(p => p.id === selectedPatient.id ? { ...p, ...data } : p));
      toast.success('Patient updated successfully');
    } else {
      const newPatient = {
        ...data,
        id: Math.random().toString(36).substr(2, 9)
      };
      setPatients([...patients, newPatient]);
      toast.success('Patient added successfully');
    }
    setShowForm(false);
    setSelectedPatient(undefined);
  };

  const handleDelete = (patient) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patient.id));
      toast.success('Patient deleted successfully');
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleView = (patient) => {
    // Implement view functionality
    toast.success('Viewing patient details');
  };

  return (
    <div className={`min-h-screen text-black ${darkMode ? "dark" : ""}`}>
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Patient Management System</h1>
            <div className="flex items-center space-x-4">
      
              <button
                onClick={() => setShowForm(true)}
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
              setSelectedPatient(undefined);
            }}
          />
        ) : (
          <PatientList
            patients={patients}
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
