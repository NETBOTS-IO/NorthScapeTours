import mongoose from "mongoose";

const entriesSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ["BOOKING FORM", "CHATBOT", "CONTACT FORM"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    tourPackage: { type: Object },
    participants: { type: Number },
    bookingDate: { type: Date },
    interests: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "unread",
        "read",
        "responded",
        "inProgress",
        "resolved",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Entries",entriesSchema);
