"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { Shield, Award, Users, Globe, Clock, Heart, Star, CheckCircle, MapPin, Headphones } from "lucide-react"
import { useRouter } from "next/navigation"
const features = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "We prioritize your protection with certified guides, full insurance, and strict safety standards on every trip.",
    stats: "99.9% Safety Record",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    icon: Award,
    title: "Expert Guides",
    description:
      "Led by passionate local specialists with deep knowledge and years of proven travel expertise.",
    stats: "500+ Certified Experts",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Enjoy personalized attention, authentic cultural immersion, and close connections in intimate groups.",
    stats: "Groups Up to 15",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: Globe,
    title: "Worldwide Access",
    description:
      "Discover hidden gems, iconic sights, and extraordinary places across every continent.",
    stats: "80+ Countries",
    color: "from-fuchsia-500 to-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    borderColor: "border-fuchsia-200",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Dependable assistance before, during, and after your adventure, anytime you need it.",
    stats: "Always On Call",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    icon: Heart,
    title: "Eco-Friendly Travel",
    description:
      "Dedicated to sustainable tourism that supports communities and protects our planet.",
    stats: "Carbon Neutral",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
]

const achievements = [
  {
    icon: Star,
    number: "4.9",
    label: "Traveler Rating",
    description: "Based on over 10,000 glowing reviews",
  },
  {
    icon: CheckCircle,
    number: "15K+",
    label: "Adventurers Served",
    description: "Happy explorers across the globe",
  },
  {
    icon: MapPin,
    number: "500+",
    label: "Journeys Completed",
    description: "Unforgettable trips successfully delivered",
  },
  {
    icon: Headphones,
    number: "24/7",
    label: "Global Assistance",
    description: "Dedicated support whenever you need it",
  },
]


export default function WhyChooseUs() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const itemVariants: Variants = {
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

  const statsVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              NORTHSCAPE
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We’re dedicated to delivering unforgettable travel adventures that surpass your expectations and provide memories to cherish forever.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative bg-white p-8 rounded-2xl border-2 ${feature.borderColor} hover:shadow-xl transition-all duration-500 overflow-hidden`}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Background Pattern */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                  {/* Stats Badge */}
                  <motion.div
                    className={`inline-block ${feature.bgColor} ${feature.borderColor} border px-3 py-1 rounded-full text-sm font-semibold`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                  >
                    {feature.stats}
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Loved by Thousands of Explorers</h3>
            <p className="text-lg text-gray-400">Our pursuit of excellence is demonstrated by our achievements.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.6, delay: index * 0.1 + 1.0 }}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 1.2 }}
                  >
                    {achievement.number}
                  </motion.div>

                  <div className="text-lg font-semibold text-gray-800 mb-1">{achievement.label}</div>

                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row gap-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={()=>router.push("/trips")}
            >
              Start Your Adventure
            </button>
            <button onClick={()=>{router.push('/about')}} className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300"
              >
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
