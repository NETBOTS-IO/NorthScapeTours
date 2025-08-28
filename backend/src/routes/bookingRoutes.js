// routes/unifiedRoutes.js
import express from "express";
import BookingHandler, {
  countBookings,
  deleteBooking,
  getBooking,
  getBookings,
  getConfirmedBookingsThisMonth,
  updateBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", BookingHandler); 
router.get("/booking-counts", countBookings);
router.get("/confirmed-bookings", getConfirmedBookingsThisMonth);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.delete("/:id", deleteBooking);
router.put("/:id", updateBooking);

export default router;
