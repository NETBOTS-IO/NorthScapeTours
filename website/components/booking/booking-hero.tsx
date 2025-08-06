"use client"

import { motion } from "framer-motion"
import { Shield, Clock, CreditCard } from "lucide-react"

const BookingHero = () => {
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

  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "SSL encrypted payments",
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Immediate booking confirmation",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options",
    },
  ]

  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div variants={backgroundVariants} initial="initial" animate="animate" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/placeholder.svg?height=400&width=1920)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-green-600/20" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div variants={textVariants} initial="initial" animate="animate">
          <motion.h1 variants={childVariants} className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
            Book Your <span className="text-orange-600">Adventure</span>
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Secure your spot on an unforgettable journey with our easy booking process and flexible payment options
          </motion.p>

          {/* Features */}
          <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                >
                  <IconComponent className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">{feature.title}</div>
                    <div className="text-sm text-slate-600">{feature.description}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingHero
