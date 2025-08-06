import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { siteConfig, mainMenu } from "@/data/siteConfig"
import { tourCategories } from "@/data/tourPackages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  console.log("Footer component rendered")

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
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-8 w-auto md:h-12 bg-white rounded-full p-1"
              />
              <span className="ml-2 font-bold text-lg md:text-xl">{siteConfig.name}</span>
            </div>
            <p className="mb-4 text-sm md:text-base text-white/80">{siteConfig.description}</p>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-secondary">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-secondary">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {mainMenu.map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-secondary flex items-center">
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking-info" className="hover:text-secondary flex items-center">
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Booking Information
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-secondary flex items-center">
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-secondary flex items-center">
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-secondary flex items-center">
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Tour Categories</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {tourCategories
                .filter((category) => category.id !== "all")
                .map((category) => (
                  <li key={category.id}>
                    <Link href={`/tours?category=${category.id}`} className="hover:text-secondary flex items-center">
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm md:text-base text-white/80">
              Subscribe to our newsletter for the latest updates on tours and special offers.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none text-black text-sm md:text-base"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-secondary hover:bg-secondary/90 text-sm md:text-base"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm md:text-base">Follow Us</h4>
              <div className="flex space-x-3">
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
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} TourMaker Pakistan. All rights reserved.</p>
          <p className="text-sm mt-2">
            Designed and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-secondary"
            >
              Netbots (SMC-Private) Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

