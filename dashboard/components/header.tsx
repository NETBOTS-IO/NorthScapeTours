"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, Menu, X, ChevronDown } from "lucide-react"
import { siteConfig } from "@/data/siteConfig"
import { tourCategories } from "@/data/tourPackages"
import { cn } from "@/lib/utils"

const mainMenu = [
  { name: "Home", path: "/" },
  ...tourCategories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      name: category.name,
      path: `/tours?category=${category.id}`,
    })),
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export function Header() {
  console.log("Header component rendered")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <Facebook className="h-4 w-4 md:h-5 md:w-5" />
      case "instagram":
        return <Instagram className="h-4 w-4 md:h-5 md:w-5" />
      case "twitter":
        return <Twitter className="h-4 w-4 md:h-5 md:w-5" />
      case "youtube":
        return <Youtube className="h-4 w-4 md:h-5 md:w-5" />
      default:
        return null
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-white py-1 md:py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center text-xs md:text-sm hover:text-secondary transition-colors"
            >
              <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center text-xs md:text-sm hover:text-secondary transition-colors"
            >
              <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            {siteConfig.social.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label={item.name}
              >
                {getIcon(item.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt={siteConfig.name} width={40} height={40} className="h-8 w-auto md:h-10" />
            <span className="ml-2 font-bold text-lg md:text-xl text-primary">{siteConfig.shortName}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {mainMenu.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-sm lg:text-base font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden fixed inset-0 bg-white z-50 transition-transform transform",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Image src="/logo.png" alt={siteConfig.name} width={40} height={40} className="h-8 w-auto" />
              <span className="ml-2 font-bold text-lg text-primary">{siteConfig.shortName}</span>
            </Link>
            <button className="flex items-center" onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {mainMenu.map((item) => (
                <li key={item.name}>
                  {item.name === "Tours" ? (
                    <div>
                      <button
                        onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium hover:text-primary transition-colors"
                      >
                        Tours
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${isToursDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isToursDropdownOpen && (
                        <ul className="pl-4 mt-2 space-y-2">
                          {tourCategories
                            .filter((category) => category.id !== "all")
                            .map((category) => (
                              <li key={category.id}>
                                <Link
                                  href={`/tours?category=${category.id}`}
                                  className="text-base hover:text-primary transition-colors block"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-lg font-medium hover:text-primary transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

