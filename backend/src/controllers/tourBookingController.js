import TourBooking from "../models/tourBookingModel.js";
import Tour from "../models/tourModel.js";
import nodemailer from "nodemailer";

//  * ===============================
//  * Update Booking Controller
//  * ===============================
export const updateBookingTour = async (req, res) => {
  try {
    // console.log("Update Tour API Endpoint Hit", req.body);
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

    const checkAvailaibility = await TourBooking.findById(id);
    if (!checkAvailaibility) {
      return res
        .status(404)
        .json({ success: false, message: "Tour Booking Not Found!" });
    }

    const existingTour = await TourBooking.findOne({
      tour: _id,
      availability: false,
      _id: { $ne: id },
    });
    if (existingTour) {
      return res.status(400).json({
        success: false,
        message: "Booking already exists for this tour",
      });
    }

    tourData.availability = status === true ? false : true;

    // console.log('tourData.availability :>> ', tourData.availability);
    const tour = await TourBooking.findByIdAndUpdate(
      id,
      { availability: tourData.availability },
      { new: true }
    );
    // console.log('tour :>> ', tour);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour Booking not found" });
    }

    const tourUpdate = await Tour.findByIdAndUpdate(
      _id,
      { availability: tourData.availability },
      { new: true }
    );
    // console.log('tourUpdate :>> ', tourUpdate);
    if (!tourUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    /**
     * =============== EMAIL CONFIG ===============
     */
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // Secure for 465, otherwise false
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
          <p><strong>First Name:</strong> ${tour.firstName}</p>
          <p><strong>Last Name:</strong> ${tour.lastName}</p>
          <p><strong>Custemer Email:</strong> ${tour.email}</p>
          <p><strong>Custemer Phone:</strong> ${tour.phone}</p>
          <p><strong>Tour Availability:</strong> ${
            tour.availability ? "Available" : "Not Available"
          }</p>
          <p><strong>No of Traveler:</strong> ${tour.travelers}</p>
          <p><strong>Tour Total Price:</strong> ${tour.totalPrice}</p>
          <p><strong>Selected Date:</strong> ${new Date(
            tour.selectedDate
          ).toDateString()}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${
            isAdmin ? "Tour Details" : "Your Booked Tour Details"
          }</h2>
          <p><strong>Tour Name:</strong> ${tourUpdate.name}</p>
          <p><strong>Country:</strong> ${tourUpdate.country}</p>
          <p><strong>Location:</strong> ${tourUpdate.category}</p>
          <p><strong>Catergory:</strong> ${tourUpdate.category}</p>
          <p><strong>Market Price:</strong> ${tourUpdate.price}</p>
          <p><strong>Original Price:</strong> ${tourUpdate.originalPrice}</p>
          <p><strong>Availability:</strong> ${
            tourUpdate.availability ? "Available" : "Not Available"
          }</p>
          <p><strong>Next Departure:</strong> ${
            new Date(tourUpdate.nextDeparture).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          }</p>          <div style="background: #f5f5f5; padding: 15px; text-align: center; border-top: 1px solid #ddd; color: #555;">
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
      </div>
      `;
    };

    const sendBookingEmails = async (booking) => {
      try {
        await transporter.sendMail({
          from: `"NORTHSCAPE TOURS AND TRAVELS" <${process.env.EMAIL_USER}>`,
          to: checkAvailaibility.email,
          subject: `Booking Confirmation - ${tourUpdate.name}`,
          html: generateEmailTemplate(false),
        });

        await transporter.sendMail({
          from: `"Automated Notification" <${process.env.EMAIL_USER}>`,
          // to: process.env.EMAIL_USER,
          to: process.env.NORTHSCAPE_EMAIL,
          subject: `New Booking - ${tourUpdate.name}`,
          html: generateEmailTemplate(true),
        });
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    await sendBookingEmails(tour);

    res.status(200).json({
      success: true,
      message: "Tour Booking updated successfully",
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

/**
 * ===============================
 * Create Booking Controller
 * ===============================
 */
export const createTourbooking = async (req, res) => {
  try {
    const {
      tourId,
      firstName,
      lastName,
      email,
      phone,
      totalPrice,
      availability,
    } = req.body;

    // console.log("req.body at create tour  :>> ", req.body);

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

    /**
     * =============== EMAIL HELPERS ===============
     */
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // Secure for 465, otherwise false
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const generateEmailTemplate = (isAdmin = false) => {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background: #ffffff;">
          <div style="background: orange; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0;">
              ${
                isAdmin
                  ? "Booking Confirmation Detail!"
                  : "Your Tour Booking Details!"
              }
            </h1>
            <p style="margin: 5px 0;">
              ${
                isAdmin
                  ? "Customer details are mentioned below. Go to dashboard to confirm this Booking"
                  : "Thank you for choosing us"
              }
            </p>
          </div>

          <div style="padding: 20px; color: #333;">
            <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">
              ${isAdmin ? "Customer Details" : "Your Tour Booking Details"}
            </h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Tour Availability:</strong> ${
              availability ? "Available" : "Booked"
            }</p>
            <p><strong>Tour Total Price:</strong> ${totalPrice}</p>

            <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">
              ${
                isAdmin
                  ? "Tour Booking Details"
                  : "You are Going to Book Tour Details"
              }
            </h2>
            <p><strong>Tour Name:</strong> ${existingTour.name}</p>
            <p><strong>Country:</strong> ${existingTour.country}</p>
            <p><strong>Location:</strong> ${existingTour.location}</p>
            <p><strong>Category:</strong> ${existingTour.category}</p>
            <p><strong>Market Price:</strong> ${existingTour.price}</p>
            <p><strong>Original Price:</strong> ${
              existingTour.originalPrice
            }</p>
            <p><strong>Availability:</strong> ${
              existingTour.availability ? "Available" : "Booked"
            }</p>
            <p><strong>Next Departure:</strong> ${
              existingTour.nextDeparture
            }</p>
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

    const sendBookingEmails = async (booking) => {
      try {
        // send to client
        await transporter.sendMail({
          from: `"NORTHSCAPE PAKISTAN TOURS AND TRAVELS" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Booking Confirmation - ${existingTour.name}`,
          html: generateEmailTemplate(false),
        });

        // send to admin
        await transporter.sendMail({
          from: `"Automated Notification" <${process.env.EMAIL_USER}>`,
          // to: process.env.EMAIL_USER,
          to: process.env.NORTHSCAPE_EMAIL,
          subject: `New Booking - ${existingTour.name}`,
          html: generateEmailTemplate(true),
        });
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    /**
     * =============== BOOKING CREATION ===============
     */
    const existingTourBooking = await TourBooking.findOne({ tour: tourId });
    // console.log('existingTourBooking', existingTourBooking)

    if (existingTourBooking) {
      if (existingTourBooking.availability === false) {
        return res.status(403).json({
          success: false,
          message: "Tour has already booked",
          existingTourBooking,
        });
      }
      if (existingTourBooking.availability === true) {
        const createSameBookings = await TourBooking.create({
          tour: tourId,
          firstName,
          lastName,
          email,
          phone,
          totalPrice,
          availability,
        });

        // console.log("createSameBookings", createSameBookings);
        await sendBookingEmails(createSameBookings);

        return res.status(201).json({
          success: true,
          message:
            "Tour already booked but not confirmed. We will contact you soon!",
          data: createSameBookings,
        });
      }
    }

    // fresh booking
    const tour = await TourBooking.create({
      tour: tourId,
      firstName,
      lastName,
      email,
      phone,
      totalPrice,
      availability,
    });

    // console.log("tour at create:>> ", tour);

    await sendBookingEmails(tour);

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
