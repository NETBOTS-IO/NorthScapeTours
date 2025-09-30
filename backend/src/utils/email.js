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
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
        <div style="background: orange; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">${
            isAdmin ? "Booking Confirmation Detail!" : "Your Booking Done!"
          }</h1>
          <p style="margin: 5px 0;">${
            isAdmin
              ? "Customer details are mentioned below. Go to dashboard to confirm this Booking"
              : "Thank you for choosing us"
          }</p>
        </div>

        <div style="padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">${
            isAdmin ? "Customer Details" : "Your Details"
          }</h2>
          <p><strong>Customer Name:</strong> ${bookings.customerName}</p>
          <p><strong>Customer Email:</strong> ${bookings.customerEmail}</p>
          <p><strong>Customer Phone:</strong> ${bookings.phoneNumber}</p>
          <p><strong>Pickup:</strong> ${bookings.pickupLocation} — ${
    bookings.pickupDate
  } ${bookings.pickupTime}</p>
          <p><strong>Drop-off:</strong> ${bookings.dropoffLocation} — ${
    bookings.dropoffDate
  } ${bookings.dropoffTime}</p>
          <p><strong>Special Requirements:</strong> ${
            bookings.specialRequirements || "None"
          }</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${
            isAdmin ? "Car Details" : "Your Booked Car Details"
          }</h2>
          <p><strong>Car Name:</strong> ${bookings.carName}</p>
          <p><strong>Car Model:</strong> ${bookings.carModel}</p>
          <p><strong>Price per Day:</strong> $${bookings.pricePerDay}</p>

          ${
            isAdmin
              ? `
            <div style="margin-top: 30px; padding: 15px; background: orange; border-left: 5px solid #4CAF50;">
              <p style="margin: 0; font-size: 14px;">Go to your dashboard and confirm booking:</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">Your bookings status is now: 
              <span style="color: ${
                bookings.status === "Confirmed" ? "green" : "orange"
              }; font-weight: bold;">
                ${bookings.status}
              </span>
            </p>
          </div>
        </div>

       <div style="background: #f5f5f5; padding: 15px; text-align: center; border-top: 1px solid #ddd; color: #555;">
            ${
              isAdmin
                ? `<p style="margin: 0;">Please <a href="https://admin.northscapepakistan.com/login" style="color: orange; font-weight: bold; text-decoration: none;">login to your dashboard</a> to confirm this booking.</p>`
                : `<p style="margin: 0;">We look forward to your trip! If you have any questions, please <a href="https://northscapepakistan.com/contact" style="color: orange; font-weight: bold; text-decoration: none;">contact us</a>.</p>`
            }
          </div>
          <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
            <a style="color: blue" href="info@netbots.io">NetBots</a> Contact Us for software solutions.
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
