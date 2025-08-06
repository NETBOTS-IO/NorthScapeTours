"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroVideos } from "@/data/hero-videos"

export default function VideoHeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const [isAutoplay, setIsAutoplay] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const autoplayTimeout = useRef<NodeJS.Timeout>( null )

  const currentVideo = heroVideos[currentVideoIndex]

  // Preload next video
  const preloadNextVideo = useCallback(
    (index: number) => {
      const nextIndex = (index + 1) % heroVideos.length
      if (!loadedVideos.has(nextIndex)) {
        const video = document.createElement("video")
        video.src = heroVideos[nextIndex].videoUrl
        video.preload = "metadata"
        video.onloadedmetadata = () => {
          setLoadedVideos((prev) => new Set([...prev, nextIndex]))
        }
      }
    },
    [loadedVideos],
  )

  // Handle video change
  const changeVideo = useCallback(
    (newIndex: number) => {
      setIsLoading(true)
      setCurrentVideoIndex(newIndex)
      preloadNextVideo(newIndex)
    },
    [preloadNextVideo],
  )

  // Auto-advance to next video
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimeout.current = setTimeout(() => {
        changeVideo((currentVideoIndex + 1) % heroVideos.length)
      }, currentVideo.duration * 1000)
    }
    return () => {
      if (autoplayTimeout.current) {
        clearTimeout(autoplayTimeout.current)
      }
    }
  }, [currentVideoIndex, isAutoplay, currentVideo.duration, changeVideo])

  // Handle video events
  const handleVideoLoad = () => {
    setIsLoading(false)
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play()
    }
  }

  // Preload first video on mount
  useEffect(() => {
    preloadNextVideo(0)
  }, [preloadNextVideo])

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const contentVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={currentVideo.posterUrl}
            muted={true}
            loop={false}
            playsInline
            onLoadedData={handleVideoLoad}
            onEnded={() => isAutoplay && changeVideo((currentVideoIndex + 1) % heroVideos.length)}
          >
            <source src={currentVideo.videoUrl} type="video/mp4" />
          </video>

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
          >
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="space-y-6"
            >
              {/* Location Badge */}
              <motion.div
                variants={childVariants}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
              >
                <MapPin size={16} />
                {currentVideo.location}
              </motion.div>

              {/* Title */}
              <motion.h1 variants={childVariants} className="text-green-400 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {currentVideo.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={childVariants} className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                {currentVideo.subtitle}
              </motion.p>

              {/* Video Info */}
              <motion.div
                variants={childVariants}
                className="flex items-center justify-center gap-6 text-sm text-white/80"
              >
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {currentVideo.duration}s
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={16} />
                  {currentVideo.category}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={childVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentVideo.primaryCTA}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green/50 text-green-600 hover:bg-green-600 hover:text-gray-200 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  {currentVideo.secondaryCTA}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
