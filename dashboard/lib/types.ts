import { OutputData } from "@editorjs/editorjs";

export interface Tour {
  id: string;
  name: string;
  country: string;
  location: string;
  category: string;
  days: number;
  groupSize: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert";
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  images: string[];
  availability: string;
  nextDeparture: string;
  features: string[];
  highlights: string[];
  included: string[];
  inclusions: string[];
  exclusions: string[];
  shortDescription: string;
  longDescription: string;
  overview: string;
  whyChoose: { title: string; description: string }[];
  physicalRequirements: string;
  bestTime: string;
  itineraries: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation: string;
    meals: string[];
    location: string;
    duration: string;
    type: string;
    highlights: string[];
    images: string[];
  }[];
  featured: boolean;
  tags: string[];
  relatedTrips: string[];
  destination: string;
  faqs: { question: string; answer: string }[];
  termsAndConditions: string[];
  policies: string[];
  map: { latitude: number; longitude: number };
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  src: string[];
  category: string;
  location?: string;
  date?: string;
  description?: string;
  photographer?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Each section of a blog
export interface BlogSection {
  subheading: string;
  image?: string;
  paragraph: string;
}



export interface BlogAPIResponse {
  success: boolean;
  message?: string;
  data?: Blog;
  error?: string;
  validationErrors?: Record<string, string>;
}

// Main Blog interface
export interface Blog {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  content: OutputData;
  category:
    | "Destinations"
    | "Travel Tips"
    | "Cultural Guides"
    | "Adventure"
    | "Food & Places"
    | "Luxury"
    | "Trekking"
    | "Wildlife"
    | "Culture";
  isFeatured: boolean;
  status: "draft" | "published";
  summary: string;
  tags: string[];
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "resolved";
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  logo: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "resolved";
}

// define types for rent car
export interface RentCar {
  _id: string;
  carName: string;
  carModel: string;
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  driverName: string;
  carImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  data: any;
  _id?: string; 
  carModel: string;
  carName: string;
  createdAt: string; // ISO date string
  customerEmail: string;
  customerName: string;
  dropoffDate: string; // ISO date string (YYYY-MM-DD)
  dropoffLocation: string;
  dropoffTime: string; // HH:mm
  phoneNumber: string;
  pickupDate: string; // ISO date string (YYYY-MM-DD)
  pickupLocation: string;
  pickupTime: string; // HH:mm
  pricePerDay: number;
  specialRequirements: string;
  status: "Pending" | "Confirmed" | "Cancelled"; 
}

