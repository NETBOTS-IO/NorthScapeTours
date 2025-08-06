"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const AboutHero = () => {
  const backgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
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
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div variants={backgroundVariants} initial="initial" animate="animate" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/placeholder.svg?height=800&width=1920)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <motion.h1 variants={childVariants} className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Our <span className="text-orange-600">Story</span>
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
            For over 15 years, we've been crafting extraordinary travel experiences that connect people with the world's
            most incredible destinations
          </motion.p>
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
              Learn More About Us
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              <span>Watch Our Story</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero
