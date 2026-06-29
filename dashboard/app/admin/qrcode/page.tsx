"use client";

import { jsPDF } from "jspdf";
import { BASE_URL } from "@/Var";

export default function FeedbackQR() {
  const downloadPDF = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/qr/feedback-qr`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch QR");
      }

      const blob = await response.blob();

      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = reader.result;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        pdf.setFontSize(22);
        pdf.text("Northscape Pakistan", 105, 20, {
          align: "center",
        });

        pdf.setFontSize(14);
        pdf.text("Scan to Leave Feedback", 105, 30, {
          align: "center",
        });

        pdf.addImage(imageData, "PNG", 40, 45, 130, 130);

        pdf.save("Northscape-Feedback-QR.pdf");
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border">
    
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 014-4h4M7 7h10M7 12h4m-4 5h2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
          </div>
    
          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800">
            Feedback QR Code
          </h1>
    
          <p className="text-gray-600 mt-4 leading-7">
            Generate and download a printable PDF containing the official
            Northscape Pakistan feedback QR code.
          </p>
    
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8 text-left">
            <h3 className="font-semibold text-blue-700 mb-2">
              Instructions
            </h3>
    
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Click the button below.</li>
              <li>The QR code PDF will be generated automatically.</li>
              <li>Print it or display it at your office or reception.</li>
              <li>Customers can scan it to submit their feedback instantly.</li>
            </ul>
          </div>
    
          <button
            onClick={downloadPDF}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            📄 Download Feedback QR PDF
          </button>
    
          <p className="text-xs text-gray-400 mt-6">
            Northscape Pakistan © {new Date().getFullYear()}
          </p>
    
        </div>
      </div>
    );
}