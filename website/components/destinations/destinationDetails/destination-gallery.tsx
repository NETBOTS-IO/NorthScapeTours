"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/data/destinations-data"

interface DestinationGalleryProps {
  destination: Destination
}

const DestinationGallery = ({ destination }: DestinationGalleryProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % destination.gallery.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? destination.gallery.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Photo <span className="text-orange-600">Gallery</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a glimpse of the incredible experiences waiting for you
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.gallery.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${destination.name} gallery image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                  >
                    <ZoomIn className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Image Number */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {index + 1} / {destination.gallery.length}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/20 backdrop-blur-sm rounded-full p-3"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/20 backdrop-blur-sm rounded-full p-3"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={destination.gallery[selectedImage]}
              alt={`${destination.name} gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedImage + 1} / {destination.gallery.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default DestinationGallery
