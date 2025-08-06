import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // Secure for 465, otherwise false
  auth: {
    user: process.env.SMTP_USER || 'mountaintravel@netbots.io',
    pass: process.env.SMTP_PASS || 'MountainTravel@110',
  },
});


// 📌 Email Template
const generateEmailTemplate = (booking, isAdmin = false) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #007bff;">${isAdmin ? 'New Booking Notification' : 'Booking Confirmation'}</h2>
      <p>${isAdmin ? 'A new booking has been made through the website.' : `Dear <strong>${booking.name}</strong>, Thank you for booking with Eco Tourism Services.`}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Tour Package:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.tourPackage.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Participants:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.participants}</td>
        </tr>
           <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.message}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Booking Date:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.timestamp).toDateString()}</td>
        </tr>
      </table>
      
      <p>${isAdmin ? 'Please review the booking in the Dashboard.' : 'If you have any questions, contact us at <a href="mailto:info@mountaintravels.com">info@mountaintravels.com</a>.'}</p>
      
      <p style="margin-top: 20px;"><strong>Mountain Travels</strong></p>
    </div>
  `;
};

// 📌 Send Booking Emails
export const sendBookingEmails = async (booking) => {
  try {
    // ✅ Send Email to Client
    const clientMail = await transporter.sendMail({
      from: `"Mountain Travels" <${process.env.SMTP_USER}|| 'mountaintravel@netbots.io'>`,
      to: booking.email,
      subject: `Booking Confirmation - ${booking.tourPackage.name}`,
      html: generateEmailTemplate(booking, false),
    });
    console.log(`📧 Booking confirmation email sent to ${booking.email}:`, clientMail.messageId);

    // ✅ Send Email to Admin
    const adminMail = await transporter.sendMail({
      from: `"Automated Notification" <${process.env.SMTP_USER} || 'mountaintravel@netbots.io'>`,
      to: process.env.ADMIN_EMAIL || 'mtntravelspk@gmail.com',
      subject: `New Booking - ${booking.tourPackage.name}`,
      html: generateEmailTemplate(booking, true),
    });
    console.log(`📧 New booking notification sent to admin at ${process.env.ADMIN_EMAIL}:`, adminMail.messageId);

  } catch (error) {
    console.error('❌ Error sending emails:', error.message);
  }
};
