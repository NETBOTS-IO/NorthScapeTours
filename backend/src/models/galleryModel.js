import mongoose from 'mongoose';

const galleryPhotoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  title: { type: String, required: true, trim: true },
  src: [{ type: String, required: true }], // Array of image URLs
  category: { type: String, required: true },
  location: { type: String },
  date: { type: String }, // Can be changed to Date if needed
  description: { type: String },
  photographer: { type: String },
}, {
  timestamps: true
});

export default mongoose.model('GalleryPhoto', galleryPhotoSchema); 