import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import tourRoutes from './routes/tourRoutes.js';
import entryRoutes from './routes/entriesRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import RentRoutes from './routes/rentRoutes.js';
import BlogsRoutes from './routes/blogRoutes.js';
import BookingRoutes from './routes/bookingRoutes.js';

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
  "http://mountaintravels.site",
  "https://mountaintravels.site",
  "http://dashboard.mountaintravels.site",
  "https://dashboard.mountaintravels.site",
  "http://api.mountaintravels.site",
  "https://api.mountaintravels.site",
  "http://mountaintravels.com",
  "https://mountaintravels.com",
  "http://dashboard.mountaintravels.com",
  "https://dashboard.mountaintravels.com",
  "http://api.mountaintravels.com",
  "https://api.mountaintravels.com",
  "http://88.223.95.144:3000",
  "https://88.223.95.144:3000",
  "http://88.223.95.144",
  "https://88.223.95.144",
  "http://88.223.95.144:5000",
  "https://88.223.95.144:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

// Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


// Routes
app.get('/', (req, res)=>{
    res.send('Mountain Travel Pakistan Server is running');
});
app.use('/api/tours', tourRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/rent', RentRoutes);
app.use('/api/blogs', BlogsRoutes);
app.use('/api/bookings', BookingRoutes);

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