"use client"

import { useState } from "react"
import Link from "next/link"
// import { generateSlug } from "@/lib/slug"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock, Users, Star, Heart, Share2 } from "lucide-react"
import { destinationsData } from "@/data/destinations-data"

const DestinationsGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

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
  }

  const cardHoverVariants = {
    hover: {
      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const imageHoverVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600"
      case "Moderate":
        return "bg-yellow-600"
      case "Challenging":
        return "bg-red-600"
      default:
        return "bg-slate-600"
    }
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{destinationsData.length} Destinations Found</h2>
            <p className="text-slate-600">Discover your next adventure</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600">
              <option>Sort by Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Short to Long</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinationsData.map((destination, index) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white overflow-hidden border border-orange-600 card-shadow"
            >
              <motion.div variants={cardHoverVariants} className="h-full">
                <div className="relative overflow-hidden">
                  <motion.img
                    variants={imageHoverVariants}
                    src={destination.heroImage || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-64 object-cover"
                  />

                  {/* Image Overlay */}
                  <motion.div
                    variants={overlayVariants}
                    initial="initial"
                    whileHover="hover"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-white text-center"
                    >
                      <p className="text-lg font-semibold mb-2">View Details</p>
                      <div className="flex space-x-2">
                        {destination.highlights.slice(0, 2).map((highlight, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/20 rounded text-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {destination.category}
                    </div>
                    <div
                      className={`${getDifficultyColor(destination.difficulty)} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {destination.difficulty}
                    </div>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <span className="line-through text-slate-500 mr-1">${destination.price.from}</span>
                    ${destination.price.from}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(destination.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                        favorites.includes(destination.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-slate-700 hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(destination.id) ? "fill-current" : ""}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full backdrop-blur-sm transition-colors duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{destination.name}</h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{destination.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-slate-700">{destination.rating}</span>
                      <span className="text-xs text-slate-500">({destination.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{destination.groupSize}</span>
                    </div>
                  </div>

                  {/* Best Time */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1">Best Time to Visit</p>
                    <p className="text-sm text-slate-700 font-medium">{destination.bestTimeToVisit}</p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 items-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="block bg-orange-600 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/booking"
                        className="bg-green-600 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                      >
                        Book Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-outline">
            Load More Destinations
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationsGrid
