// backend/src/routes/feedbackRoutes.js

import express from "express";
import { QRFeedbackGenerator } from "../controllers/QRFeedbackGenerator.js";

const router = express.Router();

router.get("/feedback-qr", QRFeedbackGenerator);

export default router;