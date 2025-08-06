"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  )
}
