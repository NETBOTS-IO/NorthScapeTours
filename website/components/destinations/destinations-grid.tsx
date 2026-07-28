"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock, Users, Star } from "lucide-react"
import { Destination } from "@/data/destinations-data"
import { getDestinations } from "@/lib/api"

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
// export const BASE_URL = "https://api.northscapepakistan.com" 

const DestinationsGrid = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const countPage = 6
  const [visibleCount, setVisibleCount] = useState(countPage)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // fail fast instead of hanging forever

    const fetchDestinations = async () => {
      try {
        const response = await getDestinations() // ideally: getDestinations({ signal: controller.signal })
        setDestinations(response)
      } catch (err) {
        if ((err as any)?.name !== "AbortError") {
          console.error("Failed to load destinations:", err)
          setError("Couldn't load destinations. Please try again.")
        }
      } finally {
        clearTimeout(timeout)
        setLoading(false)
      }
    }

    fetchDestinations()
    return () => controller.abort()
  }, [])

  const handleMore = useCallback(() => {
    setVisibleCount((prev) => prev + countPage)
  }, [])

  const getImageSrc = (destination: Destination) =>
    destination?.images?.[0] ? `${BASE_URL}${destination.images[0]}` : "/placeholder.svg"

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-600"
      case "Moderate": return "bg-yellow-600"
      case "Challenging": return "bg-red-600"
      default: return "bg-slate-600"
    }
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {loading ? "Loading destinations..." : `${destinations.length} Destinations Found`}
            </h2>
            <p className="text-slate-600">Discover your next adventure</p>
          </div>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: countPage }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded" />
            ))
          ) : destinations.length === 0 ? (
            <div>No Destination Found</div>
          ) : (
            destinations.slice(0, visibleCount).map((destination) => (
              <div
                key={destination._id}
                className="bg-white overflow-hidden border border-orange-600 card-shadow"
              >
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={getImageSrc(destination)}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />

                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {destination.category}
                    </div>
                    <div className={`${getDifficultyColor(destination.difficulty)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {destination.difficulty}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 text-slate-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ${destination.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{destination.name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.country}, {destination.location}</span>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{destination.days} Days</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{destination.groupSize} Person</span>
                    </div>
                  </div>

                  <Link
                    href={`/destinations/${destination._id}`}
                    className="block bg-orange-600 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && visibleCount < destinations.length && (
          <div className="text-center mt-12">
            <button className="btn-outline" onClick={handleMore}>
              Load More Destinations
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default DestinationsGrid