"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Clock,
  Users,
  Zap,
  Calendar,
  Award,
  Shield
} from "lucide-react";
import { Trip } from "@/data/trips-data";

interface TripDetailContentProps {
  trip: Trip;
}
const iconMap: { [key: string]: React.ComponentType<any> } = {
  "map-pin": MapPin,
  "shield": Shield,
  "award": Award,
  "users": Users,
};

const TripDetailContent = ({ trip }: TripDetailContentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      className="space-y-12"
    >
      {/* Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Trip Overview
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-slate-600 leading-relaxed">{trip.overview}</p>
        </div>
      </motion.div>

      {/* Highlights */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Trip Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.highlights?.map((highlight, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100"
            >
              <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0" />
              <span className="text-slate-700 font-medium">{highlight}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose This Trip */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Why Choose This Adventure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trip.whyChoose?.map((item, index) => {
            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    ease: "easeInOut",
                  },
                }}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Physical Requirements */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Physical Requirements
        </h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                Fitness Level: {trip.difficulty}
              </h4>
              <p className="text-yellow-700 leading-relaxed">
                {trip.physicalRequirements}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Best Time to Visit */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Best Time to Visit
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                Optimal Seasons
              </h4>
              <p className="text-blue-700 leading-relaxed">{trip.bestTime}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Facts */}
      {/* <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Quick Facts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: MapPin, label: "Max Altitude", value: "5,545m" },
            { icon: Clock, label: "Daily Walking", value: "6-8 hours" },
            { icon: Users, label: "Group Size", value: "8-12 people" },
            { icon: Calendar, label: "Departures", value: "Year-round" },
          ].map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200"
              >
                <IconComponent className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-sm text-slate-500 mb-1">{fact.label}</div>
                <div className="text-lg font-bold text-slate-800">
                  {fact.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div> */}
    </motion.section>
  );
};

export default TripDetailContent;
