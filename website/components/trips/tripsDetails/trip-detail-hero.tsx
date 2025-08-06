"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, Award, Shield, Zap } from "lucide-react";
import { Trip } from "@/data/trips-data";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

interface TripDetailHeroProps {
  trip: Trip;
}

const TripDetailHero = ({ trip }: TripDetailHeroProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const [current, setCurrent] = useState(0);
  const images = trip.images && trip.images.length > 0 ? trip.images : ["/placeholder.svg?height=200&width=300"];
  const hasMultiple = images.length > 1;

  // Auto-slide effect
  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, hasMultiple, images.length]);

  const backgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  };

  const contentVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <motion.div
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0"
      >
        {/* Carousel */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={images[current]}
              src={`${BASE_URL}${images[current]}`}
              alt={`Tour image ${current + 1}`}
              className="object-cover w-full h-full min-h-[300px] max-h-screen transition-all duration-500"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </AnimatePresence>
          {/* Dots */}
          {hasMultiple && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === current ? "bg-white" : "bg-white/40"}`}
                  onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {/* Breadcrumb */}
          <motion.nav variants={itemVariants} className="mb-8 hidden lg:block">
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <span>Home</span>
              <span>/</span>
              <span>Trips</span>
              <span>/</span>
              <span>{trip.category}</span>
              <span>/</span>
              <span className="text-white">{trip.name}</span>
            </div>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Badges */}
              {/* <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2 mb-4"
              >
                {trip.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div> */}

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                {trip.name}
              </motion.h1>

              {/* Location & Category */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="flex items-center text-white/90">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{trip.location}</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-orange-400 font-semibold text-lg">
                  {trip.category}
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
              >
                {trip.shortDescription}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-white/70 text-sm">Duration</div>
                    <div className="text-white font-semibold">
                      {trip.days} day(s)
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-white/70 text-sm">Group Size</div>
                    <div className="text-white font-semibold">
                      {trip.groupSize}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Zap className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-white/70 text-sm">Difficulty</div>
                    <div className="text-white font-semibold">
                      {trip.difficulty}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <div>
                    <div className="text-white/70 text-sm">Rating</div>
                    <div className="text-white font-semibold">
                      {trip.rating} ({trip.reviews})
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Price Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1 hidden lg:block">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-sm text-slate-500 line-through mb-1">
                  {trip.originalPrice ? `$${trip.originalPrice}` : ""}
                  </div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    ${trip.price}
                  </div>
                  <div className="text-sm text-slate-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Next Departure:</span>
                    <span className="font-semibold text-slate-800">
                      {trip.nextDeparture
                        ? new Date(trip.nextDeparture).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Availability:</span>
                    <span
                      className={`font-semibold ${
                        trip.availability ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trip.availability ? "Available" : "Limited"}
                    </span>
                  </div>
                </div>

                {/* <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-orange-600 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                  >
                    Check Availability
                  </motion.button>
                </div> */}

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1 text-green-600" />
                      <span>Secure Booking</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-orange-600" />
                      <span>Best Price</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [2, 14, 2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TripDetailHero;
