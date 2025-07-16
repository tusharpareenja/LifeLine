import { clsx } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge"
import { EmailService } from "./mail";
import { getHospitals, getNearbyHospitals } from "@/app/actions/hospitals";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (emailData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await EmailService(emailData);

      if (!response) {
        throw new Error('Failed to send email');
      }

      setLoading(false);
      return { success: true, message: "Email sent succesfully !" };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  return { sendEmail, loading, error };
};

export function generatePassword(length) {
  // Define the character set for the password
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  // Generate the password
  for (let i = 0; i < length; i++) {
    // Pick a random character from the charset
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
export async function getBestHospitalId(latitude, longitude) {
  const hospitals = await getNearbyHospitals(latitude, longitude);
  console.log("hospitals", hospitals);
  const bestHospital = hospitals.sort((a, b) => b.distance - a.distance)[0];
  console.log("bestHospital", bestHospital);
  return bestHospital.id;
}

export default useSendEmail;

