"use client"
import { useHospitalRegistry } from '@/lib/hooks/hospitalcontract';
import { useState } from 'react';

const AddHospitalForm = () => {
  const { addHospital } = useHospitalRegistry();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [totalBeds, setTotalBeds] = useState(0);
  const [icuBeds, setIcuBeds] = useState(0);
  const [ventilator, setVentilators] = useState(0);
  const [availableBeds, setAvailableBeds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHospital(name, address, phone, totalBeds, availableBeds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <div className='flex flex-col'>
        <label>Total Beds</label>
        <input type="number" placeholder="Total Beds" value={totalBeds} onChange={(e) => setTotalBeds(e.target.value)} required />
      </div>
      <div className='flex flex-col'>
      <label>Total ventilators</label>
      <input type="number" placeholder="Total ventilators" value={ventilator} onChange={(e) => setVentilators(e.target.value)} required />
      </div>
      <div className='flex flex-col'>
        <label>Total icu beds</label>
      <input type="number" placeholder="Total icu beds" value={icuBeds} onChange={(e) => setIcuBeds(e.target.value)} required />
      </div>
      <div className='flex flex-col'>
      <label>Available Beds</label>
      <input type="number" placeholder="Available Beds" value={availableBeds} onChange={(e) => setAvailableBeds(e.target.value)} required />
      </div>
      <button type="submit">Add Hospital</button>
    </form>
  );
};

export default AddHospitalForm;
