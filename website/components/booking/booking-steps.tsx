"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Calendar, CreditCard, CheckCircle } from "lucide-react"

const BookingSteps = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: Search,
      title: "Choose Your Adventure",
      description: "Browse our destinations and select the perfect trip for your interests and schedule.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calendar,
      title: "Select Dates",
      description: "Pick your preferred departure date and check availability for your chosen adventure.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete your booking with our secure payment system and flexible payment options.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "Receive instant confirmation and detailed trip information to prepare for your adventure.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            How to <span className="text-orange-600">Book</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Follow these simple steps to secure your spot on an amazing adventure
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-full mb-6`}
                  >
                    <IconComponent className={`w-8 h-8 ${step.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-600 to-green-600 transform -translate-y-1/2" />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default BookingSteps
