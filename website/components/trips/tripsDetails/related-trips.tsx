"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { generateSlug } from "@/lib/slug";

interface RelatedTripsProps {
  trips: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

const RelatedTrips = ({ trips }: RelatedTripsProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!trips || trips.length === 0) return null;
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 my-4">
      <h3 className="text-2xl font-bold mb-4">Related Trips</h3>
      <motion.div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {trips.map((trip, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              transition: {
                type: "spring",
                stiffness: 300,
                ease: "easeInOut",
                duration: 0.3,
              },
            }}
            className="p-4 border border-orange-600 rounded-lg bg-white hover:shadow-xl transition h-full flex flex-col flex-shrink-0 w-72 md:w-auto snap-center"
          >
            {trip.images && trip.images.length > 0 && (
              <img
                src={`${BASE_URL}${trip?.images && trip.images.length > 0 ? trip.images[0] : "/placeholder.svg?height=600&width=1200"}`}
                alt={trip.name}
                className="w-full h-40 object-cover rounded-md mb-3"
                loading="lazy"
              />
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {trip.category}
              </span>
              {trip.price && (
                <span className="text-sm font-semibold text-green-600">
                  ${trip.price}
                </span>
              )}
            </div>
            <h4 className="font-semibold text-lg mb-1 line-clamp-1">
              {trip.name}
            </h4>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {trip.shortDescription}
            </p>
            <button className="h-10 px-4 py-2 mt-auto bg-orange-600 text-white text-base font-semibold hover:bg-orange-700 transition-all duration-300">
              <Link href={`/trips/${trip._id}-${generateSlug(trip.name)}`}>View Details</Link>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedTrips;
