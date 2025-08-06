"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const LocationMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="bg-slate-50 rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Find Us</h3>
      <div className="bg-slate-200 rounded-xl h-64 flex items-center justify-center overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6941889.752168339!2d70.79710410131756!3d31.836031273818065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e463929c086aa9%3A0xca8f5ecb0735b968!2sTour%20Maker%20Pakistan!5e0!3m2!1sen!2s!4v1750957330911!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{border:"0"}}
        //   allowfullscreen={}
          loading="lazy"
        //   referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="w-full" asChild>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="w-full">
            Schedule Visit
          </Button>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

export default LocationMap;
