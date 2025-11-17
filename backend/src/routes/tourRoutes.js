import express from 'express';
import { getAllTours, searchTours, getTourById, createTour, updateTour, deleteTour, getRelatedTours, getTourCategories, updateBookingTour } from '../controllers/tourController.js';
import upload, { convertToAvif } from '../utils/multerConfig.js'; // Remove { } since it's a default export

const router = express.Router();

// Public routes
router.get('/', getAllTours);
router.get('/search', searchTours);
router.get('/categories', getTourCategories);
router.get('/:id', getTourById);
router.get('/:id/related', getRelatedTours);
router.put('/update-tour/:id', updateBookingTour);

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
      createTour(req, res); // Proceed with actual handler
  }
);

router.put(
  "/:tourId",
  (req, res, next) => {
    next(); // Call the next middleware
  },
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "itineraryImages", maxCount: 20 }
  ]),
   convertToAvif,
  (req, res) => {
    updateTour(req, res);
  }
);

router.delete('/:id', deleteTour);

// GET /api/tours - Get all tours
// GET /api/tours/search - Search tours
// POST /api/tours - Create new tour
// PUT /api/tours/:id - Update tour
// DELETE /api/tours/:id - Delete tour

export default router; 