"use client"

import { useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const faqs: FAQItem[] = [
    {
      question: "What's included in your tour packages?",
      answer:
        "Our comprehensive tour packages include accommodation, meals, transportation, professional guides, entrance fees to attractions, and 24/7 support. Specific inclusions vary by package, and we provide detailed itineraries for each trip. We also include travel insurance recommendations and pre-trip briefings.",
      category: "Booking",
    },
    {
      question: "How do I book a trip?",
      answer:
        "Booking is easy! You can book online through our website, call our travel experts, or visit our office. We require a deposit to secure your booking, with the balance due before departure. We accept various payment methods including credit cards, bank transfers, and payment plans for longer trips.",
      category: "Booking",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies by trip type and timing. Generally, cancellations made 60+ days before departure receive a full refund minus processing fees. Cancellations 30-59 days before departure receive 75% refund, and cancellations within 30 days receive 50% refund. We strongly recommend travel insurance to protect your investment.",
      category: "Booking",
    },
    {
      question: "Do you offer custom itineraries?",
      answer:
        "We specialize in creating personalized travel experiences. Our expert team will work with you to design a custom itinerary that matches your interests, budget, schedule, and fitness level. Custom trips can be arranged for individuals, families, or private groups.",
      category: "Planning",
    },
    {
      question: "What safety measures do you have in place?",
      answer:
        "Safety is our top priority. We work with certified local guides, maintain comprehensive insurance coverage, provide safety briefings, and have 24/7 emergency support. All our trips are regularly assessed for safety and security, and we follow international safety standards for adventure travel.",
      category: "Safety",
    },
    {
      question: "What should I pack for my trip?",
      answer:
        "Packing requirements vary by destination and season. We provide detailed packing lists for each trip, including essential items, recommended gear, and local considerations. Our team is always available to answer specific packing questions and can recommend gear suppliers if needed.",
      category: "Planning",
    },
    {
      question: "Do you provide travel insurance?",
      answer:
        "While we don't provide insurance directly, we strongly recommend comprehensive travel insurance and can recommend trusted providers. Insurance should cover trip cancellation, medical emergencies, evacuation, and gear loss. We can help you understand what coverage you need for your specific trip.",
      category: "Safety",
    },
    {
      question: "What fitness level is required for your trips?",
      answer:
        "Fitness requirements vary by trip. We clearly indicate difficulty levels for each adventure - from easy cultural tours suitable for all ages to challenging expeditions requiring excellent fitness. We provide detailed fitness guidelines and training recommendations for each trip level.",
      category: "Planning",
    },
    {
      question: "Can I join a trip if I'm traveling solo?",
      answer:
        "Many of our travelers are solo adventurers, and we welcome single travelers on all our group trips. We can arrange single accommodations (with a supplement) or help match you with a roommate. Solo travel is a great way to meet like-minded adventurers.",
      category: "Booking",
    },
    {
      question: "What happens if weather affects my trip?",
      answer:
        "Weather is part of adventure travel! We monitor conditions closely and have contingency plans for weather-related changes. If severe weather makes travel unsafe, we'll modify itineraries or provide alternative activities. Safety always comes first, and we'll work to ensure you still have an amazing experience.",
      category: "Safety",
    },
  ]

  const categories = ["All", "Booking", "Planning", "Safety"]

  const filteredFAQs = activeCategory === "All" ? faqs : faqs.filter((faq) => faq.category === activeCategory)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

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
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-orange-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
          </div>
          <p className="text-xl text-slate-600">
            Find answers to common questions about our travel services and booking process
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors duration-200 flex items-center justify-between"
                whileHover={{ backgroundColor: "#f1f5f9" }}
              >
                <div className="flex items-start space-x-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      faq.category === "Booking"
                        ? "bg-blue-100 text-blue-700"
                        : faq.category === "Planning"
                          ? "bg-green-100 text-green-700"
                          : faq.category === "Safety"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {faq.category}
                  </span>
                  <span className="font-semibold text-slate-800 flex-1">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-slate-600" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-5 bg-white text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Still Have Questions?</h3>
          <p className="text-slate-600 mb-6">Our travel experts are here to help you plan the perfect adventure</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
              Contact Our Experts
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-outline">
              Schedule a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
