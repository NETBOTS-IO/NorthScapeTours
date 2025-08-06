import mongoose from 'mongoose';

const whyChooseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String }
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: [{ type: String }],
  accommodation: { type: String },
  meals: [{ type: String }],
  location: { type: String },
  duration: { type: String },
  type: { type: String },
  highlights: [{ type: String }],
  images: [{ type: String }]
}, { _id: false });

// const faqSchema = new mongoose.Schema({
//   question: { type: String },
//   answer: { type: String }
// });

const tourSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true // This allows MongoDB to automatically generate it
  },
  name: { type: String, required: true, trim: true },
  country: { type: String },
  location: { type: String },
  category: { type: String, required: true },
  days: { type: Number, min: 1 },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Expert'] },
  groupSize: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: Number, min: 0 },
  price: { type: Number, min: 0 },
  originalPrice: { type: Number, min: 0 },
  images: [{ type: String }],
  availability: { type: Boolean, default: false, required: true },
  nextDeparture: { type: Date },
  features: [{ type: String }],
  highlights: [{ type: String }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  shortDescription: { type: String },
  longDescription: { type: String },
  overview: { type: String },
  whyChoose: [whyChooseSchema],
  physicalRequirements: { type: String },
  bestTime: { type: String },
  itineraries: [itinerarySchema],
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  relatedTrips: [{ type: String }],
  destination: { type: String },
  faqs: [{ question: String, answer: String }],
  termsAndConditions: [{ type: String }],
  policies: [{ type: String }],
  map: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('Tour', tourSchema); 