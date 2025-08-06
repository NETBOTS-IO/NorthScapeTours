import express from 'express';
import { getAllTours, searchTours, getTourById, createTour, updateTour, deleteTour, getRelatedTours, getTourCategories } from '../controllers/tourController.js';
import { tourValidation } from '../middlewares/validation.js';
import upload from '../utils/multerConfig.js'; // Remove { } since it's a default export

const router = express.Router();

// Public routes
router.get('/', getAllTours);
router.get('/search', searchTours);
router.get('/categories', getTourCategories);
router.get('/:id', getTourById);
router.get('/:id/related', getRelatedTours);

// Protected routes (require authentication)
//router.post('/add', createTour);

router.post(
  "/",
  upload.fields([
      { name: "images", maxCount: 10 },
      { name: "itineraryImages", maxCount: 20 }
  ]),
  (req, res) => {
      console.log("Received files:", req.files); // ✅ Debugging
      console.log("Received body:", req.body); // ✅ Debugging
      createTour(req, res); // Proceed with actual handler
  }
);

router.put(
  "/:tourId",
  (req, res, next) => {
    console.log("Received tourId before multer:", req.params.tourId); // ✅ Debugging
    next(); // Call the next middleware
  },
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "itineraryImages", maxCount: 20 }
  ]),
  (req, res) => {
    console.log("Id after multer:", req.params.tourId); // ✅ Debugging
    console.log("Received files:", req.files); // ✅ Debugging
    console.log("Received body:", req.body); // ✅ Debugging
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