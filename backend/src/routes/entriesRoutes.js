// routes/unifiedRoutes.js
import express from "express";
import { createEntry, getEntries, getEntryById, updateEntry, deleteEntry } from "../controllers/entriesController.js";

const router = express.Router();

router.post("/create", createEntry);
router.get("/", getEntries);
router.get("/:id", getEntryById);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;