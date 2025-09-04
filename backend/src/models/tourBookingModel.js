import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour", 
    required: true,
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  availability: { type: String, required: true },
  travelers: { type: Number, required: true, min: 1 },
  selectedDate: { type: Date, required: true },
  totalPrice: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Tour Booking", bookingSchema);
