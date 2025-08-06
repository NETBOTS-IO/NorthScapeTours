import Booking from "../models/bookingModel.js";
import Car from "../models/rentModel.js";
import nodemailer from "nodemailer";
import bookingsServices from "../services/bookingService.js";
// pcue iygv zngk etou

// --- API Handler ---
export default async function BookingHandler(req, res) {
  if (req.method === "POST") {
    try {
      const bookingData = req.body;
      const {carId} = bookingData;

      const IsCarBooked = await Booking.findOne({ carId});

      if(IsCarBooked){
        return res.status(403).json({success: false, message: "Car already booked", IsCarBooked})
      }
      // 1. Save booking to DB
      const bookings = await Booking.create(bookingData);

      // 1. Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 2. Email content
      const mailOptions = {
        from: `"${bookingData.customerName}" <${process.env.EMAIL_USER}>`, // Gmail will use your auth account
        replyTo: bookingData.customerEmail, // Owner can reply directly to customer
        to: process.env.EMAIL_USER, // Owner's email
        subject: `New Booking: ${bookingData.customerName}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
        <div style="background: orange; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Booking Confirmation Deatail!</h1>
          <p style="margin: 5px 0;">Thank you for choosing us</p>
        </div>

        <div style="padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Details</h2>
          <p><strong>Custemer Name:</strong> ${bookings.customerName}</p>
          <p><strong>Custemer Email:</strong> ${bookings.customerEmail}</p>
          <p><strong>Custemer Phone:</strong> ${bookings.phoneNumber}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Bookings Details</h2>
          <p><strong>Pickup:</strong> ${bookings.pickupLocation} — ${
          bookings.pickupDate
        } ${bookings.pickupTime}</p>
          <p><strong>Drop-off:</strong> ${bookings.dropoffLocation} — ${
          bookings.dropoffDate
        } ${bookings.dropoffTime}</p>
          <p><strong>Special Requirements:</strong> ${
            bookings.specialRequirements || "None"
          }</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Car Details</h2>
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
      `,
      };

      // 3. Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: "Booking created and email sent",
        bookings,
      });
    } catch (error) {
      console.error("Booking error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to create booking" });
    }
  }
}

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingsServices.getAllBookings(req.query);
    // const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};
export const getBooking = async (req, res) => {
  try {
    // const bookings = await bookingsServices.getAllBookings(req.query);
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};
export const deleteBooking = async (req, res) => {
  try {
    // const bookings = await bookingsServices.getAllBookings(req.query);
    const booking = await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Booking Deleted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message,
    });
  }
};
export const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const bookings = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!bookings.carId) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found in booking" });
    }

    const car_id = bookings.carId;

    const carUpdated = await Car.findByIdAndUpdate(
      car_id,
      { status },
      { new: true }
    );
    if (!bookings) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email content
    const mailOptions = {
      from: `"${bookings.customerName}" <${process.env.EMAIL_USER}>`, // Gmail will use your auth account
      replyTo: bookings.customerEmail, // Owner can reply directly to customer
      to: process.env.EMAIL_USER, // Owner's email
      subject: `Your Booking Done: ${bookings.customerName}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
        <div style="background: #4CAF50; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Booking Confirmed!</h1>
          <p style="margin: 5px 0;">Thank you for booking with us</p>
        </div>

        <div style="padding: 20px; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Details</h2>
          <p><strong>Name:</strong> ${bookings.customerName}</p>
          <p><strong>Email:</strong> ${bookings.customerEmail}</p>
          <p><strong>Phone:</strong> ${bookings.phoneNumber}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Bookings Details</h2>
          <p><strong>Pickup:</strong> ${bookings.pickupLocation} — ${
        bookings.pickupDate
      } ${bookings.pickupTime}</p>
          <p><strong>Drop-off:</strong> ${bookings.dropoffLocation} — ${
        bookings.dropoffDate
      } ${bookings.dropoffTime}</p>
          <p><strong>Special Requirements:</strong> ${
            bookings.specialRequirements || "None"
          }</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Car Details</h2>
          <p><strong>Car Name:</strong> ${bookings.carName}</p>
          <p><strong>Car Model:</strong> ${bookings.carModel}</p>
          <p><strong>Price per Day:</strong> $${bookings.pricePerDay}</p>

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

        <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
          &copy; ${new Date().getFullYear()} Northscape Tours and Travels. All rights reserved.
        </div>
      </div>
      `,
    };

    // 3. Send email
    transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Booking updated succesfully",
      bookings,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to update booking" });
  }
};
