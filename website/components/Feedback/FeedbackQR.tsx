"use client";

import { useEffect, useState } from "react";

export default function FeedbackQR() {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const BACKEND_URL = `${BaseUrl}/api/feedback-qr`;

  useEffect(() => {
    setQrUrl(BACKEND_URL);
    setLoading(false);
  }, []);

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "northscape-feedback-qr.png";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download QR:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Scan to Leave Feedback
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading QR...</p>
      ) : qrUrl ? (
        <>
          <img
            src={qrUrl}
            alt="Feedback QR Code"
            className="w-56 h-56 border border-gray-300 p-2 rounded-md mb-3"
          />

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 text-white font-medium rounded-lg bg-orange-500 hover:bg-orange-400 transition-all"
          >
            📥 Download QR Code
          </button>
        </>
      ) : (
        <p className="text-red-500">QR not available</p>
      )}

      <p className="mt-4 text-sm text-gray-600 text-center">
        Scan with your phone camera to quickly access our feedback form.
      </p>
    </div>
  );
}
