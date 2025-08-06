"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Calendar, DollarSign } from "lucide-react"

const DestinationFilters = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedBudget, setSelectedBudget] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Adventure", "Luxury", "Cultural", "Family", "Wildlife", "Beach"]
  const regions = ["All", "Asia", "Africa", "Europe", "Americas", "Oceania", "Middle East"]
  const durations = ["All", "1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"]
  const budgets = ["All", "Budget", "Mid-range", "Luxury", "Ultra-luxury"]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white border-b border-slate-200 sticky top-16 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search destinations, countries, or activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
          />
        </motion.div>

        {/* Filter Toggle */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            <span>Advanced Filters</span>
          </motion.button>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {/* Category Filter */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-600 transition-colors duration-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-600 transition-colors duration-300"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-600 transition-colors duration-300"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <DollarSign className="w-4 h-4 mr-2 text-orange-600" />
                Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-600 transition-colors duration-300"
              >
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default DestinationFilters
