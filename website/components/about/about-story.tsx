"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutMilestones, aboutFounders } from "@/data/about-data";
import { Calendar, Users, Globe, Award } from "lucide-react";
import Image from "next/image";

const iconMap = { Calendar, Users, Globe, Award };

const AboutStory = () => {
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

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
            Our <span className="text-orange-600">Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            From humble beginnings to becoming a trusted name in adventure
            travel, our story is one of passion, dedication, and an unwavering
            commitment to creating unforgettable experiences.
          </p>
        </motion.div>

        {/* Founders image section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
          >
            <Image
              src={aboutFounders.image ?? "/placeholder.svg"}
              alt={aboutFounders.alt}
              fill
              className="rounded-2xl md:rounded-3xl shadow-md object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              placeholder={aboutFounders.image ? undefined : "blur"}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Born from a Love of{" "}
              <span className="text-green-600">Adventure</span>
            </h3>
            {aboutFounders.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-slate-600 leading-relaxed text-base sm:text-lg"
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-2">
              {aboutFounders.stats.map((stat, i) => (
                <div className="text-center min-w-[100px]" key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative px-4 sm:px-6"
        >
          {/* Vertical line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></div>

          <div className="space-y-10 md:space-y-16">
            {aboutMilestones.map((milestone, index) => {
              const IconComponent =
                iconMap[milestone.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Mobile layout (single column) */}
                  <div className="md:hidden flex flex-col items-center">
                    <div className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white border-4 border-orange-600 rounded-full shadow-lg mb-4">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    {/* {milestone.image && (
                      <div className="w-full h-48 sm:h-56 relative mb-4 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )} */}
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

                  {/* Desktop layout (alternating sides) */}
                  <div className="hidden md:flex items-center justify-center">
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                      }`}
                    >
                      {index % 2 === 0 && (
                        <>
                          {/* {milestone.image && (
                            <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden shadow-md">
                              <Image
                                src={milestone.image}
                                alt={milestone.title}
                                fill
                                className="object-cover"
                                sizes="50vw"
                              />
                            </div>
                          )} */}
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
                        </>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-orange-600 rounded-full shadow-lg mx-2">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>

                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "" : "pl-8 text-left"
                      }`}
                    >
                      {index % 2 !== 0 && (
                        <>
                          {/* {milestone.image && (
                            <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden shadow-md">
                              <Image
                                src={milestone.image}
                                alt={milestone.title}
                                fill
                                className="object-cover"
                                sizes="50vw"
                              />
                            </div>
                          )} */}
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
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;
