import express from "express"
import { createTourbooking, deleteTourBooking, getAllTourBookings, getTourBookingById, updateBookingTour } from "../controllers/tourBookingController.js";

const router = express.Router()

router.post('/', createTourbooking); 
router.get('/', getAllTourBookings); 
router.get('/:id', getTourBookingById); 
router.delete('/:id', deleteTourBooking); 
router.put('/:id', updateBookingTour); 

export default router;