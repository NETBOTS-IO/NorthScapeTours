"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

interface CounterProps {
  value: number
  label: string
  suffix?: string
}

const Counter = ({ value, label, suffix = "" }: CounterProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </motion.div>
      <div className="text-slate-600 font-medium">{label}</div>
    </motion.div>
  )
}

const StatisticsCounter = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: 255, label: "Adventures Completed", suffix: "+" },
    { value: 8, label: "Countries Explored", suffix: "+" },
    { value: 255, label: "Happy Travelers", suffix: "+" },
    { value: 5, label: "Years Experience", suffix: "+" },
  ]

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
            Our <span className="text-orange-600">Achievements</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Numbers that reflect our dedication to unforgettable travel
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Counter value={stat.value} label={stat.label} suffix={stat.suffix} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsCounter
