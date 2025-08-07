import mongoose from "mongoose";

const testimonialsSchema = new mongoose.Schema(
  {
    name:{type: String, required: true},
    image: [{ type: String, required: true }],
    description: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    occupation:{type: String},
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Testimonials", testimonialsSchema);
