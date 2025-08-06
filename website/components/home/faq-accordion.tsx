"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What's included in your tour packages?",
      answer:
        "Our comprehensive tour packages include accommodation, meals, transportation, professional guides, entrance fees to attractions, and 24/7 support. Specific inclusions vary by package, and we provide detailed itineraries for each trip.",
    },
    {
      question: "How do I book a trip?",
      answer:
        "Booking is easy! You can book online through our website, call our travel experts, or visit our office. We require a deposit to secure your booking, with the balance due before departure. We accept various payment methods for your convenience.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies by trip type and timing. Generally, cancellations made 60+ days before departure receive a full refund minus processing fees. We strongly recommend travel insurance to protect your investment.",
    },
    {
      question: "Do you offer custom itineraries?",
      answer:
        "We specialize in creating personalized travel experiences. Our expert team will work with you to design a custom itinerary that matches your interests, budget, and schedule. Contact us to start planning your unique adventure.",
    },
    {
      question: "What safety measures do you have in place?",
      answer:
        "Safety is our top priority. We work with certified local guides, maintain comprehensive insurance coverage, provide safety briefings, and have 24/7 emergency support. All our trips are regularly assessed for safety and security.",
    },
    {
      question: "What should I pack for my trip?",
      answer:
        "Packing requirements vary by destination and season. We provide detailed packing lists for each trip, including essential items, recommended gear, and local considerations. Our team is always available to answer specific packing questions.",
    },
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Frequently Asked <span className="text-[#f5530c]">Questions</span>
          </h2>
          <p className="text-xl text-slate-600">Find answers to common questions about our travel services</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors duration-200 flex items-center justify-between"
                whileHover={{ backgroundColor: "#f1f5f9" }}
              >
                <span className="font-semibold text-slate-800">{faq.question}</span>
                <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
                      className="px-6 py-4 bg-white text-slate-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQAccordion
