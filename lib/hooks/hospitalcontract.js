import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HospitalRegistryABI from "../../artifacts/contracts/hospital.sol/HospitalManagement.json";

const CONTRACT_ADDRESS = "0x6E577A4527DF9E753DA6e91e0013aE00CCB4cB9a";

export const useHospitalRegistry = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, HospitalRegistryABI.abi, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.error("MetaMask is not installed");
      }
    };
    loadProvider();
  }, []);

  const addHospital = async (name, address, phone, totalBeds, availableBeds) => {
    try {
      const tx = await contract.addHospital(name, address, phone, totalBeds, availableBeds);
      await tx.wait();
      alert('Hospital added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add hospital.');
    }
  };

  const fetchHospitals = async () => {
    try {
      const count = await contract.getHospitalCount();
      const hospitalList = [];
      for (let i = 0; i < count; i++) {
        const hospital = await contract.hospitals(i);
        hospitalList.push(hospital);
      }
      setHospitals(hospitalList);
    } catch (error) {
      console.error(error);
    }
  };

  return { addHospital, fetchHospitals, hospitals };
};
