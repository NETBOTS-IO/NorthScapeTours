import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { AdminLayout } from "./admin-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Northscape - Adventure Tours & Trekking",
    template: "%s | Northscape Pakistan",
  },
  description:
    "Northscape Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
  keywords: [
    "Pakistan tours",
    "trekking Pakistan",
    "adventure travel",
    "Hunza Valley",
    "K2 Base Camp",
    "mountain expeditions",
  ],
  authors: [{ name: "Northscape Tours and Travels" }],
  creator: "Northscape Tours and Travels",
  publisher: "Northscape Tours and Travels",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "https://mountaintravelspakistan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Northscape Tours and Travels - Adventure Tours & Trekking",
    description:
      "Northscape Tours and Travels Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
    siteName: "Tour Maker Pakistan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Maker Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northscape Tours and Travels Pakistan - Adventure Tours & Trekking",
    description:
      "Tour Maker Pakistan offers adventure tours, trekking expeditions, and cultural experiences in Pakistan's most beautiful regions.",
    images: ["/og-image.jpg"],
    creator: "@mtpakistan",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1E8A95" />
        <link rel="canonical" href={process.env.SITE_URL || "https://mountaintravelspakistan.com"} />
      </head>
      <body className={inter.className}>
        <AdminLayout>{children}</AdminLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}



import './globals.css'