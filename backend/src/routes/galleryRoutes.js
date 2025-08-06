import express from 'express';
import { getAllPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto } from '../controllers/galleryController.js';
import { galleryValidation } from '../middlewares/validation.js';
import { handleValidationErrors } from '../middlewares/errorHandler.js';
import upload from '../utils/multerConfig.js';
// import auth from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPhotos);
router.get('/:id', getPhotoById);

// Protected routes (add auth middleware as needed)
router.post(
  '/',
  upload.fields([{ name: 'src', maxCount: 10 }]),
  // auth,
  galleryValidation,
  handleValidationErrors,
  createPhoto
);
router.put(
  '/:id',
  upload.fields([{ name: 'src', maxCount: 10 }]),
  // auth,
  galleryValidation,
  handleValidationErrors,
  updatePhoto
);
router.delete('/:id', /* auth, */ deletePhoto);

export default router; 