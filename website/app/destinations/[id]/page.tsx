"use client"
import { Destination } from "@/data/destinations-data"
import DestinationDetailHero from "@/components/destinations/destinationDetails/destination-detail-hero"
import DestinationOverview from "@/components/destinations/destinationDetails/destination-overview"
import DestinationAttractions from "@/components/destinations/destinationDetails/destination-attractions"
import DestinationItinerary from "@/components/destinations/destinationDetails/destination-itinerary"
import DestinationGallery from "@/components/destinations/destinationDetails/destination-gallery"
import DestinationReviews from "@/components/destinations/destinationDetails/destination-reviews"
import DestinationBooking from "@/components/destinations/destinationDetails/destination-booking"
import DestinationFAQ from "@/components/destinations/destinationDetails/destination-faq"
import PageTransition from "@/components/page-transition"
import NotFound from "@/app/not-found"
import { getDestinationById } from "@/lib/api"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import EnhancedTestimonials from "@/components/home/enhanced-testimonials"

const DestinationPage = () => {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  // console.log('id', id);
  
  useEffect(() => {
    if (!id) return
    const fetchDestination = async () => {
      try {
        const response = await getDestinationById(id)
        console.log('response', response)
        setDestination(response)
      } catch (err) {
        console.error("Failed to fetch destination:", err)
        setDestination(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDestination()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading destination...</p>
      </div>
    )
  }

// console.log('destination', destination);


  return (
  <PageTransition>
    <div className="min-h-screen bg-slate-50 mt-16">
      {destination ? (
        <>
          <DestinationDetailHero destination={destination} />
          <DestinationOverview destination={destination} />
          <DestinationItinerary destination={destination} />
          <DestinationGallery destination={destination} />
          <DestinationFAQ destination={destination} />
          {/* <DestinationReviews destination={destination} /> */}
          <DestinationBooking destination={destination} />
        </>
      ) : (
        <NotFound />
      )}
      <EnhancedTestimonials />
    </div>
  </PageTransition>
);

}

export default DestinationPage
