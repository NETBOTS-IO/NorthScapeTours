import mongoose from "mongoose";
// --- Booking Schema ---
const bookingSchema = new mongoose.Schema({
  carId: String,
  carName: String,
  carModel: String,
  pricePerDay: Number,
  customerName: String,
  customerEmail: String,
  phoneNumber: String,
  pickupLocation: String,
  dropoffLocation: String,
  pickupDate: String,
  dropoffDate: String,
  pickupTime: String,
  dropoffTime: String,
  specialRequirements: String,
  status: { type: String, default: "Pending" }, // Pending / Confirmed
  createdAt: { type: Date, default: Date.now }
});

 export default  mongoose.model("Booking", bookingSchema);
