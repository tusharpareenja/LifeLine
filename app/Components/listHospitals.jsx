"use client"
import { useHospitalRegistry } from '@/lib/hooks/hospitalcontract';
import { useEffect } from 'react';

const HospitalList = () => {
  const { hospitals, fetchHospitals } = useHospitalRegistry();

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div>
      <h2>Hospitals</h2>
      <ul>
        {hospitals.map((hospital, index) => (
          <li key={index}>
            <h3>{hospital.name}</h3>
            <p>Address: {hospital.location}</p>
            <p>Phone: {hospital.phone}</p>
            <p>Total Beds: {hospital.totalBeds.toString()}</p>
            <p>Available Beds: {hospital.availableBeds.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
