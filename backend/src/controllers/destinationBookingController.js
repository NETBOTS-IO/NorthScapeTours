import DestinationBooking from "../models/destinationBookingModel.js";
import Destination from "../models/destinationsModel.js";
import nodemailer from "nodemailer";

//  * ===============================
//  * Update Booking Controller
//  * ===============================
export const updateBookingDestination = async (req, res) => {
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

    const checkAvailaibility = await DestinationBooking.findById(id);
    if (!checkAvailaibility) {
      return res
        .status(404)
        .json({ success: false, message: "Destination Booking Not Found!" });
    }

    const existingDestination = await DestinationBooking.findOne({
      destination: _id,
      availability: false,
      _id: { $ne: id },
    });
    // console.log('existingDestination :>> ', existingDestination);
    if (existingDestination) {
      return res.status(400).json({
        success: false,
        message: "Booking already exists for this tour",
      });
    }

    tourData.availability = status === true ? false : true;

    // console.log('tourData.availability :>> ', tourData.availability);
    const destination = await DestinationBooking.findByIdAndUpdate(
      id,
      { availability: tourData.availability },
      { new: true }
    );
    // console.log('destination :>> ', destination);
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination Booking not found" });
    }

    const tourUpdate = await Destination.findByIdAndUpdate(
      _id,
      { availability: tourData.availability },
      { new: true }
    );
    // console.log('tourUpdate :>> ', tourUpdate);
    if (!tourUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
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
            isAdmin
              ? "Destination Booking Confirmation Detail!"
              : "Your Destination Booking Done!"
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
          <p><strong>First Name:</strong> ${destination.firstName}</p>
          <p><strong>Last Name:</strong> ${destination.lastName}</p>
          <p><strong>Custemer Email:</strong> ${destination.email}</p>
          <p><strong>Custemer Phone:</strong> ${destination.phone}</p>
          <p><strong>destination Availability:</strong> ${
            destination.availability ? "Available" : "Not Available"
          }</p>
          <p><strong>No of Traveler:</strong> ${destination.travelers}</p>
          <p><strong>destination Total Price:</strong> ${
            destination.totalPrice
          }</p>
          <p><strong>Selected Date:</strong> ${new Date(
            destination.selectedDate
          ).toDateString()}</p>

          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">${
            isAdmin ? "destination Details" : "Your Booked destination Details"
          }</h2>
          <p><strong>Destination Name:</strong> ${tourUpdate.name}</p>
          <p><strong>Country:</strong> ${tourUpdate.country}</p>
          <p><strong>Location:</strong> ${tourUpdate.category}</p>
          <p><strong>Catergory:</strong> ${tourUpdate.category}</p>
          <p><strong>Market Price:</strong> ${tourUpdate.price}</p>
          <p><strong>Original Price:</strong> ${tourUpdate.originalPrice}</p>
          <p><strong>Availability:</strong> ${
            tourUpdate.availability ? "Available" : "Not Available"
          }</p>
          <p><strong>Next Departure:</strong> ${tourUpdate.nextDeparture}</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; border-top: 1px solid #ddd; color: #555;">
            ${
              isAdmin
                ? `<p style="margin: 0;">Please <a href="https://admin.northscapepakistan.com/login" style="color: orange; font-weight: bold; text-decoration: none;">login to your dashboard</a> to confirm this booking.</p>`
                : `<p style="margin: 0;">We look forward to your trip! If you have any questions, please <a href="http://northscapepakistan.com/contact" style="color: orange; font-weight: bold; text-decoration: none;">contact us</a>.</p>`
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
        // client
        await transporter.sendMail({
          from: `"NORTHSCAPE TOURS AND TRAVELS" <${
            process.env.EMAIL_USER || "no-reply@netbots.io"
          }>`,
          to: checkAvailaibility.email,
          subject: `Booking Confirmation - ${tourUpdate.name}`,
          html: generateEmailTemplate(false),
        });
        // admin
        await transporter.sendMail({
          from: `"Automated Notification" <${
            process.env.EMAIL_USER || "no-reply@netbots.io"
          }>`,
          to: process.env.USER_EMIAL || "no-reply@netbots.io",
          subject: `New Booking - ${tourUpdate.name}`,
          html: generateEmailTemplate(true),
        });
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    await sendBookingEmails(destination);

    res.status(200).json({
      success: true,
      message: `Destination Booking updated successfully`,
      data: destination,
    });
  } catch (error) {
    console.log("Error in updating Destination booking", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating Destination booking",
      error: error.message,
    });
  }
};

/**
 * ===============================
 * Create Booking Controller
 * ===============================
 */
export const createDestinationbooking = async (req, res) => {
  try {
    const {
      destinationId,
      firstName,
      lastName,
      email,
      phone,
      departureDate,
      requirements,
      price,
      travelers,
      availability,
    } = req.body;

    console.log("req.body at create  :>> ", req.body);

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

    const existingDestination = await Destination.findById(destinationId);
    if (!existingDestination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
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
                  ? "Destination Booking Confirmation Detail!"
                  : "Your Destination Booking Details!"
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
              ${
                isAdmin
                  ? "Customer Details"
                  : "Your Destination Booking Details"
              }
            </h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Tour Availability:</strong> ${
              availability ? "Available" : "Booked"
            }</p>
            <p><strong>No of Traveler:</strong> ${travelers}</p>
            <p><strong>Tour Total Price:</strong> ${price}</p>
            <p><strong>Departure Date:</strong> ${new Date(
              departureDate
            ).toDateString()}</p>

            <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">
              ${
                isAdmin
                  ? "Destination Booking Details"
                  : "You are Going to Book Destination Details"
              }
            </h2>
            <p><strong>Destination Name:</strong> ${
              existingDestination.name
            }</p>
            <p><strong>Country:</strong> ${existingDestination.country}</p>
            <p><strong>Location:</strong> ${existingDestination.location}</p>
            <p><strong>Category:</strong> ${existingDestination.category}</p>
            <p><strong>Market Price:</strong> ${existingDestination.price}</p>
            <p><strong>Original Price:</strong> ${
              existingDestination.originalPrice
            }</p>
            <p><strong>Availability:</strong> ${
              existingDestination.availability ? "Available" : "Booked"
            }</p>
            <p><strong>Next Departure:</strong> ${
              existingDestination.nextDeparture
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
          from: `"NORTHSCAPE TOURS AND TRAVELS" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Destination Booking Confirmation - ${existingDestination.name}`,
          html: generateEmailTemplate(false),
        });

        // send to admin
        await transporter.sendMail({
          from: `"Automated Notification" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `New Destination Booking - ${existingDestination.name}`,
          html: generateEmailTemplate(true),
        });
      } catch (error) {
        console.error("❌ Error sending emails:", error.message);
      }
    };

    /**
     * =============== BOOKING CREATION ===============
     */
    const existingDestinationBooking = await DestinationBooking.findOne({
      destination: destinationId,
    });

    if (existingDestinationBooking) {
      if (existingDestinationBooking.availability === false) {
        return res.status(403).json({
          success: false,
          message: "Destination has already booked",
          existingDestinationBooking,
        });
      }
      if (existingDestinationBooking.availability === true) {
        const createSameBookings = await DestinationBooking.create({
          destination: destinationId,
          firstName,
          lastName,
          email,
          phone,
          departureDate,
          requirements,
          totalPrice: price,
          travelers,
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
    const destination = await DestinationBooking.create({
      destination: destinationId,
      firstName,
      lastName,
      email,
      phone,
      departureDate,
      requirements,
      totalPrice: price,
      travelers,
      availability,
    });

    // console.log("tour at create:>> ", tour);

    await sendBookingEmails(destination);

    res.json({
      success: true,
      message: "Destination Booking created and data emailed successfully",
      data: destination,
    });
  } catch (error) {
    console.log("Error in booking destination", error.message);
    res.status(500).json({
      success: false,
      message: "Error booking destination",
      error: error.message,
    });
  }
};

// get all tour bookings
export const getAllDestinationBookings = async (req, res) => {
  try {
    const bookings = await DestinationBooking.find()
      .populate("destination") // include tour details
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
export const deleteDestinationBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await DestinationBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Destination booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting Destination booking:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting Destination booking",
    });
  }
};

export const getDestinationBookingById = async (req, res) => {
  try {
    const tour = await DestinationBooking.findById(req.params.id).populate(
      "tour"
    );
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
