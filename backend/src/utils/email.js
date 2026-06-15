import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


// console.log('process.env.NORTHSCAPE_EMAIL', process.env.NORTHSCAPE_EMAIL)

// ✅ Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // Secure for 465, otherwise false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// console.log(' process.env.EMAIL_USER',  process.env.EMAIL_USER)
// console.log(' process.env.EMAIL_PASS',  process.env.EMAIL_PASS)

// 📌 Email Template
const generateEmailTemplate = (bookings, isAdmin = false) => {
  const pickupDate = new Date(bookings.pickupDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const dropoffDate = new Date(bookings.dropoffDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    return new Date(0, 0, 0, Number(hours), Number(minutes))
      .toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  };

  const pickupTime = formatTime(bookings.pickupTime);
  const dropoffTime = formatTime(bookings.dropoffTime);

  return `
    <div style="padding: 20px; color: #333;">
      <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">
        ${isAdmin ? "Customer Details" : "Your Details"}
      </h2>

      <p><strong>Customer Name:</strong> ${bookings.customerName}</p>
      <p><strong>Customer Email:</strong> ${bookings.customerEmail}</p>
      <p><strong>Customer Phone:</strong> ${bookings.phoneNumber}</p>

      <p>
        <strong>Pickup:</strong>
        ${bookings.pickupLocation} — ${pickupDate} ${pickupTime}
      </p>

      <p>
        <strong>Drop-off:</strong>
        ${bookings.dropoffLocation} — ${dropoffDate} ${dropoffTime}
      </p>

      <p>
        <strong>Special Requirements:</strong>
        ${bookings.specialRequirements || "None"}
      </p>

      <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">
        ${isAdmin ? "Car Details" : "Your Booked Car Details"}
      </h2>

      <p><strong>Car Name:</strong> ${bookings.carName}</p>
      <p><strong>Car Model:</strong> ${bookings.carModel}</p>
      <p><strong>Price per Day:</strong> $${bookings.pricePerDay}</p>

      ${
        isAdmin
          ? `
        <div style="margin-top: 30px; padding: 15px; background: orange; border-left: 5px solid #4CAF50;">
          <p style="margin: 0; font-size: 14px;">
            Go to your dashboard and confirm booking:
          </p>
        </div>
      `
          : ""
      }

      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 5px solid #4CAF50;">
        <p style="margin: 0; font-size: 14px;">
          Your booking status is now:
          <span style="color: ${
            bookings.status === "Confirmed" ? "green" : "orange"
          }; font-weight: bold;">
            ${bookings.status}
          </span>
        </p>
      </div>
    </div>
  `;
};

// 📌 Send Booking Emails
export const sendBookingEmails = async (booking) => {
  try {
    // ✅ Send Email to Client
    const clientMail = await transporter.sendMail({
      from: `"NORTHSCAPE PAKISTAN TOURS AND TRAVELS" <${process.env.EMAIL_USER}>`,
      // from: `"NORTHSCAPE PAKISTAN TOURS AND TRAVELS" <info@northscapepakistan.com>`,
      to: booking.customerEmail,
      subject: `Booking Confirmation - ${booking.carName}`,
      html: generateEmailTemplate(booking, false),
    });
    // console.log(
    //   `📧 Cleint Booking confirmation email sent to ${booking.customerEmail}:`,
    //   clientMail.messageId
    // );

    // ✅ Send Email to Admin
    const adminMail = await transporter.sendMail({
      from: `"Automated Notification" <${process.env.EMAIL_USER}>`,
      to: process.env.NORTHSCAPE_EMAIL,
      // to: "<info@northscapepakistan.com>",
      subject: `New Booking - ${booking.carName}`,
      html: generateEmailTemplate(booking, true),
    });
    // console.log(
    //   `📧 New booking notification sent to admin at ${process.env.EMAIL_USER}:`,
    //   adminMail.messageId
    // );
  } catch (error) {
    console.error("❌ Error sending emails:", error.message);
  }
};
