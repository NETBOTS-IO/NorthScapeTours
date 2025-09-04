import Tour from "../models/tourModel.js";
import nodemailer from "nodemailer";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tours",
      error: error.message,
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tour",
      error: error.message,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    // Ensure multer processed the files
    // console.log("Uploaded Files:", req.files);

    // Validate tour data presence
    let tourData;
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format",
          error: parseError.message,
        });
      }
    } else {
      tourData = req.body;
    }

    if (
      !tourData.name ||
      (!tourData.shortDescription && !tourData.longDescription)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name and at least one description (shortDescription or longDescription) are required",
      });
    }

    // Process Tour Images
    if (req.files?.images) {
      tourData.images = req.files.images.map(
        (file) => `/uploads/tours/${file.filename}`
      );
    }

    // Process Itinerary Images
    if (req.files?.itineraryImages && Array.isArray(tourData.itineraries)) {
      let currentImageIndex = 0;
      tourData.itineraries = tourData.itineraries.map((itinerary) => {
        const imageCount = itinerary.imageCount || 0;
        const itineraryImages = req.files.itineraryImages
          .slice(currentImageIndex, currentImageIndex + imageCount)
          .map((file) => `/uploads/tours/${file.filename}`);
        currentImageIndex += imageCount;
        return { ...itinerary, images: itineraryImages };
      });
    }

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    tourData.whyChoose = tourData.whyChoose || [];
    tourData.tags = tourData.tags || [];
    tourData.relatedTrips = tourData.relatedTrips || [];
    tourData.features = tourData.features || [];
    tourData.highlights = tourData.highlights || [];
    tourData.included = tourData.included || [];
    tourData.inclusions = tourData.inclusions || [];
    tourData.exclusions = tourData.exclusions || [];
    tourData.faqs = tourData.faqs || [];
    tourData.termsAndConditions = tourData.termsAndConditions || [];
    tourData.policies = tourData.policies || [];

    // Create Tour Entry in DB
    const tour = await Tour.create(tourData);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: tour,
    });
  } catch (error) {
    // Log and respond with error information
    console.error("Error creating tour:", error);
    res.status(500).json({
      success: false,
      message: "Error creating tour",
      error: error.message,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    console.log("Update Tour API Endpoint Hit", req.body);

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

    if (
      !tourData.name ||
      (!tourData.shortDescription && !tourData.longDescription)
    ) {
      console.log("Name and at least one description are required");
      return res.status(400).json({
        success: false,
        message:
          "Name and at least one description (shortDescription or longDescription) are required",
      });
    }

    // Process images from multer (req.files)
    if (req.files?.images) {
      const newImages = req.files.images.map(
        (file) => `/uploads/tours/${file.filename}`
      );
      tourData.images = [...(tourData.images || []), ...newImages];
    }

    if (req.files?.itineraryImages && Array.isArray(tourData.itineraries)) {
      let currentImageIndex = 0;
      tourData.itineraries = tourData.itineraries.map((itinerary) => {
        const imageCount = itinerary.imageCount || 0;
        if (imageCount > 0) {
          const newImages = req.files.itineraryImages
            .slice(currentImageIndex, currentImageIndex + imageCount)
            .map((file) => `/uploads/tours/${file.filename}`);
          currentImageIndex += imageCount;
          return {
            ...itinerary,
            images: [...(itinerary.images || []), ...newImages],
          };
        }
        return itinerary;
      });
    }

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    tourData.whyChoose = tourData.whyChoose || [];
    tourData.tags = tourData.tags || [];
    tourData.relatedTrips = tourData.relatedTrips || [];
    tourData.features = tourData.features || [];
    tourData.highlights = tourData.highlights || [];
    tourData.included = tourData.included || [];
    tourData.inclusions = tourData.inclusions || [];
    tourData.exclusions = tourData.exclusions || [];
    tourData.faqs = tourData.faqs || [];
    tourData.termsAndConditions = tourData.termsAndConditions || [];
    tourData.policies = tourData.policies || [];

    // Update the tour in MongoDB
    const tour = await Tour.findByIdAndUpdate(req.params.tourId, tourData, {
      new: true,
    });
    if (!tour) {
      console.log("Tour not found");
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
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
    console.log("Error in updating tour", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating tour",
      error: error.message,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID is required" });
    }

    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({ success: true, message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting tour",
      error: error.message,
    });
  }
};

export const searchTours = async (req, res) => {
  try {
    const { category, difficulty, priceMin, priceMax, location } = req.query;
    const query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (location) query.location = { $regex: location, $options: "i" };
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const tours = await Tour.find(query);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Tours searched successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching tours",
      error: error.message,
    });
  }
};

export const getRelatedTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    // Find up to 3 tours with the same category, excluding the current tour
    const relatedTours = await Tour.find({
      category: tour.category,
      // _id: { $ne: tour._id }
    }).limit(3);
    res.json({ success: true, data: relatedTours });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching related tours",
      error: error.message,
    });
  }
};

export const getTourCategories = async (req, res) => {
  try {
    const categories = await Tour.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          categoryId: { $first: "$_id" },
        },
      },
      { $sort: { count: -1 } },
    ]);
    // console.log('categories', categories)
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

export const updateBookingTour = async (req, res) => {
  try {
    // console.log("Update Tour API Endpoint Hit", req.body);
    const {
      firstName,
      lastName,
      email,
      phone,
      selectedDate,
      totalPrice,
      travelers,
      availability,
    } = req.body;
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
    // console.log('tourData.availability', tourData.availability);

    const checkAvailaibility = await Tour.findById(id);
    // console.log('checkAvailaibility', checkAvailaibility);

    if (checkAvailaibility.availability === true) {
      res.status(401).json({ success: false, message: "Tour already Booked!" });
    }

    tourData.availability =
      tourData.availability === "false" ? "true" : "false";

    // console.log("tourData.availability after", tourData.availability);
    // Update the tour in MongoDB
    const tour = await Tour.findByIdAndUpdate(req.params.id, tourData, {
      new: true,
    });
    // console.log("tour", tour);

    if (!tour) {
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
          to: email,
          subject: `Booking Confirmation - ${tour.name}`,
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
    console.log("Error in updating tour", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating tour",
      error: error.message,
    });
  }
};