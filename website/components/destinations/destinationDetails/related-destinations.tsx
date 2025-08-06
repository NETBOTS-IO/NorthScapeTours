"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Star, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getRelatedDestinations } from "@/data/destinations-data"

interface RelatedDestinationsProps {
  destinationId: number
}

const RelatedDestinations = ({ destinationId }: RelatedDestinationsProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const relatedDestinations = getRelatedDestinations(destinationId, 3)

  if (relatedDestinations.length === 0) {
    return null
  }

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
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              You Might Also <span className="text-orange-600">Like</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover more incredible adventures that match your interests
            </p>
          </motion.div>

          {/* Related Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedDestinations.map((destination, index) => (
              <motion.div key={destination.id} variants={itemVariants}>
                <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={destination.heroImage || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <Badge className="absolute top-4 left-4 bg-orange-600 text-white">{destination.category}</Badge>

                      {/* Featured Badge */}
                      {destination.featured && (
                        <Badge className="absolute top-4 right-4 bg-green-600 text-white">Featured</Badge>
                      )}

                      {/* Price */}
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-lg font-bold text-gray-900">
                          From ${destination.price.from.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{destination.country}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {destination.name}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{destination.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{destination.duration}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {destination.difficulty}
                        </Badge>
                      </div>

                      {/* CTA Button */}
                      <Link href={`/destinations/${destination.slug}`}>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group-hover:bg-green-600 transition-all duration-300">
                          Explore Trip
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/destinations">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 text-lg font-semibold"
              >
                View All Destinations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default RelatedDestinations
