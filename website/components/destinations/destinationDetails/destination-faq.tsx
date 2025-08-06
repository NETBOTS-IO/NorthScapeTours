"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/data/destinations-data"

interface DestinationFAQProps {
  destination: Destination
}

const DestinationFAQ = ({ destination }: DestinationFAQProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([0])

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about this adventure
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {destination.faqs.map((faq, index) => {
              const isExpanded = expandedFAQs.includes(index)

              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <motion.div
                        className="p-6 cursor-pointer bg-gradient-to-r from-gray-50 to-orange-50 hover:from-orange-50 hover:to-green-50 transition-all duration-300"
                        onClick={() => toggleFAQ(index)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <HelpCircle className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0">
                          <div className="ml-12">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Contact CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <div className="bg-gradient-to-r from-orange-50 to-green-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">Our travel experts are here to help you plan the perfect adventure</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 font-semibold">
                  Contact Our Experts
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 font-semibold"
                >
                  Live Chat Support
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationFAQ
