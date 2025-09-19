import type React from "react"
import { Inter, Poppins, Roboto } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Roboto({ subsets: ["latin"], weight: ["400", "600", "700"], })

export const metadata = {
  title: "Northscape Pakistan Tours and Travels",
  description:
    "Discover extraordinary destinations and trips and create unforgettable memories with our premium travel experiences.",
}

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
