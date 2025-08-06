"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { aboutValues } from "@/data/about-data"
import { Heart, Shield, Leaf, Users, Globe, Star } from "lucide-react"

const ValuesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const iconMap = { Heart, Shield, Leaf, Users, Globe, Star }

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Our <span className="text-orange-600">Values</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            These core principles guide everything we do and shape the experiences we create for our travelers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {aboutValues.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap]
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
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-16 h-16 ${value.bgColor} rounded-full mb-6`}
                >
                  <IconComponent className={`w-8 h-8 ${value.color}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default ValuesSection
