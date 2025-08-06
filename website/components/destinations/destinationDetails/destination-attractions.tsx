"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star, MapPin, Camera, Clock, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Destination, Attraction } from "@/data/destinations-data"

interface DestinationAttractionsProps {
  destination: Destination
}

const DestinationAttractions = ({ destination }: DestinationAttractionsProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mountain Peak":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Cultural Site":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Adventure Site":
        return "bg-red-100 text-red-800 border-red-200"
      case "Cultural Experience":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Natural Wonder":
        return "bg-green-100 text-green-800 border-green-200"
      case "Nature Trail":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Moderate":
        return "text-yellow-600"
      case "Challenging":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const attractions: Attraction[] = destination.attractions || [];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key <span className="text-orange-600">Attractions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the must-see highlights and hidden gems that make this destination extraordinary
            </p>
          </motion.div>

          {/* Attractions Grid */}
          {attractions.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No attractions available for this destination.</div>
          ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div key={attraction.id} variants={itemVariants}>
                <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-2/5 relative overflow-hidden">
                        <img
                          src={attraction.image || "/placeholder.svg"}
                          alt={attraction.name}
                          className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <Badge className={`absolute top-4 left-4 border ${getCategoryColor(attraction.category)}`}>
                          {attraction.category}
                        </Badge>

                        {/* Rating */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-gray-900">{attraction.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-3/5 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                            {attraction.name}
                          </h3>
                          <Camera className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors duration-300" />
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3">{attraction.description}</p>

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{attraction.visitDuration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className={`w-4 h-4 ${getDifficultyColor(attraction.difficulty)}`} />
                            <span className={`${getDifficultyColor(attraction.difficulty)} font-medium`}>
                              {attraction.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{attraction.bestTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">Must-Visit</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                          <div className="flex flex-wrap gap-2">
                            {attraction.highlights.map((highlight, highlightIndex) => (
                              <motion.div
                                key={highlightIndex}
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.1 * highlightIndex, type: "spring", stiffness: 200 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-green-50 text-green-700 border-green-200 text-xs"
                                >
                                  {highlight}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          )}

          {/* Attraction Stats */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">{attractions.length}+</div>
                <div className="text-gray-600">Major Attractions</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{attractions.length > 0 ? (attractions.reduce((sum, a) => sum + a.rating, 0) / attractions.length).toFixed(1) : "-"}</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Photo Spots</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <div className="text-gray-600">Cultural Sites</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationAttractions
