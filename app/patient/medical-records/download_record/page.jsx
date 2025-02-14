'use client'
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfTemplate from "../components/PdfTemplate";

const MedicalRecord = () => {
  const recordRef = useRef(null);

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
        <PdfTemplate />
      </div>
      <button onClick={downloadPDF} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Download PDF
      </button>
    </div>
  );
};

export default MedicalRecord;
