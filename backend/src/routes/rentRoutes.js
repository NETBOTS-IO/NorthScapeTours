import express from "express";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controllers/rentController.js";
import  upload  from "../utils/multerConfig.js";
import { handleValidationErrors } from "../middlewares/errorHandler.js";

const router = express.Router();

router.post("/", upload.fields([{ name: 'carImage', maxCount: 10 }]), handleValidationErrors, createCar);  
router.get("/", getCars);                                
router.get("/:id", getCarById);                          
router.put("/:id", upload.single("carImage"), handleValidationErrors, updateCar); 
router.delete("/:id", deleteCar);                       

export default router;
