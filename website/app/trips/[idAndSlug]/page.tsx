import type { Metadata } from "next"
import TripDetailHero from "@/components/trips/tripsDetails/trip-detail-hero"
import TripDetailContent from "@/components/trips/tripsDetails/trip-detail-content"
import TripItinerary from "@/components/trips/tripsDetails/trip-itinerary"
import TripGallery from "@/components/trips/tripsDetails/trip-gallery"
import TripBookingWidget from "@/components/trips/tripsDetails/trip-booking-widget"
import NotFound from "@/app/not-found"
import RelatedTrips from "@/components/trips/tripsDetails/related-trips";
import { fetchTourById, fetchRelatedTours } from "@/lib/api";
import { generateSlug } from "@/lib/slug";

export const metadata: Metadata = {
  title: "Trip Details - TOURMAKER | Adventure Details & Booking",
  description: "Detailed information about your chosen adventure including itinerary, inclusions, and booking options.",
  keywords: "trip details, adventure booking, itinerary, travel information",
}

export default async function TripDetailPage({ params }: { params: { idAndSlug: string } }) {
  // Split the param to get the ID (before the first '-')
  const [id, ...slugParts] = params.idAndSlug.split('-');
  let trip = null;
  let relatedTrips = [];
  try {
    trip = await fetchTourById(id);
    relatedTrips = await fetchRelatedTours(id);
  } catch (e) {
    return <NotFound />;
  }
  if (!trip) {
    return <NotFound />;
  }
  const slug = generateSlug(trip.name);
  // Optionally, you can check if slugParts.join('-') === slug and redirect if not
  return (
    <div className="pt-12 sm:pt-16">
      <TripDetailHero trip={trip} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12">
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <TripDetailContent trip={trip} />
          <TripGallery trip={trip} />
          <TripItinerary trip={trip} />
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <TripBookingWidget trip={trip} />
        </div>
      </div>
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <RelatedTrips trips={relatedTrips} />
      </div>
    </div>
  )
}
