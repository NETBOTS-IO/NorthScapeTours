import express from "express"
import { createDestinationbooking, deleteDestinationBooking, getAllDestinationBookings, getDestinationBookingById, updateBookingDestination } from "../controllers/destinationBookingController.js";

const router = express.Router()

router.post('/', createDestinationbooking);
router.get('/', getAllDestinationBookings);
router.get('/:id', getDestinationBookingById);
router.delete('/:id', deleteDestinationBooking);
router.put('/:id', updateBookingDestination);

export default router;