"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ChevronDown,
  MapPin,
  Clock,
  Mountain,
  Home,
  Camera,
  Zap,
  Calendar,
  Award,
  Shield,
  Users,
  Heart,
} from "lucide-react";
import { Trip } from "@/data/trips-data";

interface TripItineraryProps {
  trip: Trip;
}

// const iconMap: { [key: string]: React.ComponentType<any> } = {
//   "map-pin": MapPin,
//   "clock": Clock,
//   "mountain": Mountain,
//   "home": Home,
//   "camera": Camera,
//   "zap": Zap,
//   "calendar": Calendar,
//   "award": Award,
//   "shield": Shield,
//   "users": Users,
//   "heart": Heart,
// };

const TripItinerary = ({ trip }: TripItineraryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "arrival":
        return "bg-blue-100 text-blue-700";
      case "trekking":
        return "bg-green-100 text-green-700";
      case "acclimatization":
        return "bg-yellow-100 text-yellow-700";
      case "summit":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-8 w-full overflow-x-hidden px-2 sm:px-0"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Detailed Itinerary
        </h2>
        <p className="text-slate-600 mb-8">
          Follow our carefully planned day-by-day itinerary designed for optimal
          acclimatization and maximum enjoyment.
        </p>
      </motion.div>

      <div className="space-y-4">
        {trip.itineraries?.map((day, index) => {
          const isExpanded = expandedDay === day.day;

          return (
            <motion.div
              key={day.day}
              variants={itemVariants}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              {/* Day Header */}
              <motion.button
                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200"
                whileHover={{ backgroundColor: "#f8fafc" }}
              >
                <div className="flex items-center justify-between gap-2 md:gap-0">
                  <div className="flex items-center space-x-4">
                    {/* Day Number */}
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      {day.day}
                    </div>

                    {/* Day Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-2 gap-2 md:gap-0 mr-2">
                        <h3 className="text-lg md:text-xl font-bold text-slate-800">
                          {day.title}
                        </h3>
                        <span
                          className={`w-fit px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getTypeColor(
                            day.type || ""
                          )}`}
                        >
                          {day.type}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-slate-600 gap-1 sm:gap-0">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs md:text-sm truncate">{day.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs md:text-sm">{day.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-xs md:text-sm capitalize">{day.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-slate-100">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="pt-6 space-y-6"
                      >
                        {/* Description */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 mb-3">
                            Overview
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {day.description}
                          </p>
                        </div>

                        {/* Activities */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 mb-3">
                            Activities
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {day.activities?.map((activity, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0" />
                                <span className="text-slate-600 text-sm">
                                  {activity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 mb-3">
                            Highlights
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {day.highlights?.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Logistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                          <div>
                            <h5 className="font-semibold text-slate-700 mb-2">
                              Accommodation
                            </h5>
                            <p className="text-slate-600 text-sm">
                              {day.accommodation}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-slate-700 mb-2">
                              Meals Included
                            </h5>
                            <p className="text-slate-600 text-sm">
                              {day.meals}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-slate-700 mb-2">
                              Walking Time
                            </h5>
                            <p className="text-slate-600 text-sm">
                              {day.duration}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Itinerary Notes */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          Important Notes
        </h4>
        <ul className="space-y-2 text-blue-700 text-sm">
          <li>
            • Itinerary may be modified due to weather conditions or other
            unforeseen circumstances
          </li>
          <li>
            • Extra acclimatization days may be added if needed for safety
          </li>
          <li>
            • Walking times are approximate and depend on group fitness and
            weather
          </li>
          <li>
            • All meals and accommodation are included as specified in each day
          </li>
        </ul>
      </motion.div>
      {/* Terms ana Policy */}
      <motion.div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          Policies
        </h4>
        <p className="text-blue-700 mb-2 text-sm">
          By booking this trip, you agree to the following policies:
        </p>
        <ul>
          {trip.policies?.map((policy, idx) => (
            <li key={idx} className="text-blue-700 text-sm list-disc list-inside">{policy}</li>
          ))}
        </ul>
      </motion.div>
      {/* Booking Terms */}
      <motion.div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          Terms and Conditions
        </h4>
        <ul>
          {trip.termsAndConditions?.map((term, idx) => (
            <li key={idx} className="text-blue-700 text-sm list-disc list-inside">{term}</li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default TripItinerary;
