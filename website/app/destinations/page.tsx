import type { Metadata } from "next"
import DestinationsHero from "@/components/destinations/destinations-hero"
import DestinationsGrid from "@/components/destinations/destinations-grid"
// import DestinationFilters from "@/components/destination-filters"

export const metadata: Metadata = {
  title: "Destinations - Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Discover breathtaking destinations in Pakistan. From premium adventure tours to luxury retreats in Skardu, Hunza, and beyond, find your perfect travel experience with Northscape Pakistan.",
  keywords: "travel destinations, adventure tours, luxury travel Pakistan, cultural experiences, custom family tours, Skardu tours, Hunza trips",
}

export default function DestinationsPage() {
  return (
    <div>
      <DestinationsHero />
      {/* <DestinationFilters /> */}
      <DestinationsGrid />
    </div>
  )
}
