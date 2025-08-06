"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Star, MapPin, Clock, Users, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/data/destinations-data"

interface DestinationDetailHeroProps {
  destination: Destination
}

const DestinationDetailHero = ({ destination }: DestinationDetailHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      },
    },
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Challenging":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Expert":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
      >
        {/* Category Badge */}
        <motion.div variants={badgeVariants} className="mb-6">
          <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm font-semibold">
            {destination.category}
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {destination.name}
        </motion.h1>

        {/* Location */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-orange-400" />
          <span className="text-xl text-gray-200">{destination.country}</span>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
          {destination.description}
        </motion.p>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{destination.rating}</span>
            <span className="text-gray-300">({destination.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-white">{destination.duration}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-white">{destination.groupSize}</span>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 border ${getDifficultyColor(destination.difficulty)}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">{destination.difficulty}</span>
          </div>
        </motion.div>

        {/* Price and CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">From ${destination.price.from.toLocaleString()}</div>
            <div className="text-gray-300">per person</div>
          </div>

          {/* <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
            >
              Learn More
            </Button>
          </div> */}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default DestinationDetailHero
