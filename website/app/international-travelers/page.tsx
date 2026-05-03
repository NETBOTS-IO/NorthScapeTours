import type { Metadata } from "next"
import DestinationsGrid from "@/components/destinations/destinations-grid"
import InternationTravelersHero from "@/components/international-travelers/destinations-hero"
import InternationalCategories from "@/components/international-travelers/international-categories"
// import DestinationFilters from "@/components/destination-filters"

export const metadata: Metadata = {
  title: "International Travelers - Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Information for international travelers visiting Pakistan. Explore breathtaking destinations with our premium adventure and luxury tour packages.",
  keywords: "travel destinations, adventure tours, luxury travel Pakistan, cultural experiences, custom family tours, international travelers Pakistan, Pakistan visa guide",
}

export default function InternationalTravelersPage() {
  return (
    <div>
      <InternationTravelersHero />
      <InternationalCategories/>
    </div>
  )
}
