"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import { getTourById, type Tour } from "@/lib/data-utils"
import { BASE_URL } from "@/Var"
// Remove the separate type import
// import type { Tour } from "@/lib/data-utils";

export default function TourDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchTour = async () => {
        try {
          setLoading(true)
          const fetchedTour = await getTourById(id as string)
          console.log("fetchedTour", fetchedTour)
          setTour(fetchedTour || null)
        } catch (error) {
          console.error("Error fetching tour:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchTour()
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!tour) {
    return <div>Tour not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <h1 className="text-3xl font-bold mb-6">{tour.name}</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions/Exclusions</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{tour.name}</CardTitle>
              <CardDescription>{tour.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* General Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">General Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Category:</strong> {tour.category}</div>
                  <div><strong>Location:</strong> {tour.location}</div>
                  <div><strong>Duration:</strong> {tour.days} days</div>
                  <div><strong>Group Size:</strong> {tour.groupSize}</div>
                  <div><strong>Difficulty:</strong> {tour.difficulty}</div>
                  <div><strong>Price:</strong> <span className="text-green-700 font-semibold">${tour.price}</span></div>
                  <div><strong>Original Price:</strong> ${tour.originalPrice}</div>
                  <div><strong>Best Season:</strong> {tour.bestTime}</div>
                  <div><strong>Featured:</strong> {tour.featured ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}</div>
                  <div><strong>Availability:</strong> {tour.availability ? <span className="text-green-600 font-bold">Available</span> : <span className="text-red-600 font-bold">Not Available</span>}</div>
                  <div><strong>Next Departure:</strong> {tour.nextDeparture ? new Date(tour.nextDeparture).toLocaleDateString() : '-'}</div>
                  <div><strong>Rating:</strong> {tour.rating} ⭐</div>
                  <div><strong>Reviews:</strong> {tour.reviews}</div>
                  <div><strong>Destination:</strong> {tour.destination}</div>
                  <div><strong>Physical Requirements:</strong> {tour.physicalRequirements}</div>
                  <div><strong>Created At:</strong> {tour.createdAt ? new Date(tour.createdAt).toLocaleString() : '-'}</div>
                  <div><strong>Updated At:</strong> {tour.updatedAt ? new Date(tour.updatedAt).toLocaleString() : '-'}</div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Descriptions</h3>
                <div className="mb-2"><strong>Overview:</strong> {tour.overview}</div>
                <div className="mb-2"><strong>Short Description:</strong> {tour.shortDescription}</div>
                <div><strong>Long Description:</strong>
                  <div className="whitespace-pre-line bg-gray-50 p-2 rounded mt-1 text-sm text-gray-700">{tour.longDescription}</div>
                </div>
              </div>

              {/* Tags, Features, Highlights, Related Trips */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tour.tags && tour.tags.length > 0 ? tour.tags.map((tag, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tag}</span>
                    )) : <span className="text-gray-400">-</span>}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Related Trips</h3>
                  <div className="flex flex-wrap gap-2">
                    {tour.relatedTrips && tour.relatedTrips.length > 0 ? tour.relatedTrips.map((trip, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{trip}</span>
                    )) : <span className="text-gray-400">-</span>}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Features</h3>
                  <ul className="list-disc list-inside ml-4">
                    {tour.features && tour.features.length > 0 ? tour.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : <li className="text-gray-400">-</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Highlights</h3>
                  <ul className="list-disc list-inside ml-4">
                    {tour.highlights && tour.highlights.length > 0 ? tour.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : <li className="text-gray-400">-</li>}
                  </ul>
                </div>
              </div>

              {/* Why Choose */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Why Choose</h3>
                <ul className="list-disc list-inside ml-4">
                  {tour.whyChoose && tour.whyChoose.length > 0 ? tour.whyChoose.map((item, idx) => (
                    <li key={idx}><strong>{item.title}:</strong> {item.description}</li>
                  )) : <li className="text-gray-400">-</li>}
                </ul>
              </div>

              {/* Terms, Policies, Map */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Terms & Conditions</h3>
                  <ul className="list-disc list-inside ml-4">
                    {tour.termsAndConditions && tour.termsAndConditions.length > 0 ? tour.termsAndConditions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : <li className="text-gray-400">-</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Policies</h3>
                  <ul className="list-disc list-inside ml-4">
                    {tour.policies && tour.policies.length > 0 ? tour.policies.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : <li className="text-gray-400">-</li>}
                  </ul>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold text-lg mb-2">Map Location</h3>
                  {tour.map ? (
                    <span>Latitude: <span className="font-mono">{tour.map.latitude}</span>, Longitude: <span className="font-mono">{tour.map.longitude}</span></span>
                  ) : <span className="text-gray-400">-</span>}
                </div>
              </div>

              {/* Images */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Images</h3>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {tour.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${BASE_URL}${image}` || "/placeholder.svg?height=200&width=300"}
                      alt={`Tour image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              {tour.itineraries.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">
                    Day {day.day}: {day.title}
                  </h3>
                  <p>{day.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <strong>Activities:</strong> {day.activities}
                    </div>
                    <div>
                      <strong>Accommodation:</strong> {day.accommodation}
                    </div>
                    <div>
                      <strong>Meals:</strong> {day.meals}
                    </div>
                    <div>
                      <strong>Distance:</strong> {day.duration}
                    </div>
                    <div>
                      <strong>Type:</strong> {day.type}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inclusions">
          <Card>
            <CardHeader>
              <CardTitle>Inclusions and Exclusions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">Inclusions</h3>
                  <ul className="list-disc list-inside">
                    {tour.inclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Exclusions</h3>
                  <ul className="list-disc list-inside">
                    {tour.exclusions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {tour.faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

