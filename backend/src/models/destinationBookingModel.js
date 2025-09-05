import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination", 
    required: true,
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  availability: { type: Boolean, default: true, required: true },
  travelers: { type: Number, required: true, min: 1 },
  departureDate: { type: Date, required: true },
  totalPrice: { type: String, required: true },
  requirements: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Destination Booking", destinationSchema);
