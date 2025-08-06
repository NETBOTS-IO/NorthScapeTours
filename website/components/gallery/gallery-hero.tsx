"use client"

import { motion } from "framer-motion"
import { Camera, ImageIcon } from "lucide-react"

const GalleryHero = () => {
  const backgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  }

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants = {
    initial: { y: 30, opacity: 0 },
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

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      },
    },
  }

  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div variants={backgroundVariants} initial="initial" animate="animate" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url(/Images/mountain.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-green-600/20" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <motion.div variants={iconVariants} className="flex justify-center mb-6">
            <div className="relative">
              <Camera className="w-16 h-16 text-orange-600" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <ImageIcon className="w-8 h-8 text-green-600" />
              </motion.div>
            </div>
          </motion.div>
          <motion.h1 variants={childVariants} className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
            Photo <span className="text-orange-600">Gallery</span>
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl text-slate-700 max-w-2xl mx-auto">
            Explore stunning photography from our adventures around the world and get inspired for your next journey
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default GalleryHero
