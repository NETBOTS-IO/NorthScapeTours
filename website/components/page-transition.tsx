"use client"

import { motion } from "framer-motion"
import type React from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
