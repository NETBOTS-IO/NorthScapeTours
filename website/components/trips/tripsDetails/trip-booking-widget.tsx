"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Shield, Award, Clock, Star } from "lucide-react";
import { Trip } from "@/data/trips-data";

interface TripBookingWidgetProps {
  trip: Trip;
}

const TripBookingWidget = ({ trip }: TripBookingWidgetProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const departureDates = [
    { date: "2024-03-15", price: 2499, availability: "Available", spots: 8 },
    { date: "2024-04-12", price: 2599, availability: "Available", spots: 12 },
    { date: "2024-05-10", price: 2699, availability: "Limited", spots: 3 },
    { date: "2024-09-15", price: 2499, availability: "Available", spots: 10 },
    { date: "2024-10-20", price: 2599, availability: "Available", spots: 15 },
  ];

  const calculateTotal = () => {
    const selectedDeparture = departureDates.find(
      (d) => d.date === selectedDate
    );
    const basePrice = selectedDeparture && typeof selectedDeparture.price === 'number'
      ? selectedDeparture.price
      : (typeof trip.price === 'number' ? trip.price : 0);
    return basePrice * travelers;
  };

  const widgetVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={widgetVariants}
      initial="initial"
      animate="animate"
      className="sticky top-24"
    >
      {/* Main Booking Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-90 line-through">
                {trip.originalPrice ? `$${trip.originalPrice}` : ""}
              </div>
              <div className="text-3xl font-bold">${trip.price}</div>
              <div className="text-sm opacity-90">per person</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{trip.rating}</span>
              </div>
              <div className="text-sm opacity-90">{trip.reviews} reviews</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>
              Next departure:{" "}
              {trip.nextDeparture ? new Date(trip.nextDeparture).toLocaleDateString() : "N/A"}
            </span>
            <span className="bg-white/20 px-2 py-1 rounded">
              {trip.availability ? "Available" : "Limited"}
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              <Calendar className="inline w-4 h-4 mr-2" />
              Select Departure Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
            >
              <option value="">Choose a date</option>
              {departureDates.map((departure) => (
                <option key={departure.date} value={departure.date}>
                  {new Date(departure.date).toLocaleDateString()} - $
                  {departure.price} ({departure.spots} spots)
                </option>
              ))}
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              <Users className="inline w-4 h-4 mr-2" />
              Number of Travelers
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-semibold transition-colors duration-200"
              >
                -
              </button>
              <span className="text-xl font-semibold text-slate-800 min-w-[2rem] text-center">
                {travelers}
              </span>
              <button
                onClick={() => setTravelers(Math.min(12, travelers + 1))}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-semibold transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span>Base price x {travelers}</span>
                <span>
                  ${departureDates.find((d) => d.date === selectedDate)?.price}{" "}
                  x {travelers}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-slate-200 pt-2">
                <span>Total</span>
                <span className="text-orange-600">
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}

          {/* Booking Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookingForm(!showBookingForm)}
              disabled={!selectedDate}
              className="w-full bg-orange-600 hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showBookingForm ? "Hide Booking Form" : "Book Now"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
            >
              Check Availability
            </motion.button>
          </div>

          {/* Quick Booking Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={showBookingForm ? "visible" : "hidden"}
            className="overflow-hidden"
          >
            {showBookingForm && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800">Quick Booking</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-600 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                >
                  Complete Booking
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-xs text-slate-600">Secure Booking</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-xs text-slate-600">Best Price</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-xs text-slate-600">Instant Confirm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="mt-6 space-y-4">
        {/* Contact Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-4">Need Help?</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">📞</span>
              </div>
              <div>
                <div className="font-medium text-slate-800">
                  Call our experts
                </div>
                <div className="text-slate-600">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">💬</span>
              </div>
              <div>
                <div className="font-medium text-slate-800">
                  Live chat support
                </div>
                <div className="text-slate-600">Available 24/7</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Book With Us */}
        <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-6 border border-orange-200">
          <h4 className="font-semibold text-slate-800 mb-4">
            Why Book With Us?
          </h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <span>Expert local guides</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <span>Small group sizes</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <span>Comprehensive safety</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
              <span>24/7 support</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default TripBookingWidget;
