import express from "express";
import {
  createTestimonials,
  deleteTestimonials,
  getTestimonials,
  getTestimonialsById,
  updateTestimonial,
  
} from "../controllers/testimonialsController.js";
import  upload  from "../utils/multerConfig.js";
import { handleValidationErrors } from "../middlewares/errorHandler.js";


const router = express.Router();

router.post("/", upload.fields([{ name: 'image', maxCount: 10 }]), handleValidationErrors, createTestimonials);
router.get("/", getTestimonials);
router.put("/:id", upload.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonials);
router.get("/:id", getTestimonialsById);


export default router;