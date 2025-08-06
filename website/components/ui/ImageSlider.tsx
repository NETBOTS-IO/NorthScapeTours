"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: string[];
  currentIndex?: number;
  interval?: number;
  className?: string;
}

export const ImageSlider = ({
  images = [],
  currentIndex = 0,
  interval = 5000,
  className = "",
}: ImageSliderProps) => {
  const [index, setIndex] = useState(currentIndex);
  const [direction, setDirection] = useState(1);

  // Handle both controlled and uncontrolled modes
  useEffect(() => {
    if (currentIndex !== undefined) {
      setIndex(currentIndex);
    }
  }, [currentIndex]);

  // Auto-cycling logic for uncontrolled mode
  useEffect(() => {
    if (currentIndex !== undefined || images.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, currentIndex]);

  if (!images || images.length === 0) return null;

  const displayIndex = currentIndex !== undefined ? currentIndex : index;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={`${images[displayIndex]}-${displayIndex}`}
          src={images[displayIndex]}
          alt={`Gallery image ${displayIndex + 1}`}
          className="w-full h-full object-cover"
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
      </AnimatePresence>
    </div>
  );
};
