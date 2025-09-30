"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Zap,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Filters {
  priceRange: [number, number];
  duration: string[];
  difficulty: string[];
  groupSize: string[];
  season: string[];
  activities: string[];
}

const filterOptions = {
  duration: ["1-3 days", "4-7 days", "8-14 days", "15+ days"],
  difficulty: ["Easy", "Moderate", "Challenging", "Expert"],
  groupSize: ["Solo", "2-4 people", "5-10 people", "11+ people"],
  season: ["Spring", "Summer", "Fall", "Winter"],
  activities: [
    "Trekking",
    "Wildlife",
    "Culture",
    "Photography",
    "Water Sports",
    "Climbing",
  ],
};

const TripFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000],
    duration: [],
    difficulty: [],
    groupSize: [],
    season: [],
    activities: [],
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to build query string from filters
  const buildQueryString = (filters: Filters) => {
    const params = new URLSearchParams();
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000) {
      params.set("minPrice", filters.priceRange[0].toString());
      params.set("maxPrice", filters.priceRange[1].toString());
    }
    (
      ["duration", "difficulty", "groupSize", "season", "activities"] as const
    ).forEach((key) => {
      if (filters[key].length > 0) {
        params.set(key, filters[key].join(","));
      }
    });
    // Preserve category filter if present in URL
    const category = searchParams.get("category");
    if (category) params.set("category", category);
    return params.toString();
  };

  const applyFilters = () => {
    const query = buildQueryString(filters);
    router.push(`/trips${query ? `?${query}` : ""}`);
    setIsOpen(false);
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      duration: [],
      difficulty: [],
      groupSize: [],
      season: [],
      activities: [],
    });
    // Only keep category if present
    const category = searchParams.get("category");
    router.push(
      category ? `/trips?category=${encodeURIComponent(category)}` : "/trips"
    );
  };

  const toggleFilter = <K extends keyof Filters>(
    category: K,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: (prev[category] as string[]).includes(value)
        ? (prev[category] as string[]).filter((item) => item !== value)
        : [...(prev[category] as string[]), value],
    }));
  };

  const getActiveFilterCount = () => {
    return (
      filters.duration.length +
      filters.difficulty.length +
      filters.groupSize.length +
      filters.season.length +
      filters.activities.length
    );
  };

  const sidebarVariants = {
    closed: {
      x: 400,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const filterGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const filterItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Filter Adventures
              </h3>
              {getActiveFilterCount() > 0 && (
                <span className="hidden md:block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {getActiveFilterCount()} active
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {getActiveFilterCount()}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Filter Adventures
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-slate-600" />
                  </motion.button>
                </div>
                {getActiveFilterCount() > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllFilters}
                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                  >
                    Clear all filters
                  </motion.button>
                )}
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-8">
                {/* Price Range */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Price Range
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            prev.priceRange[0],
                            Number.parseInt(e.target.value),
                          ],
                        }))
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </motion.div>

                {/* Duration */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Duration
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.duration.map((duration) => (
                      <motion.button
                        key={duration}
                        variants={filterItemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter("duration", duration)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                          filters.duration.includes(duration)
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {duration}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Difficulty */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Difficulty
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {filterOptions.difficulty.map((difficulty) => (
                      <motion.label
                        key={difficulty}
                        variants={filterItemVariants}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(difficulty)}
                          onChange={() =>
                            toggleFilter("difficulty", difficulty)
                          }
                          className="w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-600"
                        />
                        <span className="text-slate-700 font-medium">
                          {difficulty}
                        </span>
                        <div
                          className={`ml-auto w-3 h-3 rounded-full ${
                            difficulty === "Easy"
                              ? "bg-green-500"
                              : difficulty === "Moderate"
                              ? "bg-yellow-500"
                              : difficulty === "Challenging"
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                        />
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Group Size */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Group Size
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {filterOptions.groupSize.map((size) => (
                      <motion.button
                        key={size}
                        variants={filterItemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleFilter("groupSize", size)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left font-medium ${
                          filters.groupSize.includes(size)
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Season */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Best Season
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.season.map((season) => (
                      <motion.button
                        key={season}
                        variants={filterItemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter("season", season)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                          filters.season.includes(season)
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {season}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Activities */}
                <motion.div
                  variants={filterGroupVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Activities
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.activities.map((activity) => (
                      <motion.button
                        key={activity}
                        variants={filterItemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter("activities", activity)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm font-medium ${
                          filters.activities.includes(activity)
                            ? "border-orange-600 bg-orange-600 text-white"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {activity}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyFilters}
                    className="flex-1 bg-orange-600 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                  >
                    Apply Filters
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllFilters}
                    className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg font-semibold transition-all duration-300"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f5530c;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f5530c;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default TripFilters;
