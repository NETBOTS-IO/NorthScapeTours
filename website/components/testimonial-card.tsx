"use client"

import { motion } from "framer-motion"
import { Star, CheckCircle, MapPin, Calendar, Quote } from "lucide-react"
import type { Testimonial } from "@/data/testimonials"

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  isHovered?: boolean
  onHover?: (id: number | null) => void
}

const TestimonialCard = ({ testimonial, index, isHovered, onHover }: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -15,
        scale: 1.03,
        rotateY: 5,
        transition: { type: "spring", stiffness: 300 },
      }}
      onHoverStart={() => onHover?.(testimonial.id)}
      onHoverEnd={() => onHover?.(null)}
      className="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 border border-gray-700 hover:border-[#f5530c]/50 transition-all duration-500 overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5530c]/5 via-transparent to-[#06901c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating Quote Icon */}
      <motion.div
        className="absolute top-4 right-4 opacity-10 group-hover:opacity-20"
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        <Quote className="w-12 h-12 text-[#f5530c]" />
      </motion.div>

      <div className="relative z-10">
        {/* Header with Rating and Verification */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
          {testimonial.verified && (
            <motion.div
              className="flex items-center gap-2 bg-[#06901c]/20 border border-[#06901c]/30 rounded-full px-3 py-1"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle className="w-4 h-4 text-[#06901c]" />
              <span className="text-[#06901c] text-xs font-medium">Verified</span>
            </motion.div>
          )}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-300 mb-6 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
          "{testimonial.text}"
        </blockquote>

        {/* Trip Info */}
        <div className="bg-[#f5530c]/10 border border-[#f5530c]/20 rounded-xl p-3 mb-6">
          <div className="text-[#f5530c] font-semibold text-sm">{testimonial.trip}</div>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{testimonial.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{testimonial.location}</span>
            </div>
          </div>
        </div>

        {/* Customer Profile */}
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#f5530c] shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#06901c] rounded-full border-2 border-gray-900 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </motion.div>

          <div className="flex-1">
            <div className="font-bold text-white text-base group-hover:text-[#f5530c] transition-colors duration-300">
              {testimonial.name}
            </div>
            <div className="text-[#f5530c] text-sm font-medium">{testimonial.title}</div>
            {testimonial.company && <div className="text-gray-400 text-xs">{testimonial.company}</div>}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f5530c]/20 to-[#06901c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </motion.div>
  )
}

export default TestimonialCard
