'use client'
import React, { useState } from 'react';
import { Menu, Home, Calendar, FileText, MessageSquare, Bell, Settings, LogOut, IndianRupee } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Menu className="w-6 h-6" />
      </button>
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full bg-blue-900 text-white w-64 
        transform transition-transform duration-200 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-blue-500">
          <span className="text-xl font-bold">LifeLine</span>
        </div>

        <nav className="mt-6">
          <ul>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/dashboard';
                  setIsOpen(false);
                }}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  // Redirect to Appointments
                  window.location.href = '/patient/appointments'; // Example redirect
                  setIsOpen(false);
                }}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <span>Appointments</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/medical-records';
                  setIsOpen(false);
                }}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Medical Records</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/consultation_medication';
                  setIsOpen(false);
                }}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                <span>Consultation & Medication</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/insurance'; 
                  setIsOpen(false);
                }}
              >
                <IndianRupee className="w-5 h-5 mr-3" />
                <span>Insurance</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/credit-scheme';
                  setIsOpen(false);
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>LifeLine Credit System</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/patient/microinsurance';
                  setIsOpen(false);
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Microinsurance</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/logout'; 
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
