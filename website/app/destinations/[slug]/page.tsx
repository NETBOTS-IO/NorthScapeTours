import { destinationsData, getDestinationBySlug } from "@/data/destinations-data";
import DestinationDetailHero from "@/components/destinations/destinationDetails/destination-detail-hero";
import DestinationOverview from "@/components/destinations/destinationDetails/destination-overview";
import DestinationAttractions from "@/components/destinations/destinationDetails/destination-attractions";
import DestinationItinerary from "@/components/destinations/destinationDetails/destination-itinerary";
import DestinationMap from "@/components/destinations/destinationDetails/destination-map";
import DestinationGallery from "@/components/destinations/destinationDetails/destination-gallery";
// import DestinationPracticalInfo from "@/components/destinations/destinationDetails/destination-practical-info";
import DestinationReviews from "@/components/destinations/destinationDetails/destination-reviews";
import DestinationBooking from "@/components/destinations/destinationDetails/destination-booking";
import DestinationFAQ from "@/components/destinations/destinationDetails/destination-faq";
import RelatedDestinations from "@/components/destinations/destinationDetails/related-destinations";
import PageTransition from "@/components/page-transition";
import NotFound from "@/app/not-found";

interface DestinationPageProps {
  params: {
    slug: string;
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = params;
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    return <NotFound />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <DestinationDetailHero destination={destination} />
        <DestinationOverview destination={destination} />
        <DestinationAttractions destination={destination} />
        <DestinationItinerary destination={destination} />
        <DestinationMap destination={destination} />
        <DestinationGallery destination={destination} />
        {/* <DestinationPracticalInfo destination={destination} /> */}
        <DestinationReviews destination={destination} />
        <DestinationBooking destination={destination} />
        <DestinationFAQ destination={destination} />
        <RelatedDestinations destinationId={destination.id} />
      </div>
    </PageTransition>
  );
}

export async function generateStaticParams() {
  return destinationsData.map((destination) => ({ slug: destination.slug }));
}
