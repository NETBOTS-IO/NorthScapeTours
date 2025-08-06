// controllers/unifiedController.js
import Entries from "../models/entriesModel.js";
import { sendBookingEmails } from "../utils/email.js";

// Create Booking, Inquiry, or Contact
export const createEntry = async (req, res) => {
  try {
    const { source, name, email, phone, tourPackage, participants, bookingDate, interests, message, status } = req.body;

    if (!source || !name || !email) {
      return res.status(400).json({ error: "source, name, and email are required." });
    }

    const newEntry = new Entries({ source, name, email, phone, tourPackage, participants, bookingDate, interests, message, status });

    await newEntry.save();

    // if (newEntry.source === "BOOKING FORM") {
    //   await sendBookingEmails(newEntry);
    // }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(201).json({ message: `${source} created successfully`, entry: newEntry });
  } catch (error) {
    console.error("❌ Error creating entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Entries with Pagination & Filters
export const getEntries = async (req, res) => {
  try {
    const { source, status, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (source) filter.source = source;
    if (status) filter.status = status;

    const totalCount = await Entries.countDocuments(filter);
    const entries = await Entries.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(200).json({ success: true, total: totalCount, data: entries });
  } catch (error) {
    console.error("❌ Error fetching entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Single Entry by ID
export const getEntryById = async (req, res) => {
  try {
    const entry = await Entries.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error("❌ Error fetching entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Entry by ID
export const updateEntry = async (req, res) => {
  try {
    const updatedEntry = await Entries.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) return res.status(404).json({ error: "Entry not found" });
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(200).json({ success: true, message: "Entry updated successfully", data: updatedEntry });
  } catch (error) {
    console.error("❌ Error updating entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Entry by ID
export const deleteEntry = async (req, res) => {
  try {
    const deletedEntry = await Entries.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ error: "Entry not found" });
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(200).json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
