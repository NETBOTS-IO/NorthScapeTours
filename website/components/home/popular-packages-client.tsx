"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  Camera,
  Mountain,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { generateSlug } from "@/lib/slug";
import { fetchTours } from "@/lib/api";

type PopularPackagesClientProps = {
  tours: any[];
};

const categoryIcons = {
  "Trekking & Hiking": Mountain,
  "Wildlife Safaris": Camera,
  "Cultural Tours": Calendar,
  "Luxury Escapes": Waves,
};

export default function PopularPackagesClient() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLgUp, setIsLgUp] = useState(false);
  const [tours, setTours] = useState<PopularPackagesClientProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const featuredTrips = tours.filter((trip: any) => trip.featured);
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    fetchTours()
      .then((data) => setTours(data))
      .catch((err) => setError(err.message || "Failed to load tours"))
      .finally(() => setLoading(false));
  }, []);

  // Track screen size for responsive carousel/grid
  useEffect(() => {
    function handleResize() {
      // Tailwind's default 'lg' breakpoint is 1024px
      setIsLgUp(window.innerWidth >= 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance carousel below lg
  useEffect(() => {
    if (isLgUp || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTrips.slice(0, 3).length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isLgUp, isPaused, featuredTrips]);

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

  // Pause/resume handlers
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    handlePause();
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentIndex(
          (prev) =>
            (prev - 1 + featuredTrips.slice(0, 3).length) %
            featuredTrips.slice(0, 3).length
        );
      } else {
        setCurrentIndex(
          (prev) => (prev + 1) % featuredTrips.slice(0, 3).length
        );
      }
    }
    handleResume();
  };

  if (loading) return <p className="text-center py-8">Loading popular packages...</p>;
  if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;

  return (
    <section ref={ref} className="py-20 bg-green-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Tour Packages
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our carefully curated selection of extraordinary
            adventures, each designed to create unforgettable memories and
            life-changing experiences.
          </motion.p>
        </motion.div>

        {/* Packages Grid / Carousel */}
        {isLgUp ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:grid lg:grid-cols-3 gap-8 flex flex-row overflow-x-auto lg:overflow-x-visible space-x-4 lg:space-x-0 snap-x snap-mandatory scrollbar-hide"
          >
            {featuredTrips.slice(0, 3).map((trip: any, index: number) => {
              const CategoryIcon =
                categoryIcons[trip.category as keyof typeof categoryIcons] ||
                Mountain;
              return (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 min-w-[85vw] max-w-[85vw] sm:min-w-[400px] sm:max-w-[400px] lg:min-w-0 lg:max-w-none snap-center"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Featured Badge */}
                  {trip.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={`${BASE_URL}${
                          trip.images?.[0] || "/placeholder.svg"
                        }`}
                        alt={trip.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Icon */}
                    <motion.div
                      className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                    >
                      <CategoryIcon className="w-5 h-5 text-orange-600" />
                    </motion.div>

                    {/* Rating */}
                    <motion.div
                      className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.1 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {trip.rating}
                      </span>
                      <span className="text-xs text-gray-600">
                        ({trip.reviews})
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.3 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {trip.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`$${
                            trip.difficulty === "Easy"
                              ? "border-green-300 text-green-700"
                              : trip.difficulty === "Moderate"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-red-300 text-red-700"
                          }`}
                        >
                          {trip.difficulty}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {trip.name}
                      </h3>

                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{trip.destination}</span>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      className="text-gray-600 text-sm mb-4 line-clamp-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                    >
                      {trip.shortDescription}
                    </motion.p>

                    {/* Trip Details */}
                    <motion.div
                      className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.7 }}
                    >
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {trip.days} day(s)
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {trip.groupSize} persons
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          Next:{" "}
                          {trip.nextDeparture
                            ? new Date(trip.nextDeparture).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </motion.div>

                    {/* Highlights */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.9 }}
                    >
                      <div className="flex flex-wrap gap-1">
                        {trip.highlights
                          ?.slice(0, 3)
                          .map((highlight: string, highlightIndex: number) => (
                            <motion.span
                              key={highlightIndex}
                              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-200"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + 2.1 + highlightIndex * 0.1,
                              }}
                            >
                              {highlight}
                            </motion.span>
                          ))}
                      </div>
                    </motion.div>

                    {/* Pricing & CTA */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 2.3 }}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">{`$${trip.price}`}</span>
                          <span className="text-sm text-gray-500 line-through">{`${
                            trip.originalPrice ?? ""
                          }`}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          per person
                        </span>
                      </div>

                      <Button
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/trips/${
                            trip._id
                          }-${generateSlug(trip.name)}`)
                        }
                      >
                        See Details
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            ref={scrollRef}
            className="h-[750px] w-full group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {featuredTrips.slice(0, 3).map((trip: any, index: number) => {
              const CategoryIcon =
                categoryIcons[trip.category as keyof typeof categoryIcons] ||
                Mountain;
              return (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    index === currentIndex
                      ? { opacity: 1, x: 0, zIndex: 1 }
                      : { opacity: 0, x: 50, zIndex: 0 }
                  }
                  transition={{ duration: 0.6, type: "spring" }}
                  className={`absolute top-0 left-0 w-full min-w-0 max-w-full transition-all duration-500 ${
                    index === currentIndex ? "block" : "hidden"
                  }`}
                  style={{
                    pointerEvents: index === currentIndex ? "auto" : "none",
                  }}
                >
                  {/* Featured Badge */}
                  {trip.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={`${BASE_URL}${
                          trip.images?.[0] || "/placeholder.svg"
                        }`}
                        alt={trip.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Icon */}
                    <motion.div
                      className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                    >
                      <CategoryIcon className="w-5 h-5 text-orange-600" />
                    </motion.div>

                    {/* Rating */}
                    <motion.div
                      className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.1 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {trip.rating}
                      </span>
                      <span className="text-xs text-gray-600">
                        ({trip.reviews})
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.3 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {trip.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`$${
                            trip.difficulty === "Easy"
                              ? "border-green-300 text-green-700"
                              : trip.difficulty === "Moderate"
                              ? "border-yellow-300 text-yellow-700"
                              : "border-red-300 text-red-700"
                          }`}
                        >
                          {trip.difficulty}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {trip.name}
                      </h3>

                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{trip.destination}</span>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      className="text-gray-600 text-sm mb-4 line-clamp-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                    >
                      {trip.shortDescription}
                    </motion.p>

                    {/* Trip Details */}
                    <motion.div
                      className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.7 }}
                    >
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {trip.days} day(s)
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {trip.groupSize} persons
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          Next:{" "}
                          {trip.nextDeparture
                            ? new Date(trip.nextDeparture).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </motion.div>

                    {/* Highlights */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.9 }}
                    >
                      <div className="flex flex-wrap gap-1">
                        {trip.highlights
                          ?.slice(0, 3)
                          .map((highlight: string, highlightIndex: number) => (
                            <motion.span
                              key={highlightIndex}
                              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-200"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + 2.1 + highlightIndex * 0.1,
                              }}
                            >
                              {highlight}
                            </motion.span>
                          ))}
                      </div>
                    </motion.div>

                    {/* Pricing & CTA */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 2.3 }}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">{`$${trip.price}`}</span>
                          <span className="text-sm text-gray-500 line-through">{`${
                            trip.originalPrice ?? ""
                          }`}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          per person
                        </span>
                      </div>

                      <Button
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/trips/${
                            trip._id
                          }-${generateSlug(trip.name)}`)
                        }
                      >
                        See Details
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
            {/* Carousel Dots */}
            <div className="flex justify-center mt-4 space-x-2 absolute bottom-2 left-0 right-0 z-20">
              {featuredTrips.slice(0, 3).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentIndex === idx ? "bg-orange-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full bg-white transition-all duration-300"
            onClick={() => (window.location.href = "/trips")}
          >
            View All Tour Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
