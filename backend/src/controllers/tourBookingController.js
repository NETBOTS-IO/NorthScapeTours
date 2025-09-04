import TourBooking from "../models/tourBookingModel.js";
import Tour from "../models/tourModel.js";
import nodemailer from "nodemailer";

export const updateBookingTour = async (req, res) => {
  try {
    console.log("Update Tour API Endpoint Hit", req.body);
    const { status, _id } = req.body;
    const { id } = req.params;

    let tourData;
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (parseError) {
        console.log("Error in parsing JSON", parseError);
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format",
          error: parseError.message,
        });
      }
    } else {
      tourData = req.body;
    }
    console.log("status", status);
    console.log("tourData", tourData);

    const checkAvailaibility = await TourBooking.findById(id);
    console.log("checkAvailaibility", checkAvailaibility);

    if (!checkAvailaibility) {
      res
        .status(401)
        .json({ success: false, message: "Tour Booking Not Found!" });
    }

    const existingTour = await TourBooking.findOne({
      tour: _id,
    });
    if (existingTour) {
      return res.status(400).json({
        success: false,
        message: "Booking Already exist at this Tour",
      });
    }

    tourData.availability = status === true ? "false" : "true";

    console.log("tourData.availability after", tourData.availability);
    // Update the tour in MongoDB
    const tour = await TourBooking.findByIdAndUpdate(
      req.params.id,
      tourData,
      {
        new: true,
      }
    );
    console.log("tour", tour);

    if (!tour) {
      console.log("Tour Booking not found");
      return res
        .status(404)
        .json({ success: false, message: "Tour Booking not found" });
    }

    const tourUpdate = await Tour.findByIdAndUpdate(
      _id,
      {availability: tourData.availability},
      {
        new: true,
      }
    );
    // console.log("tour", tour);

    if (!tourUpdate) {
      console.log("Tour not found");
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      // port: Number(process.env.SMTP_PORT) || 465,
      // secure: true, // Secure for 465, otherwise false
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "sameerbalti704@gmail.com",
        pass: process.env.EMAIL_PASS || "pcue iygv zngk etou",
      },
    });

    // 📌 Email Template
    const generateEmailTemplate = (isAdmin = false) => {
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
          <p><strong>First Name:</strong> ${checkAvailaibility.firstName}</p>
          <p><strong>Last Name:</strong> ${checkAvailaibility.lastName}</p>
          <p><strong>Custemer Email:</strong> ${checkAvailaibility.email}</p>
          <p><strong>Custemer Phone:</strong> ${checkAvailaibility.phone}</p>
          <p><strong>Tour Availaibilty:</strong> ${
            checkAvailaibility.availability
          }</p>
          <p><strong>No of Traveler:</strong> ${
            checkAvailaibility.travelers
          }</p>
          <p><strong>Tour Total Price:</strong> ${
            checkAvailaibility.totalPrice
          }</p>
          <p><strong>Selected Date:</strong> ${new Date(
            checkAvailaibility.selectedDate
          ).toDateString()}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${
            isAdmin ? "Tour Details" : "Your Booked Tour Details"
          }</h2>
          <p><strong>Tour Name:</strong> ${tour.name}</p>
          <p><strong>Country:</strong> ${tour.country}</p>
          <p><strong>Location:</strong> ${tour.category}</p>
          <p><strong>Catergory:</strong> ${tour.category}</p>
          <p><strong>Market Price:</strong> ${tour.price}</p>
          <p><strong>Original Price:</strong> ${tour.originalPrice}</p>
          <p><strong>Avalaibility:</strong> $${tour.availability}</p>
          <p><strong>Next Departure:</strong> $${tour.nextDeparture}</p>

          <div style="margin-top: 30px; padding: 15px; background: orange; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Go to your dashboard and confirm booking: 
            </p>
          </div>
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Your bookings status is now: 
              <span style="color: ${
                tour.availability === true ? "green" : "orange"
              }; font-weight: bold;">
                ${tour.availability === true ? "Availaible" : "Limited"}
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
    const sendBookingEmails = async (booking) => {
      try {
        // ✅ Send Email to Client
        const clientMail = await transporter.sendMail({
          from: `"NORTHSCAPE TOURS AND TRAVELS" <${process.env.EMAIL_USER} || 'sameerbalti704@gmail.com'>`,
          to: checkAvailaibility.email,
          subject: `Booking Confirmation - ${tour.name}`,
          html: generateEmailTemplate(booking, false),
        });
        console.log(
          `📧 Cleint Booking confirmation email sent to ${checkAvailaibility.email}:`,
          clientMail.messageId
        );

        // ✅ Send Email to Admin
        const adminMail = await transporter.sendMail({
          from: `"Automated Notification" <${checkAvailaibility.email} || 'sameerbalti704@gmail.com'>`,
          to: process.env.USER_EMIAL || "sameerbalti704@gmail.com",
          subject: `New Booking - ${tour.name}`,
          html: generateEmailTemplate(booking, true),
        });
        console.log(
          `📧 Newbooking notification sent to admin at ${process.env.EMAIL_USER}:`,
          adminMail.messageId
        );
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    await sendBookingEmails(tour);

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Tour updated successfully",
      data: tour,
    });
  } catch (error) {
    console.log("Error in updating tour booking", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating tour booking",
      error: error.message,
    });
  }
};

export const createTourbooking = async (req, res) => {
  try {
    const {
      tourId,
      firstName,
      lastName,
      email,
      phone,
      selectedDate,
      totalPrice,
      travelers,
      availability,
    } = req.body;

    let tourData;
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (parseError) {
        console.log("Error in parsing JSON", parseError);
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format",
          error: parseError.message,
        });
      }
    } else {
      tourData = req.body;
    }

    const existingTour = await Tour.findById(tourId);
    if (!existingTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    const existingTourBooking = await TourBooking.findOne({ tour: tourId });
    if (existingTourBooking) {
      return res.status(400).json({
        success: false,
        message: "Booking already exists for this tour",
      });
    }
    // console.log("existingTour", existingTour);

    if (existingTour.availability === false) {
      return res
        .status(401)
        .json({ success: false, message: "Tour Already booked" });
    }

    const tour = await TourBooking.create({ tour: tourId, ...tourData });
    // console.log("tour", tour);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "sameerbalti704@gmail.com",
        pass: process.env.EMAIL_PASS || "pcue iygv zngk etou",
      },
    });

    // 📌 Email Template
    const generateEmailTemplate = (isAdmin = false) => {
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
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Custemer Email:</strong> ${email}</p>
          <p><strong>Custemer Phone:</strong> ${phone}</p>
          <p><strong>Tour Availaibilty:</strong> ${availability}</p>
          <p><strong>No of Traveler:</strong> ${travelers}</p>
          <p><strong>Tour Total Price:</strong> ${totalPrice}</p>
          <p><strong>Selected Date:</strong> ${new Date(
            selectedDate
          ).toDateString()}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${
            isAdmin ? "Tour Details" : "Your Booked Tour Details"
          }</h2>
          <p><strong>Tour Name:</strong> ${existingTour.name}</p>
          <p><strong>Country:</strong> ${existingTour.country}</p>
          <p><strong>Location:</strong> ${existingTour.category}</p>
          <p><strong>Catergory:</strong> ${existingTour.category}</p>
          <p><strong>Market Price:</strong> ${existingTour.price}</p>
          <p><strong>Original Price:</strong> ${existingTour.originalPrice}</p>
          <p><strong>Avalaibility:</strong> $${existingTour.availability}</p>
          <p><strong>Next Departure:</strong> $${existingTour.nextDeparture}</p>

          <div style="margin-top: 30px; padding: 15px; background: orange; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Go to your dashboard and confirm booking: 
            </p>
          </div>
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-left: 5px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px;">  Your bookings status is now: 
              <span style="color: ${
                existingTour.availability === true ? "green" : "orange"
              }; font-weight: bold;">
                ${existingTour.availability === true ? "Availaible" : "Limited"}
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
    const sendBookingEmails = async (booking) => {
      try {
        // ✅ Send Email to Client
        const clientMail = await transporter.sendMail({
          from: `"NORTHSCAPE TOURS AND TRAVELS" <${process.env.EMAIL_USER} || 'sameerbalti704@gmail.com'>`,
          to: email,
          subject: `Booking Confirmation - ${existingTour.name}`,
          html: generateEmailTemplate(booking, false),
        });
        console.log(
          `📧 Cleint Booking confirmation email sent to ${email}:`,
          clientMail.messageId
        );

        // ✅ Send Email to Admin
        const adminMail = await transporter.sendMail({
          from: `"Automated Notification" <${email} || 'sameerbalti704@gmail.com'>`,
          to: process.env.USER_EMIAL || "sameerbalti704@gmail.com",
          subject: `New Booking - ${existingTour.name}`,
          html: generateEmailTemplate(booking, true),
        });
        console.log(
          `📧 Newbooking notification sent to admin at ${process.env.EMAIL_USER}:`,
          adminMail.messageId
        );
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    await sendBookingEmails(existingTour);

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time

    res.json({
      success: true,
      message: "Tour Booking created and data emailed successfully",
      data: tour,
    });
  } catch (error) {
    console.log("Error in booking tour", error.message);
    res.status(500).json({
      success: false,
      message: "Error booking tour",
      error: error.message,
    });
  }
};

// get all tour bookings
export const getAllTourBookings = async (req, res) => {
  try {
    const bookings = await TourBooking.find()
      .populate("tour") // include tour details
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      message: "Tour Bookings fetched successfully",
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching tour bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
      error: error.message,
    });
  }
};

// DELETE /api/tour-bookings/:id
export const deleteTourBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await TourBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Tour booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tour booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting tour booking:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting tour booking",
    });
  }
};

export const getTourBookingById = async (req, res) => {
  try {
    const tour = await TourBooking.findById(req.params.id).populate("tour");
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour Booking not found",
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Tour Booking fetched successfully",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tour booking",
      error: error.message,
    });
  }
};