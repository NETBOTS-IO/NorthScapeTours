import type React from "react"
import { Inter, Poppins, Roboto } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Roboto({ subsets: ["latin"], weight: ["400", "600", "700"], })

export const metadata = {
  title: "Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Northscape Pakistan offers premium adventure and luxury tours, trekking expeditions, cultural journeys, and bespoke travel experiences across Pakistan’s majestic landscapes including Skardu, Hunza, Gilgit-Baltistan, and beyond.",
  keywords: [
    "Pakistan tours",
    "Luxury tours Pakistan",
    "Adventure tours Pakistan",
    "Skardu trekking",
    "Hunza Valley trips",
    "Gilgit-Baltistan tours",
    "K2 base camp trek",
    "Cultural tours Pakistan",
    "Northscape travel agency",
    "Pakistan expeditions",
    "Trekking in Pakistan",
    "Luxury travel Pakistan",
    "Best tour operator Skardu",
    "Premium Pakistan trips",
  ],
  openGraph: {
    title: "Northscape Pakistan | Adventure and Luxury Tours",
    description:
      "Embark on unforgettable journeys with Northscape Pakistan. From premium adventure treks to luxury cultural tours, explore Skardu, Hunza, Gilgit-Baltistan, and more.",
    url: "https://northscapepakistan.com",
    siteName: "Northscape Pakistan",
    images: [
      {
        url: "https://northscapepakistan.com/og-image.jpg", // replace with real OG image
        width: 1200,
        height: 630,
        alt: "Northscape Pakistan Adventure and Luxury Tours",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northscape Pakistan | Adventure and Luxury Tours",
    description:
      "Premium adventure and luxury tours, trekking expeditions, and cultural journeys across Skardu, Hunza, Gilgit-Baltistan, and beyond.",
    images: ["https://northscapepakistan.com/twitter-card.jpg"], // replace with real image
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Northscape Pakistan",
    "url": "https://northscapepakistan.com",
    "logo": "https://northscapepakistan.com/new-logo.png",
    "image": "https://northscapepakistan.com/images/marsur-rock.jpg",
    "description": "Northscape Pakistan offers premium adventure and luxury tours, trekking expeditions, and cultural journeys across Pakistan's majestic landscapes.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No-02 benazir road Sukmaidan",
      "addressLocality": "Skardu",
      "addressRegion": "Gilgit-Baltistan",
      "postalCode": "16100",
      "addressCountry": "PK"
    },
    "telephone": "+923205077123",
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": [
      "https://www.facebook.com/Northscapepakistan",
      "https://www.instagram.com/northscapepakistan",
      "https://www.tiktok.com/@northscapepakistan"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
