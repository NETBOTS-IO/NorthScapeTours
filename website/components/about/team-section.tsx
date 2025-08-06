"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { aboutTeam } from "@/data/about-data";

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Meet Our <span className="text-orange-600">Team</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our passionate team of travel experts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {aboutTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              whileHover="hover"
            >
              {/* Card Content */}
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Location Chip - Hidden on Hover */}
                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity duration-200">
                  <div className="backdrop-blur-sm bg-white/20 rounded-full px-2 py-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-white" />
                    <span className="text-white text-xs">
                      {member.location}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay - Shows Name and Role */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-orange-300 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>

              {/* Social Icons - Fixed Below Card */}
              <motion.div
                className="mt-3 flex justify-center space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {[Mail, Linkedin, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ y: -3 }}
                    className="p-2 bg-slate-100 hover:bg-orange-100 rounded-full text-slate-600 hover:text-orange-600 transition-colors"
                    href={
                      i === 0
                        ? `mailto:${member.social.email}`
                        : i === 1
                        ? member.social.linkedin
                        : member.social.twitter
                    }
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
