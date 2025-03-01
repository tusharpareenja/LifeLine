'use client'
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfTemplate from "../components/PdfTemplate";
import { useSession } from "next-auth/react";
import { getPatientById } from "@/app/actions/patients"

const MedicalRecord = () => {
  const recordRef = useRef(null);
  const [user, setPatientData] = useState({});
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientId = sessionStorage.getItem("patientId");
        console.log("Fetching patient details with ID:", patientId);
        
        const response = await getPatientById(patientId);
        console.log("Patient data structure:", JSON.stringify(response, null, 2));
        
        if (response && response.success && response.data) {
          setPatientData(response.data);
        } else {
          console.error("Failed to fetch patient data or invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    
    fetchPatientDetails();
  }, []);

  const downloadPDF = () => {
    const input = recordRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Medical_Record.pdf");
    });
  };

  return (
    <div>
      <div ref={recordRef} className="p-4 bg-white shadow-md">
        <PdfTemplate user={user} />
      </div>
      <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Download PDF
      </button>
    </div>
  );
};

export default MedicalRecord;
