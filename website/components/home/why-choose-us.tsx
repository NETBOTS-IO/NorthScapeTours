"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Award, Users, Globe, Clock, Heart, Star, CheckCircle, MapPin, Headphones } from "lucide-react"
import { useRouter } from "next/navigation"
const features = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our top priority with certified guides, comprehensive insurance coverage, and rigorous safety protocols.",
    stats: "99.9% Safety Record",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Award,
    title: "Expert Guides",
    description:
      "Local experts with years of experience, deep destination knowledge, and passion for sharing their culture.",
    stats: "500+ Certified Guides",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Intimate group sizes ensure personalized attention, authentic experiences, and meaningful connections.",
    stats: "Max 15 People",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access to exclusive destinations, hidden gems, and off-the-beaten-path locations around the world.",
    stats: "75+ Countries",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance before, during, and after your journey with dedicated support team.",
    stats: "Always Available",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    icon: Heart,
    title: "Sustainable Travel",
    description: "Committed to responsible tourism that benefits local communities and preserves natural environments.",
    stats: "Carbon Neutral",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
]

const achievements = [
  {
    icon: Star,
    number: "4.9",
    label: "Average Rating",
    description: "Based on 10,000+ reviews",
  },
  {
    icon: CheckCircle,
    number: "15K+",
    label: "Happy Travelers",
    description: "Satisfied customers worldwide",
  },
  {
    icon: MapPin,
    number: "500+",
    label: "Adventures Completed",
    description: "Successful trips organized",
  },
  {
    icon: Headphones,
    number: "24/7",
    label: "Customer Support",
    description: "Always here to help",
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

  const statsVariants = {
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
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              NORTHSCAPE
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're committed to creating extraordinary travel experiences that exceed your expectations and create
            memories that last a lifetime.
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands of Travelers</h3>
            <p className="text-lg text-gray-600">Our commitment to excellence is reflected in our achievements</p>
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
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Adventure
            </button>
            <button onClick={()=>{router.push('/about')}} className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300">
              Learn More About Us
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
