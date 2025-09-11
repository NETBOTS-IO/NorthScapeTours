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
      question: "Is Northscape Pakistan a registered travel company?",
      answer:
        "Yes. Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd is officially registered with the Government of Pakistan, ensuring professionalism, reliability, and trust.",
    },
    {
      question: "Which destinations do you cover?",
      answer:
        "We specialize in Northern Pakistan, particularly Skardu and Hunza. We also organize cultural and city tours in Islamabad, Lahore, and other major destinations.",
    },
    {
      question: "What types of tours do you offer?",
      answer:
        "We offer guided cultural tours, adventure trips, luxury tours, family holidays, and customized itineraries for individuals, groups, and corporate clients.",
    },
    {
      question: "Can you design tailor-made itineraries?",
      answer:
        "Yes. Every traveler is unique, and we create personalized itineraries based on your interests, budget, and time.",
    },
    {
      question: "What is included in your tour packages?",
      answer:
        "Our packages typically include: Accommodation in carefully selected hotels Private transportation with professional drivers Sightseeing and guided tours Tour planning and support Additional services like meals, flights, and special activities can also be arranged on request.",
    },
    {
      question: "Do you provide transport-only services?",
      answer:
        "Yes. Through our Northscape Car Rentals, we provide vehicles with professional drivers for individuals, families, and groups.",
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
          <p className="text-xl text-slate-400">Find answers to common questions about our travel services</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-orange-200 rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left bg-slate-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-between"
                whileHover={{ backgroundColor: "#f1f5f9" }}
              >
                <span className="font-semibold text-slate-800">{faq.question}</span>
                <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-orange-600" />
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
