import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getPopularBlogs,
  getRelatedBlogs,
} from "../controllers/blogController.js";

import { parseJSONFields } from "../middlewares/parseJSONFields.js";
import { blogValidation } from "../middlewares/validation.js";
import { handleValidationErrors } from "../middlewares/errorHandler.js";
import upload from "../utils/multerConfig.js"; // Multer config for uploads

const router = express.Router();
// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Multer error: ${err.message}`,
      error: err.code,
    });
  }
  next(err);
};

// ------------------------
// Public Routes
// ------------------------

// Get all blogs (with pagination/filter/search)
router.get("/", getAllBlogs);

// Get single blog by ID and increment views
router.get("/:id", getBlogById);

// Search blogs
router.get("/search", searchBlogs);

// Get popular blogs by views
router.get("/popular", getPopularBlogs);

// Get related blogs by category
router.get("/related/:id", getRelatedBlogs);

// ------------------------
// Protected Routes (optional: add auth middleware)
// ------------------------

// Upload inline Editor.js images
router.post(
  "/upload-editor-image",
  upload.single("image"),
  handleMulterError,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const imageUrl = `/uploads/blogs/${req.file.filename}`;
    res.status(200).json({
      success: 1,
      file: {
        url: imageUrl,
      },
    });
  }
);

// Create blog post with cover image
router.post(
  "/",
  upload.single("coverImage"),
  parseJSONFields,
  blogValidation,
  handleValidationErrors,
  createBlog
);

// Update blog post (optionally update cover image)
router.put(
  "/:id",
  upload.single("coverImage"),
  parseJSONFields, // Parse JSON fields in request body
  handleValidationErrors,
  updateBlog
);

// Delete blog post
router.delete("/:id", deleteBlog);

// ------------------------
// REST Reference
// ------------------------
// GET    /api/blogs                 -> list
// GET    /api/blogs/:id            -> detail + views
// POST   /api/blogs                -> create
// PUT    /api/blogs/:id            -> update
// DELETE /api/blogs/:id            -> delete
// POST   /api/blogs/upload-editor-image -> inline editor image upload
// GET    /api/blogs/search         -> search
// GET    /api/blogs/popular        -> popular
// GET    /api/blogs/related/:id    -> related
// ------------------------

export default router;
