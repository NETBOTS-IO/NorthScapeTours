"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "TRAVELMAKER exceeded all my expectations! The Everest Base Camp trek was perfectly organized, and our guide was incredibly knowledgeable. This was truly a life-changing experience.",
      image: "/placeholder.svg?height=80&width=80",
      trip: "Everest Base Camp Trek",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "The African safari was absolutely incredible. Every detail was taken care of, from luxury accommodations to expert guides. I saw the Big Five and so much more!",
      image: "/placeholder.svg?height=80&width=80",
      trip: "African Safari Expedition",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "Our family adventure in Costa Rica was perfect for all ages. The kids loved the wildlife, and we adults enjoyed the cultural experiences. Highly recommend TRAVELMAKER!",
      image: "/placeholder.svg?height=80&width=80",
      trip: "Costa Rica Family Adventure",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "London, UK",
      rating: 5,
      text: "The Patagonia wilderness trek was challenging but incredibly rewarding. The landscapes were breathtaking, and the small group size made it feel very personal.",
      image: "/placeholder.svg?height=80&width=80",
      trip: "Patagonia Wilderness Trek",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-[#f5530c]">Travelers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real experiences from real adventurers who trusted us with their dream journeys
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-[#040404] rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[#f5530c] opacity-20" />

            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentTestimonial
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-full absolute inset-0 p-8 md:p-12"
                }`}
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-center text-gray-200 mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#f5530c]"
                  />
                  <div className="text-center">
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.location}</div>
                    <div className="text-[#f5530c] text-sm font-medium">{testimonial.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#f5530c] hover:bg-[#e04a0b] text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#f5530c] hover:bg-[#e04a0b] text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-[#f5530c]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
