import type { Metadata } from "next";
import HeroSection from '@/components/rent/hero-section'
import CarCards from '@/components/rent/card'

export const metadata: Metadata = {
  title: "Rent Cars - Northscape Tours & Travels | Tour Packages & Luxury Travel",
  description:
    "Book your dream ride and explore stunning destinations with Northscape Tours & Travels. Choose from premium rental cars, adventure tour packages, and luxury travel experiences tailored for every journey.",
  keywords:
    "Northscape car rentals, rent a car, luxury car rental, SUV rental, travel packages, adventure tours, honeymoon travel, luxury travel deals, custom tours, group travel packages, holiday trips",
};


const page = () => {
  return (
        <div className="pt-16">
          <HeroSection/>
          {/* <BookingForm/> */}
          <CarCards/>
        </div>
  )
}

export default page