'use client'
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfTemplate from "../../components/PdfTemplate"
import { useSession } from "next-auth/react";
import { getPatientById } from "@/app/actions/patients"
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const MedicalRecord = ({ params }) => {
  // Unwrap params if it's a Promise (for future Next.js compatibility)
  const actualParams = typeof params?.then === "function" ? React.use(params) : params;
  const patientId = actualParams?.patientId;

  const recordRef = useRef(null);
  const [user, setPatientData] = useState({});
  const [qrOpen, setQrOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [autoDownloaded, setAutoDownloaded] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        console.log("Fetching patient details with ID from route param:", patientId);
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
    if (patientId) {
      fetchPatientDetails();
      setQrUrl(`${window.location.origin}/patient/medical-records/download_record/${patientId}`);
    }
  }, [patientId]);

  // Auto-download PDF when page is loaded directly (e.g., after scanning QR)
  useEffect(() => {
    if (user && user.id && !autoDownloaded) {
      // Only auto-download if not in an iframe or popup
      if (window.top === window.self) {
        setTimeout(() => {
          downloadPDF();
          setAutoDownloaded(true);
        }, 800); // Wait for DOM/render
      }
    }
    // eslint-disable-next-line
  }, [user]);

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
      {/* QR code at top center */}
      <div className="flex justify-center mb-4">
        <div className="cursor-pointer" onClick={() => setQrOpen(true)}>
          <QRCodeCanvas value={qrUrl} size={80} />
          <div className="text-xs text-center mt-1">Scan to view record</div>
        </div>
      </div>
      {/* QR code popup */}
      {qrOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setQrOpen(false)}>
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <QRCodeCanvas value={qrUrl} size={256} />
            <div className="mt-4 text-center break-all">{qrUrl}</div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setQrOpen(false)}>Close</button>
          </div>
        </div>
      )}
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
