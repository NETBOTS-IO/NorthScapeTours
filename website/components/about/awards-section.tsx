"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutAwards } from "@/data/about-data";
import { Award, Trophy, Star, Users } from "lucide-react";

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const iconMap = { Award, Trophy, Star, Users };

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

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Awards & <span className="text-orange-600">Recognition</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our commitment to excellence has been recognized by leading travel
            organizations worldwide
          </p>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {aboutAwards.map((award, index) => {
            const IconComponent = iconMap[award.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center`}
                  >
                    <IconComponent className={`w-6 h-6 ${award.color}`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800">
                        {award.title}
                      </h3>
                      <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-green-600 font-semibold mb-3">
                      {award.organization}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
