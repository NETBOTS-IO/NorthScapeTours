import type { Metadata } from "next"
import DestinationsHero from "@/components/destinations/destinations-hero"
import DestinationsGrid from "@/components/destinations/destinations-grid"
// import DestinationFilters from "@/components/destination-filters"

export const metadata: Metadata = {
  title: "Destinations - NORTHSCAPE PAKISTAN | Explore Amazing Travel Destinations",
  description:
    "Discover breathtaking destinations around the world. From adventure treks to luxury retreats, find your perfect travel experience with NORTHSCAPE PAKISTAN.",
  keywords: "travel destinations, adventure tours, luxury travel, cultural experiences, custom family tours",
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
