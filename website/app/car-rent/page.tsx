import type { Metadata } from "next";
import HeroSection from '@/components/rent/hero-section'
import CarCards from '@/components/rent/card'

export const metadata: Metadata = {
  title: "Car Rental - Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Rent premium vehicles for your journey in Pakistan. From rugged SUVs for adventure tours to luxury cars for comfortable travel in Skardu and Hunza.",
  keywords:
    "Northscape Pakistan car rentals, rent a car Skardu, luxury car rental Pakistan, SUV rental Gilgit, travel packages, adventure tours, luxury travel deals",
};


const page = () => {
  return (
        <div >
          <HeroSection/>
          {/* <BookingForm/> */}
          <CarCards/>
        </div>
  )
}

export default page