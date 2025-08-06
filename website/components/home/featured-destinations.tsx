"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { destinationsData } from "@/data/destinations-data";

// const destinations = [
//   {
//     id: 1,
//     name: "Santorini, Greece",
//     image: "images/sunset.jpg?height=400&width=600",
//     rating: 4.9,
//     reviews: 2847,
//     price: "$2,499",
//     duration: "7 days",
//     groupSize: "12 people",
//     description: "Experience the magic of white-washed buildings and stunning sunsets",
//     highlights: ["Sunset in Oia", "Wine Tasting", "Volcanic Beaches"],
//   },
//   {
//     id: 2,
//     name: "Kyoto, Japan",
//     image: "images/sunset.jpg?height=400&width=600",
//     rating: 4.8,
//     reviews: 1923,
//     price: "$3,299",
//     duration: "10 days",
//     groupSize: "8 people",
//     description: "Discover ancient temples and traditional Japanese culture",
//     highlights: ["Bamboo Forest", "Temple Visits", "Tea Ceremony"],
//   },
//   {
//     id: 3,
//     name: "Machu Picchu, Peru",
//     image: "images/sunset.jpg?height=400&width=600",
//     rating: 4.9,
//     reviews: 3156,
//     price: "$2,899",
//     duration: "8 days",
//     groupSize: "15 people",
//     description: "Trek to the ancient Incan citadel high in the Andes",
//     highlights: ["Inca Trail", "Sacred Valley", "Local Markets"],
//   },
// ]

export default function FeaturedDestinations() {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Destinations
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore our handpicked selection of extraordinary destinations that
            promise unforgettable experiences and breathtaking adventures.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {destinationsData.slice(0, 3).map((destination, index) => (
            <motion.div
              key={destination.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={destination.heroImage || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Price Badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full font-semibold"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  ${destination.price.from}
                </motion.div>

                {/* Rating */}
                <motion.div
                  className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                  viewport={{ once: true }}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {destination.rating}
                  </span>
                  <span className="text-xs text-gray-600">
                    ({destination.reviewCount})
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  className="flex items-center text-gray-500 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.9 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{destination.country}</span>
                </motion.div>

                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 1.1 }}
                  viewport={{ once: true }}
                >
                  {destination.name}
                </motion.h3>

                <motion.div
                  className="flex items-center justify-between text-sm text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 1.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {destination.groupSize}
                  </div>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 1.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, highlightIndex) => (
                      <motion.span
                        key={highlightIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + 1.7 + highlightIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 1.9 }}
                  viewport={{ once: true }}
                >
                  <Button
                    onClick={() =>
                      router.push(`/destinations/${destination.slug}`)
                    }
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group"
                  >
                    Explore Now
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/destinations")}
            className="border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-full bg-white transition-all duration-300"
          >
            View All Destinations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
