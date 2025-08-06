"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";

export default function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      // Auto-expand all cards on mobile
      if (isMobileView) {
        const allIds = testimonialsData.map((t) => t.id);
        setExpandedCards(new Set(allIds));
      }
    };
    // Initial check
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [testimonialsData]);

  useEffect(() => {
    if (expandedCards.has(currentTestimonial?.id || 0) && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [expandedCards, currentIndex]);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000) as any;
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying && testimonialsData.length > 0) {
      startAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, testimonialsData.length]);

  if (!testimonialsData || testimonialsData.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  const nextTestimonial = () => {
    if (testimonialsData.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    if (testimonialsData.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Star
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      </motion.div>
    ));
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      {!isMobile && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Travelers
            </span>{" "}
            Say
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Real stories from real adventurers who have experienced the magic of
            our journeys
          </motion.p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Controls */}
          <div className="flex justify-center items-center gap-2 mb-4 z-20 sticky top-0 backdrop-blur-sm py-2">
            <Button
              variant="outline"
              size={isMobile ? "icon" : "sm"}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 bg-white shadow-sm"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {!isMobile && (isAutoPlaying ? "Pause" : "Play")}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size={isMobile ? "icon" : "sm"}
                onClick={prevTestimonial}
                className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 bg-white shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "icon" : "sm"}
                onClick={nextTestimonial}
                className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 bg-white shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div
            ref={cardRef}
            className="relative min-h-[300px] md:min-h-[400px] transition-all duration-300 mb-2 md:mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-8 relative"
                whileHover={{
                  scale: !isMobile ? 1.02 : 1,
                  boxShadow: !isMobile
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "none",
                }}
              >
                <div className={`w-full ${isMobile ? "px-2" : "max-w-4xl"}`}>
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-orange-200"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Quote
                      className={`${isMobile ? "w-8 h-8" : "w-16 h-16"}`}
                    />
                  </motion.div>

                  <div
                    className={`${
                      isMobile ? "flex flex-col" : "grid md:grid-cols-3"
                    } gap-6 md:gap-8`}
                  >
                    {/* Left profile section */}
                    <div className="text-center">
                      <motion.div
                        className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4"
                        whileHover={{
                          rotate: !isMobile ? 5 : 0,
                          scale: !isMobile ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={currentTestimonial?.image || "/placeholder.svg"}
                          alt={currentTestimonial?.name || "Testimonial"}
                          fill
                          className="rounded-full object-cover border-4 border-orange-100"
                        />
                        {currentTestimonial?.verified && (
                          <motion.div
                            className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {currentTestimonial?.name}
                      </motion.h4>

                      <motion.p className="text-sm md:text-base text-gray-700 mb-2">
                        {currentTestimonial?.title}
                      </motion.p>

                      <motion.p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                        {currentTestimonial?.location}
                      </motion.p>

                      <motion.div className="flex justify-center gap-1 mb-3 md:mb-4">
                        {renderStars(currentTestimonial?.rating || 5)}
                      </motion.div>

                      <motion.div className="bg-gray-50 rounded-lg p-2 md:p-3 text-center">
                        <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                          {currentTestimonial?.tripName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currentTestimonial?.tripDate}
                        </p>
                      </motion.div>
                    </div>

                    {/* Right content section */}
                    <div
                      className={`${
                        isMobile ? "" : "md:col-span-2"
                      } pr-2 cursor-pointer flex flex-col justify-center min-h-[180px]`}
                      onClick={() =>
                        toggleExpanded(currentTestimonial?.id || 0)
                      }
                    >
                      <motion.div
                        className={`${
                          isMobile ? "text-base" : "text-lg md:text-xl"
                        } text-gray-700 leading-relaxed ${
                          expandedCards.has(currentTestimonial?.id || 0)
                            ? ""
                            : "line-clamp-3"
                        }`}
                        initial={false}
                        animate={{
                          height: expandedCards.has(currentTestimonial?.id || 0)
                            ? "auto"
                            : "4.5em",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentTestimonial?.content}
                      </motion.div>

                      {/* Highlights section remains the same */}
                      {currentTestimonial?.highlights && (
                        <motion.div
                          className="bg-white flex flex-wrap gap-2 justify-center md:justify-start mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentTestimonial.highlights.map(
                            (highlight, index) => (
                              <motion.span
                                key={index}
                                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs md:text-sm font-medium"
                              >
                                {highlight}
                              </motion.span>
                            )
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-orange-500 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-8 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            size={isMobile ? "default" : "lg"}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Adventure Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
