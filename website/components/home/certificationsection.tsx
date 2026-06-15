"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    id: 1,
    image: "/images/c2.jpeg",
    title: "FBR Registered",
  },
  {
    id: 2,
    image: "/images/c1.jpeg",
    title: "SECP",
  },
  {
    id: 3,
    image: "/images/c3.jpeg",
    title: "Tourism Department",
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-slate-900 leading-tight font-serif">
            Licensed & Registered
          </h2>

          <p className="mt-4 max-w-3xl mx-auto font-sans text-base md:text-lg leading-6 text-slate-600">
            NorthScape Pakistan operates under official registrations and tourism
            licenses, demonstrating our commitment to professionalism,
            transparency, and trusted travel services across Pakistan.
          </p>
        </motion.div>

        {/* Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -6,
              }}
              className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center h-40">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-6 text-center text-lg font-semibold text-slate-900">
                {certificate.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}