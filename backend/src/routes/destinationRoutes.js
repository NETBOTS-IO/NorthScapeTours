import express from 'express';
import {  createDestination, deleteDestination, getAllDestinations, getDestinationCategories, getDestinationsById, getRelatedDestinations, searchDestinations, updateBookingDestination, updateDestination } from '../controllers/destinationController.js';
import { tourValidation } from '../middlewares/validation.js';
import upload, { convertToAvif } from '../utils/multerConfig.js'; 

const router = express.Router();

// Public routes
router.get('/', getAllDestinations);
router.get('/search', searchDestinations);
router.get('/categories', getDestinationCategories);
router.get('/:id', getDestinationsById);
router.get('/:id/related', getRelatedDestinations);
router.put('/update-tour/:id', updateBookingDestination);

// Protected routes (require authentication)
//router.post('/add', createTour);

router.post(
  "/",
  upload.fields([
      { name: "images", maxCount: 10 },
      { name: "itineraryImages", maxCount: 20 }
  ]),
   convertToAvif,
  (req, res) => {
      createDestination(req, res); // Proceed with actual handler
  }
);

router.put(
  "/:destinationId",
  (req, res, next) => {
    next(); // Call the next middleware
  },
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "itineraryImages", maxCount: 20 }
  ]),
   convertToAvif,
  (req, res) => {
    updateDestination(req, res);
  }
);

router.delete('/:id', deleteDestination);

export default router; 