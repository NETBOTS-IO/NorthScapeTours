"use client"

import type React from "react"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Perfect Ride
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-slate-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Affordable, fast, and reliable car rentals.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
              >
                View Fleet
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>
  )
}

export default HeroSection;