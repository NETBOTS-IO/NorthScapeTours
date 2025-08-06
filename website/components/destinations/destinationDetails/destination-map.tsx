"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Navigation, Plane, Clock, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Destination } from "@/data/destinations-data"

interface DestinationMapProps {
  destination: Destination
}

const DestinationMap = ({ destination }: DestinationMapProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"map" | "weather" | "travel">("map")

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
    hidden: { y: 40, opacity: 0 },
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

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4${destination.location.coordinates[0]}!2d${destination.location.coordinates[1]}!3d${destination.location.coordinates[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzQ4LjAiTiA4NsKwNTUnMzAuMCJF!5e0!3m2!1sen!2sus!4v1635959823456!5m2!1sen!2sus`

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Location & <span className="text-orange-600">Travel Info</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about getting there and what to expect
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Interactive Map & Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-0">
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200">
                    {[
                      { id: "map", label: "Map", icon: MapPin },
                      { id: "weather", label: "Weather", icon: Thermometer },
                      { id: "travel", label: "Travel", icon: Plane },
                    ].map((tab) => (
                      <Button
                        key={tab.id}
                        variant="ghost"
                        className={`flex-1 py-4 px-6 rounded-none border-b-2 transition-all duration-300 ${
                          activeTab === tab.id
                            ? "border-orange-600 text-orange-600 bg-orange-50"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab(tab.id as "map" | "weather" | "travel")}
                      >
                        <tab.icon className="w-5 h-5 mr-2" />
                        {tab.label}
                      </Button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === "map" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="aspect-w-16 aspect-h-9 mb-6">
                          <iframe
                            src={mapUrl}
                            className="w-full h-96 rounded-lg border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Map of ${destination.name}`}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-orange-600" />
                            <div>
                              <div className="font-semibold text-gray-900">Coordinates</div>
                              <div className="text-gray-600">
                                {destination.location.coordinates[0]}°N, {destination.location.coordinates[1]}°E
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <Clock className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-semibold text-gray-900">Timezone</div>
                              <div className="text-gray-600">{destination.location.timezone}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "weather" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Climate Overview</h3>
                          <p className="text-gray-600">Plan your visit with detailed weather information</p>
                        </div>
                        <div className="grid gap-4">
                          {destination.weather.map((weather, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 * index }}
                              className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors duration-200"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{weather.season}</h4>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                  {weather.temperature}
                                </Badge>
                              </div>
                              <p className="text-gray-600">{weather.conditions}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "travel" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Getting There</h3>
                          <p className="text-gray-600">Transportation options and travel information</p>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <Plane className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold text-gray-900">Nearest Airport</h4>
                            </div>
                            <p className="text-gray-700">{destination.location.nearestAirport}</p>
                            <p className="text-sm text-gray-600 mt-1">Major international gateway with daily flights</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <Navigation className="w-5 h-5 text-green-600" />
                              <h4 className="font-semibold text-gray-900">Ground Transportation</h4>
                            </div>
                            <p className="text-gray-700">Private transfers, buses, and rental cars available</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Transfer time: 2-3 hours from airport to destination
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Facts Sidebar */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-green-50">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Country</div>
                      <div className="text-gray-600">{destination.country}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Continent</div>
                      <div className="text-gray-600">{destination.continent}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Best Time to Visit</div>
                      <div className="text-gray-600">{destination.bestTimeToVisit}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Trip Duration</div>
                      <div className="text-gray-600">{destination.duration}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Difficulty Level</div>
                      <Badge className="bg-orange-600 text-white">{destination.difficulty}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Essentials</h3>
                  <div className="space-y-4">
                    {destination.essentials.map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-orange-600 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationMap
