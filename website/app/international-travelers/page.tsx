import type { Metadata } from "next"
import DestinationsGrid from "@/components/destinations/destinations-grid"
import InternationTravelersHero from "@/components/international-travelers/destinations-hero"
import InternationalCategories from "@/components/international-travelers/international-categories"
// import DestinationFilters from "@/components/destination-filters"

export const metadata: Metadata = {
  title: "International Travelers - NORTHSCAPE | Explore Amazing Travel Destinations",
  description:
    "Discover breathtaking destinations around the world. From adventure treks to luxury retreats, find your perfect travel experience with NORTHSCAPE.",
  keywords: "travel destinations, adventure tours, luxury travel, cultural experiences, custom family tours",
}

export default function InternationalTravelersPage() {
  return (
    <div className="pt-16">
      <InternationTravelersHero />
      <InternationalCategories/>
    </div>
  )
}
