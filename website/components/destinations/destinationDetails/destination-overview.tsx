"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Thermometer, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Destination } from "@/data/destinations-data"

interface DestinationOverviewProps {
  destination: Destination
}

const DestinationOverview = ({ destination }: DestinationOverviewProps) => {
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trip <span className="text-orange-600">Overview</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{destination.longDescription}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Highlights */}
              <motion.div variants={cardVariants}>
                <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      Trip Highlights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-800">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* What's Included/Not Included */}
              <motion.div variants={cardVariants} className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {destination.included.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Not Included
                    </h4>
                    <ul className="space-y-2">
                      {destination.notIncluded.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <motion.div variants={cardVariants}>
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-green-50">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="font-semibold text-gray-900">Best Time</div>
                          <div className="text-gray-600">{destination.bestTimeToVisit}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{destination.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900">Location</div>
                          <div className="text-gray-600">{destination.location.nearestAirport}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Weather Info */}
              <motion.div variants={cardVariants}>
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                      Weather Guide
                    </h4>
                    <div className="space-y-4">
                      {destination.weather.map((weather, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="font-semibold text-gray-900">{weather.season}</div>
                          <div className="text-sm text-gray-600 mt-1">{weather.temperature}</div>
                          <div className="text-sm text-gray-600">{weather.conditions}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div variants={cardVariants}>
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Trip Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.05 * index, type: "spring", stiffness: 200 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationOverview
