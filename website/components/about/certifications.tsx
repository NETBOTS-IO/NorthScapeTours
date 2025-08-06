"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { aboutCertifications } from "@/data/about-data";
import { useRef } from "react";

// Framer Motion variant for the continuous scrolling animation
const marqueeVariants = {
  animate: {
    x: [0, -1600],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 50,
        ease: "linear" as const,
      },
    },
  },
};

const CertificationsSection = () => {
  const ref = useRef(null);
  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">
            Certifications & Memberships
          </h3>
          <div className="relative overflow-hidden py-4 marquee-container">
            <motion.div
              className="flex marquee-content"
              variants={marqueeVariants}
              animate="animate"
            >
              {/* We map over the certifications twice to ensure a seamless loop */}
              {[...aboutCertifications, ...aboutCertifications].map(
                (cert, index) => (
                  <div
                    key={`${cert.name}-${index}`}
                    className="px-6 mx-4 flex-shrink-0"
                  >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 128px, 160px"
                      />
                    </div>
                    {/* <p className="text-center mt-2 text-sm font-medium text-slate-600">
                      {cert.name}
                    </p> */}
                  </div>
                )
              )}
            </motion.div>

            {/* Gradient fade effect on sides */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
