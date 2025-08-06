// routes/unifiedRoutes.js
import express from "express";
import BookingHandler, { deleteBooking, getBooking, getBookings, updateBooking } from "../controllers/BookingController.js";

const router = express.Router();

router.post("/", BookingHandler);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.delete("/:id", deleteBooking);
router.put("/:id", updateBooking);

export default router;