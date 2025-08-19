"use client"

import { visaHelpData } from '@/data/visa-data';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react'
import { 
  UserPlus, 
  FileText, 
  CreditCard, 
  MailCheck 
} from "lucide-react";
import Link from 'next/link';

const page = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

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
  };

  const iconMap = { UserPlus, FileText, CreditCard, MailCheck };

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ✅ Intro Row with description & video */}
        <div className="bg-gray-50 py-16 flex justify-center rounded-md mb-4">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-8">
    {/* Left: Static Description */}
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4">
        Pakistan Online Visa System
      </h2>
      <p className="text-slate-700 text-lg leading-relaxed">
        Apply for your Pakistani visa from anywhere in the world with our
        streamlined online system. Register, submit your application, pay
        securely, and receive your visa without visiting an embassy.
      </p>
      <div className="flex space-x-3 mt-8">
                <motion.div
                whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Link
                                          href={``}
                                          className="bg-orange-600 text-white py-3 px-6 font-semibold transition-all duration-300"
                                        >
                                          Apply Now
                                        </Link>
                                      </motion.div>
                                    </div>
    </div>

    {/* Right: Video */}
    <div className="flex-1 w-full flex justify-center">
      <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/B4uvnXDroms?si=F44JDvprL7uyUkiW"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</div>


        {/* ✅ Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></div>

          <div className="space-y-10 md:space-y-16">
            {visaHelpData.map((milestone, index) => {
              const IconComponent = iconMap[milestone.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white border-4 border-orange-600 rounded-full shadow-lg mb-4">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-200 w-full"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-600 text-base sm:text-lg">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:flex items-center justify-center">
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                    >
                      {index % 2 === 0 && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
                        >
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            {milestone.year}
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 mb-3">
                            {milestone.title}
                          </h4>
                          <p className="text-slate-600">
                            {milestone.description}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-orange-600 rounded-full shadow-lg mx-2">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>

                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "" : "pl-8 text-left"}`}
                    >
                      {index % 2 !== 0 && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
                        >
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            {milestone.year}
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 mb-3">
                            {milestone.title}
                          </h4>
                          <p className="text-slate-600">
                            {milestone.description}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
        {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center mt-16"
              >
                <p className="text-slate-600 mb-6">
                  Can't find what you're looking for?
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/contact" className="btn-outline">
                    Request Custom Adventure
                  </Link>
                </motion.div>
              </motion.div>
    </section>
  )
}

export default page
