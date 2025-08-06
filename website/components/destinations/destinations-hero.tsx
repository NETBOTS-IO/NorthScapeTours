"use client"

import { motion } from "framer-motion"

const DestinationsHero = () => {
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

  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div variants={backgroundVariants} initial="initial" animate="animate" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/images/marsur-rock.jpg?height=400&width=1920)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-green-600/20" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <motion.h1 variants={childVariants} className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
            Explore <span className="text-orange-600">Destinations</span>
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl text-slate-700 max-w-2xl mx-auto">
            Discover breathtaking locations and plan your next adventure with our curated collection of world-class
            destinations
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationsHero
