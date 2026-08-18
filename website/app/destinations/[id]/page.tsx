"use client"
import { Destination } from "@/data/destinations-data"
import DestinationDetailHero from "@/components/destinations/destinationDetails/destination-detail-hero"
import DestinationOverview from "@/components/destinations/destinationDetails/destination-overview"
import DestinationItinerary from "@/components/destinations/destinationDetails/destination-itinerary"
import DestinationGallery from "@/components/destinations/destinationDetails/destination-gallery"
import DestinationFAQ from "@/components/destinations/destinationDetails/destination-faq"
import DestinationBooking from "@/components/destinations/destinationDetails/destination-booking"
import EnhancedTestimonials from "@/components/home/enhanced-testimonials"
import NotFound from "@/app/not-found"
import { getDestinationById, getDestinationFromCache } from "@/lib/api"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const DestinationPage = () => {
  const params = useParams<{ id: string }>()
  const id = params?.id
  
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!id) return
    
    // Check if the destination is in the cache first to render instantly
    const cached = getDestinationFromCache(id)
    if (cached) {
      setDestination(cached)
      setLoading(false)
    }

    const fetchDestination = async () => {
      try {
        const response = await getDestinationById(id)
        if (response) {
          setDestination(response)
        }
      } catch (err) {
        console.error("Failed to fetch destination:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDestination()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* skeleton hero section */}
        <div className="relative h-[70vh] bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="text-center max-w-2xl px-4 space-y-4">
            <div className="h-12 bg-slate-700 rounded-md w-3/4 mx-auto" />
            <div className="h-6 bg-slate-700 rounded-md w-1/2 mx-auto" />
          </div>
        </div>
        {/* skeleton overview section */}
        <div className="max-w-4xl mx-auto py-16 px-4 space-y-6">
          <div className="h-8 bg-slate-200 rounded-md w-1/4" />
          <div className="h-4 bg-slate-200 rounded-md w-full" />
          <div className="h-4 bg-slate-200 rounded-md w-full" />
          <div className="h-4 bg-slate-200 rounded-md w-5/6" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {destination ? (
        <>
          <DestinationDetailHero destination={destination} />
          <DestinationOverview destination={destination} />
          <DestinationItinerary destination={destination} />
          <DestinationGallery destination={destination} />
          <DestinationFAQ destination={destination} />
          <DestinationBooking destination={destination} />
        </>
      ) : (
        <NotFound />
      )}
      <EnhancedTestimonials />
    </div>
  )
}

export default DestinationPage
