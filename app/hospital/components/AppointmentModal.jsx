import React, { useEffect, useState } from 'react';
import { getDoctors } from '@/app/actions/doctors';
import { createAppointment } from '@/app/actions/appointments';

export function AppointmentModal({ patient, onClose }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const hospitalId = typeof window !== 'undefined' ? sessionStorage.getItem('hospitalId') : null;

  useEffect(() => {
    if (hospitalId) {
      getDoctors(hospitalId).then(res => {
        if (res.success && Array.isArray(res.data)) {
          setDoctors(res.data);
        } else {
          setDoctors([]);
        }
      });
    }
  }, [hospitalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createAppointment({
        patientId: patient.id,
        doctorId,
        hospitalId,
        appointmentDate: date,
        consultationType: 'IN_PERSON', // default, can be extended
      });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1500);
      }
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Appointment for {patient.user?.name || 'Patient'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Doctor</label>
            <select
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.user?.name || 'Doctor'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
          {success && <div className="text-green-600 text-sm mt-2">Appointment created!</div>}
        </form>
      </div>
    </div>
  );
}
