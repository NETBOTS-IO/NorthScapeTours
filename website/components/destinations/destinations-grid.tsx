"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Users, Star, Heart, Share2 } from "lucide-react"
import { Destination } from "@/data/destinations-data"
import { getDestinations, seedDestinationsCache, getDestinationById } from "@/lib/api"

// const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
const BASE_URL = "https://api.northscapepakistan.com"
// const BASE_URL = "http://localhost:5000";

const DestinationsGrid = ({ initialDestinations }: { initialDestinations?: Destination[] }) => {
  if (initialDestinations && initialDestinations.length > 0) {
    seedDestinationsCache(initialDestinations);
  }
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "200px" })
  const [favorites, setFavorites] = useState<string[]>([])
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations || [])
  const [loading, setLoading] = useState(!initialDestinations || initialDestinations.length === 0)
  const [error, setError] = useState<string | null>(null)
  const countPage = 6
  const [visibleCount, setVisibleCount] = useState(countPage)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const fetchDestinations = async () => {
      try {
        const response = await getDestinations()
        setDestinations(response)
        seedDestinationsCache(response)
      } catch (err) {
        if ((err as any)?.name !== "AbortError") {
          console.error("Failed to load destinations:", err)
          if (!initialDestinations || initialDestinations.length === 0) {
            setError("Couldn't load destinations. Please try again.")
          }
        }
      } finally {
        clearTimeout(timeout)
        setLoading(false)
      }
    }

    fetchDestinations()
    return () => controller.abort()
  }, [initialDestinations])

  const toggleFavorite = (id?: string) => {
    if (!id) return
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleMore = useCallback(() => {
    setVisibleCount((prev) => prev + countPage)
  }, [])

  const getImageSrc = (destination: Destination) =>
    destination?.images?.[0] ? `${BASE_URL}${destination.images[0]}` : "/placeholder.svg"

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-600"
      case "Moderate": return "bg-yellow-600"
      case "Challenging": return "bg-red-600"
      default: return "bg-slate-600"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 12 } },
  }

  const cardHoverVariants = {
    hover: { boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)", transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
  }

  const imageHoverVariants = {
    hover: { scale: 1.1, transition: { duration: 0.4, ease: "easeOut" as const } },
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {loading ? "Loading destinations..." : `${destinations.length} Destinations Found`}
            </h2>
            <p className="text-slate-600">Discover your next adventure</p>
          </div>
        </motion.div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            Array.from({ length: countPage }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded" />
            ))
          ) : destinations.length === 0 ? (
            <div>No Destination Found</div>
          ) : (
            destinations.slice(0, visibleCount).map((destination) => (
              <motion.div
                key={destination._id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white overflow-hidden border border-orange-600 card-shadow"
              >
                <motion.div variants={cardHoverVariants} className="h-full">
                  <div className="relative overflow-hidden h-64">
                    <Image
                      src={getImageSrc(destination)}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
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
                      <div className={`${getDifficultyColor(destination.difficulty)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {destination.difficulty}
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <span className="line-through text-slate-500 mr-1">${destination.price}</span>
                      ${destination.price}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(destination?._id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${destination?._id && favorites.includes(destination._id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-slate-700 hover:bg-white"
                          }`}
                      >
                        <Heart className={`w-4 h-4 ${destination?._id && favorites.includes(destination._id) ? "fill-current" : ""}`} />
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
                          <span>{`${destination.country}, ${destination.location}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-slate-700">{destination.rating}</span>
                        <span className="text-xs text-slate-500">({destination.reviews})</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                    {/* Trip Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        <span>{destination.days}, Days</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Users className="w-4 h-4 mr-2 text-orange-600" />
                        <span>{destination.groupSize}, Person</span>
                      </div>
                    </div>

                    {/* Best Time */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-1">Best Time to Visit</p>
                      <p className="text-sm text-slate-700 font-medium">{destination.bestTime}</p>
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
                          href={`/destinations/${destination._id}`}
                          onMouseEnter={() => {
                            if (destination._id) {
                              getDestinationById(destination._id);
                            }
                          }}
                          className="block bg-orange-600 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Load More Button */}
        {!loading && visibleCount < destinations.length && (
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
              onClick={handleMore}
            >
              Load More Destinations
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default DestinationsGrid