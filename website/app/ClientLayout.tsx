"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import FloatingContact from "@/components/FloatingIcons"
// import { AddressBar } from "@/components/addressBar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
    {/* <AddressBar/> */}
      <Navigation />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          <main className="min-h-screen pt-24">{children}</main>
        </PageTransition>
      </AnimatePresence>
      <FloatingContact/>
      <Footer />
    </>
  )
}
