import type { Metadata } from "next"
import TripCategories from "@/components/trips/trip-categories"
import TripsListing from "@/components/trips/trips-listing"

export const metadata: Metadata = {
  title: "Northscape Pakistan Tours & Travels | Adventure Trips, Tours & Holiday Packages",
  description:
    "Explore unforgettable adventures with Northscape Pakistan Tours & Travels. From trekking and safaris to cultural tours and luxury holidays, find the perfect trip for your next journey.",
  keywords:
    "Northscape tours, adventure trips, trekking tours, safari packages, cultural tours, luxury travel, group tours, honeymoon trips, holiday packages, custom tours",
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
