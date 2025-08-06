"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Calendar,
  Zap,
} from "lucide-react";
import { Trip } from "@/data/trips-data";
import { generateSlug } from "@/lib/slug";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchRelatedTours, fetchTours } from "@/lib/api";

const TripsListing = () => {
  const container = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { root: container,initial: true, once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const duration = searchParams.get("duration");
  const difficulty = searchParams.get("difficulty");
  const groupSize = searchParams.get("groupSize");
  const season = searchParams.get("season");
  const activities = searchParams.get("activities");
  const tripType = searchParams.get("tripType");

const router = useRouter();
const categoryId = searchParams.get("category");

useEffect(() => {
  const fetchCategory = async () => {
    if (!categoryId) return; 

    try {
      const response = await fetchRelatedTours(categoryId); 
      setCategory(response);
       setLoading(false)
    } catch (error) {
      console.log("Error fetching trip category", error);
    }
  };

  fetchCategory();
}, [categoryId]);

  let filteredTrips = category;
  if (tripType) {
    filteredTrips = filteredTrips?.filter((trip) => trip.category === tripType);
  }
  if (minPrice) {
    filteredTrips = filteredTrips.filter((trip) => typeof trip.price === "number" && trip.price >= Number(minPrice));
  }
  if (maxPrice) {
    filteredTrips = filteredTrips.filter((trip) => typeof trip.price === "number" && trip.price <= Number(maxPrice));
  }
  if (duration) {
    const durationArr = duration.split(",");
    filteredTrips = filteredTrips.filter((trip) => {
      if (!trip.days) return false;
      return durationArr.some((d) => {
        if (d === "1-3 days") return trip.days! >= 1 && trip.days! <= 3;
        if (d === "4-7 days") return trip.days! >= 4 && trip.days! <= 7;
        if (d === "8-14 days") return trip.days! >= 8 && trip.days! <= 14;
        if (d === "15+ days") return trip.days! >= 15;
        return false;
      });
    });
  }
  if (difficulty) {
    const diffArr = difficulty.split(",");
    filteredTrips = filteredTrips.filter((trip) => trip.difficulty && diffArr.includes(trip.difficulty));
  }
  if (groupSize) {
    const groupArr = groupSize.split(",");
    filteredTrips = filteredTrips.filter((trip) => {
      if (!trip.groupSize) return false;
      return groupArr.some((g) => trip.groupSize === g);
    });
  }
  if (season) {
    const seasonArr = season.split(",");
    filteredTrips = filteredTrips.filter((trip) => {
      if (!trip.bestTime) return false;
      return seasonArr.some((s) => trip.bestTime?.toLowerCase().includes(s.toLowerCase()));
    });
  }
  if (activities) {
    const actArr = activities.split(",");
    filteredTrips = filteredTrips.filter((trip) => {
      if (!trip.features) return false;
      return actArr.some((a) => trip.features?.some((f:any) => f.toLowerCase().includes(a.toLowerCase())));
    });
  }
  // Sort filteredTrips based on sortBy
  let sortedTrips = [...filteredTrips];
  if (sortBy === "price-low") {
    sortedTrips.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (sortBy === "price-high") {
    sortedTrips.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sortBy === "rating") {
    sortedTrips.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (sortBy === "duration") {
    sortedTrips.sort((a, b) => (b.days ?? 0) - (a.days ?? 0));
  }
  // const [favorites, setFavorites] = useState<number[]>([]);

  // const toggleFavorite = (id: number) => {
  //   setFavorites((prev) =>
  //     prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
  //   );
  // };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-orange-600 text-white";
      case "Luxury":
        return "bg-purple-600 text-white";
      case "Cultural":
        return "bg-blue-600 text-white";
      case "Family Friendly":
        return "bg-green-600 text-white";
      case "Seasonal":
        return "bg-cyan-600 text-white";
      case "Ultra Luxury":
        return "bg-yellow-600 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50";
      case "Moderate":
        return "text-yellow-600 bg-yellow-50";
      case "Challenging":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
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
    hidden: { y: 50, opacity: 0 },
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

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section ref={container} className="section-padding bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
        >
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Available <span className="text-orange-600">{tripType} Adventures</span>
            </h2>
            <p className="text-slate-600">{sortedTrips.length} adventures found</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="hidden lg:flex bg-slate-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-slate-800"
                    : "text-slate-600"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-slate-800"
                    : "text-slate-600"
                }`}
              >
                List
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </motion.div>

        {/* Trips Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {sortedTrips.map((trip, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group ${
                viewMode === "list"
                  ? "flex bg-white overflow-hidden shadow-lg border border-orange-600"
                  : ""
              }`}
            >
              {viewMode === "grid" ? (
                /* Grid View */
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    rotateY: 2,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  className="bg-white overflow-hidden shadow-lg border border-orange-600 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={`${BASE_URL}${trip?.images && trip.images.length > 0 ? trip.images[0] : "/placeholder.svg?height=600&width=1200"}`}
                      alt={trip.name}
                      className="w-full h-64 object-cover"
                    />

                    {/* Overlay Elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <span className="line-through text-slate-500 mr-1">
                        {trip.originalPrice ? `$${trip.originalPrice}` : ""}
                      </span>
                      ${trip.price}
                    </div>

                    {/* Availability */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          trip.availability
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        }`}
                      >
                        {trip.availability ? "Available" : "Limited"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                          {trip.name}
                        </h3>
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{trip.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-slate-700">
                          {trip.rating}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({trip.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {trip.shortDescription}
                    </p>

                    {/* Trip Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-slate-600 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        <span>{trip.days} day(s)</span>
                      </div>
                      <div className="flex items-center text-slate-600 text-sm">
                        <Users className="w-4 h-4 mr-2 text-orange-600" />
                        <span>{trip.groupSize} persons</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Zap className="w-4 h-4 mr-2 text-orange-600" />
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty ?? "")}`}
                        >
                          {trip.difficulty ?? ""}
                        </span>
                      </div>
                      <div className="flex items-center text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                        <span>
                          {trip.nextDeparture ? new Date(trip.nextDeparture).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {Array.isArray(trip.features) && trip.features.length > 2 ? (
                        <>
                          {trip.features.slice(0, 2).map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                          <span className="px-2 py-1 bg-slate-100 text-orange-600 rounded text-xs font-semibold">
                            more +
                          </span>
                        </>
                      ) : (
                        <>
                          {Array.isArray(trip.features) && trip.features.map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/trips/${trip._id}-${generateSlug(trip.name)}`}
                          className="block bg-orange-600 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* List View */
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  className="w-full"
                >
                  <div className="flex">
                    {/* Image */}
                    <div className="relative w-80 h-64 flex-shrink-0 overflow-hidden">
                      <motion.img
                        src={`${BASE_URL}${trip?.images && trip.images.length > 0 ? trip.images[0] : "/placeholder.svg?height=600&width=1200"}`}
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
                        <span className="line-through text-slate-500 mr-1">
                          ${trip.originalPrice}
                        </span>
                        ${trip.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                            {trip.name}
                          </h3>
                          <div className="flex items-center text-slate-500 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{trip.location}</span>
                            <span className="mx-2">•</span>
                            <span className="text-orange-600 font-medium">
                              {trip.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-semibold text-slate-700">
                            {trip.rating}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({trip.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {trip.longDescription}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="flex items-center text-slate-600">
                          <Clock className="w-5 h-5 mr-2 text-orange-600" />
                          <div>
                            <div className="text-sm text-slate-500">
                              Duration
                            </div>
                            <div className="font-semibold">{trip.days} day(s)</div>
                          </div>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Users className="w-5 h-5 mr-2 text-orange-600" />
                          <div>
                            <div className="text-sm text-slate-500">
                              Group Size
                            </div>
                            <div className="font-semibold">
                              {trip.groupSize} persons
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Zap className="w-5 h-5 mr-2 text-orange-600" />
                          <div>
                            <div className="text-sm text-slate-500">
                              Difficulty
                            </div>
                            <div
                              className={`font-semibold px-2 py-1 rounded text-xs ${getDifficultyColor(trip.difficulty ?? "")}`}
                            >
                              {trip.difficulty ?? ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                          <div>
                            <div className="text-sm text-slate-500">
                              Next Departure
                            </div>
                            <div className="font-semibold">
                              {trip.nextDeparture ? new Date(trip.nextDeparture).toLocaleDateString() : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">
                          Highlights:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(trip.highlights) && trip.highlights.length > 2 ? (
                            <>
                              {trip.highlights.slice(0, 2).map((highlight: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                                >
                                  {highlight}
                                </span>
                              ))}
                              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold">
                                more +
                              </span>
                            </>
                          ) : (
                            <>
                              {Array.isArray(trip.highlights) && trip.highlights.map((highlight: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={`/trips/${trip._id}-${generateSlug(trip.name)}`}
                              className="bg-orange-600 hover:bg-green-600 text-white py-3 px-6 font-semibold transition-all duration-300"
                            >
                              View Details
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
          >
            Load More Adventures
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TripsListing;
