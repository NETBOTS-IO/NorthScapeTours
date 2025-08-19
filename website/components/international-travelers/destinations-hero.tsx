"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const InternationTravelersHero = () => {
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
            Pakistan <span className="text-orange-600">Tourist</span> Visa Guides
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl text-slate-700 max-w-2xl mx-auto">
            The Pakistan Online Visa System is now open to citizens of 191 countries, allowing travelers from 50 countries to apply for a Tourist Visa and citizens of 95 countries to apply for a Business Visa through the convenient online application process.
          </motion.p>
        </motion.div>
      <div className="flex justify-center space-x-3 mt-8">
          <motion.div
          whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Link
                                    href={``}
                                    className="bg-orange-600 hover:bg-green-600 text-white py-3 px-6 font-semibold transition-all duration-300"
                                  >
                                    Apply Now
                                  </Link>
                                </motion.div>
                              </div>
      </div>
    </section>
  )
}

export default InternationTravelersHero
