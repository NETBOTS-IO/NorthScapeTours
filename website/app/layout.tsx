import type React from "react"
import { Inter, Poppins, Roboto } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Roboto({ subsets: ["latin"], weight: ["400", "600", "700"], })

export const metadata = {
  title: "Northscape Pakistan",
  description:
    "Northscape Pakistan offers guided adventure tours, trekking expeditions, cultural journeys, and premium travel experiences across Pakistan’s majestic landscapes including Skardu, Hunza, Gilgit-Baltistan, and beyond.",
  keywords: [
    "Pakistan tours",
    "Skardu trekking",
    "Hunza Valley trips",
    "Gilgit-Baltistan tours",
    "K2 base camp trek",
    "Adventure tours Pakistan",
    "Cultural tours Pakistan",
    "Northscape travel agency",
    "Pakistan expeditions",
    "Trekking in Pakistan",
  ],
  openGraph: {
    title: "Northscape Pakistan | Adventure Tours & Trekking",
    description:
      "Embark on unforgettable journeys with Northscape Pakistan. From adventure treks to cultural tours, explore Skardu, Hunza, Gilgit-Baltistan, and more.",
    url: "https://northscapepakistan.com",
    siteName: "Northscape Pakistan",
    images: [
      {
        url: "https://northscapepakistan.com/og-image.jpg", // replace with real OG image
        width: 1200,
        height: 630,
        alt: "Northscape Pakistan Adventure Tours",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northscape Pakistan | Adventure Tours & Trekking",
    description:
      "Guided adventure tours, trekking expeditions, and cultural journeys across Skardu, Hunza, Gilgit-Baltistan, and beyond.",
    images: ["https://northscapepakistan.com/twitter-card.jpg"], // replace with real image
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
