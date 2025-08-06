"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, ChevronUp, Utensils, Bed, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Destination } from "@/data/destinations-data"

interface DestinationItineraryProps {
  destination: Destination
}

const DestinationItinerary = ({ destination }: DestinationItineraryProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedDays, setExpandedDays] = useState<number[]>([1])

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) => (prev.includes(dayNumber) ? prev.filter((d) => d !== dayNumber) : [...prev, dayNumber]))
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
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Detailed <span className="text-orange-600">Itinerary</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow your day-by-day journey through this incredible adventure
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-600 via-green-600 to-orange-600 hidden md:block" />

            <div className="space-y-8">
              {destination.itinerary.map((day, index) => {
                const isExpanded = expandedDays.includes(day.day)

                return (
                  <motion.div key={day.day} variants={itemVariants} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-lg hidden md:block" />

                    <Card className="ml-0 md:ml-20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        {/* Day Header */}
                        <motion.div
                          className="p-6 bg-gradient-to-r from-orange-50 to-green-50 cursor-pointer"
                          onClick={() => toggleDay(day.day)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Badge className="bg-orange-600 text-white px-3 py-1 text-sm font-bold">
                                Day {day.day}
                              </Badge>
                              <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </Button>
                          </div>
                          <p className="text-gray-600 mt-2">{day.description}</p>
                        </motion.div>

                        {/* Expanded Content */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 space-y-6">
                            {/* Activities */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-orange-600" />
                                Activities
                              </h4>
                              <div className="grid md:grid-cols-2 gap-2">
                                {day.activities.map((activity, actIndex) => (
                                  <motion.div
                                    key={actIndex}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * actIndex }}
                                    className="flex items-center gap-2 p-2 rounded bg-gray-50"
                                  >
                                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                                    <span className="text-gray-700">{activity}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Accommodation & Meals */}
                            <div className="grid md:grid-cols-2 gap-6">
                              {day.accommodation && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Bed className="w-4 h-4 text-green-600" />
                                    Accommodation
                                  </h4>
                                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{day.accommodation}</p>
                                </div>
                              )}

                              {day.meals && day.meals.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Utensils className="w-4 h-4 text-orange-600" />
                                    Meals Included
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {day.meals.map((meal, mealIndex) => (
                                      <Badge
                                        key={mealIndex}
                                        variant="secondary"
                                        className="bg-orange-100 text-orange-800"
                                      >
                                        {meal}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Expand All Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              onClick={() => {
                const allDays = destination.itinerary.map((d) => d.day)
                setExpandedDays(expandedDays.length === allDays.length ? [] : allDays)
              }}
              variant="outline"
              className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 font-semibold"
            >
              {expandedDays.length === destination.itinerary.length ? "Collapse All" : "Expand All Days"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationItinerary
