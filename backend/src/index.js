import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';

import tourRoutes from './routes/tourRoutes.js';
import entryRoutes from './routes/entriesRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import RentRoutes from './routes/rentRoutes.js';
import BlogsRoutes from './routes/blogRoutes.js';
import BookingRoutes from './routes/bookingRoutes.js';
import TestimonialsRoutes from './routes/testimonialsRoutes.js';
import ContactRoutes from './routes/contactRoutes.js';
import DestinationRoutes from './routes/destinationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import TourBookingRoutes from './routes/tourBookingRoutes.js';
import DestinationBookingRoutes from './routes/destinationBookingRoutes.js';
import FeedbackRoutes from './routes/feedbackRoutes.js' 

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://192.168.0.110:3000",
  "http://192.168.0.110:30001",
  "http://localhost:3001",
  "http://147.93.94.137",
  "https://147.93.94.137",
  "http://88.223.95.144:3000",
  "https://88.223.95.144:3000",
  "http://88.223.95.144",
  "https://88.223.95.144",
  "http://88.223.95.144:5000",
  "https://northscapepakistan.com",
  "http://northscapepakistan.com",
  "http://admin.northscapepakistan.com",
  "https://admin.northscapepakistan.com",
  "http://dashboard.northscapepakistan.com",
  "https://dashboard.northscapepakistan.com",
  "http://api.northscapepakistan.com",
  "https://api.northscapepakistan.com",
  "http://www.northscapepakistan.com",
  "https://www.northscapepakistan.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin not allowed by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


// Routes
app.get('/', (req, res) => {
  res.send(' Northscape Pakistan Server is running');
});

app.use("/api/auth", authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/rent', RentRoutes);
app.use('/api/blogs', BlogsRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api/testimonials', TestimonialsRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/destinations', DestinationRoutes);
app.use('/api/tour-booking', TourBookingRoutes);
app.use('/api/destination-booking', DestinationBookingRoutes);
app.use("/api", FeedbackRoutes);

// vN9RvwsMBLkwKU16

// app.use('/api/blogs', blogRoutes);
// app.use('/api/inquiries', inquiryRoutes);
// app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    success: false,
    status,
    message,
    error: err.stack
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected`);
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 