// models/Testimonial.ts or models/Testimonial.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: [{ type: String }], 
    tags: [{ type: String }],
    rating: { type: Number, required: true, min: 0, max: 5 },
    occupation: { type: String, required: true },
    tripName: { type: String, required: true },
    tripDate: { type: String, required: true },
    verified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
