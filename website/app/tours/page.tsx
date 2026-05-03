import type { Metadata } from "next"
import TripCategories from "@/components/tours/trip-categories"
import TripsListing from "@/components/tours/trips-listing"

export const metadata: Metadata = {
  title: "Tours & Packages - Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Explore unforgettable premium adventure and luxury tours with Northscape Pakistan. From trekking and safaris in Skardu and Hunza to cultural journeys across Pakistan.",
  keywords:
    "Northscape Pakistan tours, adventure trips, luxury tours Pakistan, trekking tours Skardu, safari packages, cultural tours, luxury travel, group tours, honeymoon trips, holiday packages",
};


export default async function TripsPage() {
  return (
    <div>
      {/* <TripsHero /> */}
      {/* <TripFilters /> */}
      <TripCategories />
      <TripsListing />
    </div>
  )
}
