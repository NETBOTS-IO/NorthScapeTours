import Booking from "../models/bookingModel.js";
import Car from "../models/rentModel.js";
import bookingsServices from "../services/bookingService.js";
import { sendBookingEmails } from "../utils/email.js";
// pcue iygv zngk etou

// --- API Handler ---
export default async function BookingHandler(req, res) {
  if (req.method === "POST") {
    try {
      const bookingData = req.body;
      const { carId } = bookingData;

      // console.log('carId', carId);
      const IsCarBooked = await Booking.findOne({ carId: carId });
      // console.log('IsCarBooked', IsCarBooked);

      if (IsCarBooked) {
        if (IsCarBooked.status === "Confirmed") {
          return res.status(403).json({
            success: false,
            message: "Car already booked",
            IsCarBooked,
          });
        }
        if (IsCarBooked.status === "Pending") {
          const createSameBookings = await Booking.create(bookingData);
          // console.log("createSameBookings", createSameBookings);
          await sendBookingEmails(createSameBookings); //sending email
          return res.status(201).json({
            success: true,
            message:
              "Car already booked but not confirmed. We will contact you soon!",
            createSameBookings,
          });
        }
      }
      //  Save booking to DB
      const bookings = await Booking.create(bookingData);
      // console.log('bookings', bookings)
      await sendBookingEmails(bookings); //sending email

      res.status(200).json({
        success: true,
        message: "Booking created and sent to owner",
        bookings,
      });
    } catch (error) {
      console.error("Booking error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create booking" });
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
    const { status } = req.body; // new status from request
    const { id } = req.params; // booking id

    // Get the booking we are updating
    const existingBooking = await Booking.findById(id);
    // console.log('existingBooking', existingBooking)
    if (!existingBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const { carId } = existingBooking;
    // console.log('carId', carId)

    // Check if this car already has a confirmed booking
    const alreadyConfirmed = await Booking.findOne({
      carId,
      status: "Confirmed",
      _id: { $ne: id }, // exclude current booking
    });
    // console.log("alreadyConfirmed", alreadyConfirmed);

    if (alreadyConfirmed && status === "Confirmed") {
      return res.status(404).json({
        success: false,
        message: "Car already confirmed earlier, cannot confirm again.",
      }); 
    }

    // Update booking status
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // Update car status accordingly
    await Car.findByIdAndUpdate(carId, { status }, { new: true });

    await sendBookingEmails(updatedBooking);

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update booking" });
  }
};

// get confirmed and pending c total counts
export const countBookings = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    const result = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$status", // group by status
          totalCounts: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "Bookings counts successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error counting bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get confirmed bookings for current month
export const getConfirmedBookingsThisMonth = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const result = await Booking.aggregate([
      {
        $match: {
          status: "Confirmed",
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $project: {
          _id: 1,
          bookingDate: "$createddAt",
          pricePerDay: 1,
          customerName: 1,
          status: 1,
          updatedAt: 1,
        },
      },
      { $sort: { bookingDate: -1 } },
    ]);

    res.status(200).json({
      message: "Confirmed bookings fetched",
      success: true,
      totalConfirmed: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching confirmed bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
