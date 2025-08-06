"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react"

const ContactInfo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["(0320) 507-7123", "(0355) 575-8727"],
      description: "Speak directly with our travel experts",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["Info@northscapetours.com", "bookings@travelmaker.com"],
      description: "Get detailed responses to your inquiries",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: ["Available 24/7", "Instant responses"],
      description: "Chat with our support team in real-time",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Office # 02 benazir road Sukmaidan, skardu"],
      description: "Meet us in person for personalized planning",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]

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
    hidden: { y: 30, opacity: 0 },
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
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <motion.div variants={itemVariants} className="bg-slate-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Get In Touch</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${method.bgColor} rounded-lg mb-4`}>
                  <IconComponent className={`w-6 h-6 ${method.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">{method.title}</h4>
                <div className="space-y-1 mb-3">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-slate-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-slate-600 text-sm">{method.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Office Hours */}
      <motion.div variants={itemVariants} className="bg-slate-50 rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 text-orange-600 mr-3" />
          <h3 className="text-2xl font-bold text-slate-800">Office Hours</h3>
        </div>
        <div className="space-y-3">
          {officeHours.map((schedule, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0"
            >
              <span className="font-medium text-slate-700">{schedule.day}</span>
              <span className="text-slate-600">{schedule.hours}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Emergency Support Available 24/7</span>
          </div>
          <p className="text-green-700 text-sm mt-1">For travelers currently on trips</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactInfo
