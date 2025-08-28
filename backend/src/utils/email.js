import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  // port: Number(process.env.SMTP_PORT) || 465,
  // secure: true, // Secure for 465, otherwise false
  service:"Gmail",
  auth: {
    user: process.env.EMAIL_USER || 'sameerbalti704@gmail.com',
    pass: process.env.EMAIL_PASS || 'pcue iygv zngk etou',
  },
});


// 📌 Email Template
const generateEmailTemplate = (bookings, isAdmin = false) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
        <div style="background: orange; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">${isAdmin ? "Booking Confirmation Detail!": "Your Booking Done!"}</h1>
          <p style="margin: 5px 0;">${isAdmin ? "Customer details are mentioned below. Go to dashboard to confirm this Booking": "Thank you for choosing us"}</p>
        </div>

        <div style="padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">${isAdmin ? "Customer Details" : "Your Details"}</h2>
          <p><strong>Custemer Name:</strong> ${bookings.customerName}</p>
          <p><strong>Custemer Email:</strong> ${bookings.customerEmail}</p>
          <p><strong>Custemer Phone:</strong> ${bookings.phoneNumber}</p>
          <p><strong>Pickup:</strong> ${bookings.pickupLocation} — ${
          bookings.pickupDate
        } ${bookings.pickupTime}</p>
          <p><strong>Drop-off:</strong> ${bookings.dropoffLocation} — ${
          bookings.dropoffDate
        } ${bookings.dropoffTime}</p>
          <p><strong>Special Requirements:</strong> ${
            bookings.specialRequirements || "None"
          }</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${isAdmin ? "Car Details": "Your Booked Car Details"}</h2>
          <p><strong>Car Name:</strong> ${bookings.carName}</p>
          <p><strong>Car Model:</strong> ${bookings.carModel}</p>
          <p><strong>Price per Day:</strong> $${bookings.pricePerDay}</p>

          <div style="margin-top: 30px; padding: 15px; background: orange; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Go to your dashboard and confirm booking: 
            </p>
          </div>
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Your bookings status is now: 
              <span style="color: ${
                bookings.status === "Confirmed" ? "green" : "orange"
              }; font-weight: bold;">
                ${bookings.status}
              </span>
            </p>
          </div>
        </div>

        <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
          &copy; ${new Date().getFullYear()} Northscape Tours and Travels. All rights reserved.
        </div>
      </div>
      `;
};

// 📌 Send Booking Emails
export const sendBookingEmails = async (booking) => {
  try {
    // ✅ Send Email to Client
    const clientMail = await transporter.sendMail({
      from: `"NORTHSCAPE TOURS AND TRAVELS" <${process.env.EMAIL_USER} || 'sameerbalti704@gmail.com'>`,
      to: booking.customerEmail,
      subject: `Booking Confirmation - ${booking.carName}`,
      html: generateEmailTemplate(booking, false),
    });
    console.log(`📧 Cleint Booking confirmation email sent to ${booking.customerEmail}:`, clientMail.messageId);

    // ✅ Send Email to Admin
    const adminMail = await transporter.sendMail({
      from: `"Automated Notification" <${booking.customerEmail} || 'sameerbalti704@gmail.com'>`,
      to: process.env.USER_EMIAL || 'sameerbalti704@gmail.com',
      subject: `New Booking - ${booking.carName}`,
      html: generateEmailTemplate(booking, true),
    });
    console.log(`📧 Newbooking notification sent to admin at ${process.env.EMAIL_USER}:`, adminMail.messageId);

  } catch (error) {
    console.error('❌ Error sending emails:', error.message);
  }
};
