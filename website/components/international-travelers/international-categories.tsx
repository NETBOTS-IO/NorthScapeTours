"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Mountain,
  Telescope,
  Users,
  Compass,
} from "lucide-react";

const InternationalCategories = () => {
  const container = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { root: container, initial: true, once: true, margin: "-100px" });

  const iconMap: Record<string, React.ComponentType<any>> = {
  "pakistan visa help": Users,
  "best seller": Compass,
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const categoriesData = [
    {id:1, title:"Pakistan Visa Help", href: "/pakistanVisaHelp"},
    {id:2, title:"Best Seller",  href: "/bestSeller"}
  ]


  return (
    <section ref={container} className="section-padding bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
          International <span className="text-orange-600">Guides</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore Pakistan with our trusted international guides, offering expert knowledge and personalized experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categoriesData.map((category, index) => {
             const IconComponent = iconMap[category.title.toLowerCase()] || Mountain; 
            return (
              <motion.div key={index} variants={itemVariants} className=  "group">
                <Link href={`/international-travelers${category.href}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      rotateY: 5,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 group-hover:from-orange-500 group-hover:to-orange-700 transition-all duration-500`}
                    />
                    {/* Content */}
                    <div className="relative p-4 text-white">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                        {category.title}
                      </h3>
                    </div>
                    {/* Hover Effect Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        {/* Clear Filter Button */}
        {/* {selectedCategory && (
          <div className="text-center mt-8">
            <button
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => router.push("/trips")}
            >
              Clear Category Filter
            </button>
          </div>
        )} */}

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
      </div>
    </section>
  );
};

export default InternationalCategories;
