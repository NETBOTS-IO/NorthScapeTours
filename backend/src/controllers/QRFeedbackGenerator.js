// backend/src/controllers/QRFeedbackGenerator.js
import QRCode from "qrcode";

export const QRFeedbackGenerator = async (req, res) => {
  try {
    const feedbackUrl = "https://northscapepakistan.com/feedback";

    const qrDataUrl = await QRCode.toDataURL(feedbackUrl, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 800,
      margin: 2,
      color: {
        dark: "#f97316",
        light: "#ffffff",
      },
    });

    const base64 = qrDataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    // Set headers and send the image
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="northscape-feedback-qr.png"'
    );
    res.send(buffer);
  } catch (error) {
    console.error("QR generation failed:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
