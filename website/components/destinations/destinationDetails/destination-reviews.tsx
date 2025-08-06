"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Star, ThumbsUp, MessageCircle, ChevronDown, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Destination } from "@/data/destinations-data"

interface DestinationReviewsProps {
  destination: Destination
}

interface Review {
  id: number
  userName: string
  userAvatar: string
  userLocation: string
  rating: number
  title: string
  content: string
  date: string
  tripDate: string
  tripType: string
  helpful: number
  verified: boolean
  photos: string[]
  likes: number
  dislikes: string[]
  tags: string[]
}

const reviews: Review[] = [
  {
    id: 1,
    userName: "Sarah Mitchell",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "San Francisco, CA",
    rating: 5,
    title: "Life-changing adventure that exceeded all expectations!",
    content:
      "This trek was absolutely incredible from start to finish. The guides were knowledgeable and supportive, the views were breathtaking, and the cultural immersion was authentic. I've traveled to many places, but this experience stands out as truly transformative. The accommodation was better than expected, and the food was delicious. Every day brought new challenges and rewards. Highly recommend for anyone seeking adventure and personal growth.",
    date: "2024-01-15",
    tripDate: "October 2023",
    tripType: "Group Trek",
    helpful: 24,
    verified: true,
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    likes: 12,
    dislikes: [],
    tags: ["Amazing guides", "Great value", "Life-changing", "Well organized"],
  },
  {
    id: 2,
    userName: "Michael Chen",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "Toronto, Canada",
    rating: 4,
    title: "Challenging but rewarding experience with minor issues",
    content:
      "The trek itself was fantastic - challenging but achievable with proper preparation. The mountain views were spectacular and the local culture fascinating. However, there were some logistical issues with transportation on the first day, and one of our lodges wasn't quite up to standard. The guide team handled everything professionally though, and the overall experience was still very positive. Would recommend with realistic expectations.",
    date: "2024-01-08",
    tripDate: "September 2023",
    tripType: "Private Trek",
    helpful: 18,
    verified: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    likes: 8,
    dislikes: ["Transportation delays"],
    tags: ["Spectacular views", "Professional guides", "Minor issues"],
  },
  {
    id: 3,
    userName: "Emma Rodriguez",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "Madrid, Spain",
    rating: 5,
    title: "Perfect blend of adventure and cultural immersion",
    content:
      "I can't say enough good things about this experience. From the moment we landed until departure, everything was seamlessly organized. The local communities were so welcoming, and staying in traditional lodges added such authenticity to the journey. The physical challenge was significant but manageable with the excellent support from guides. The sunrise views alone were worth the entire trip. Already planning my next adventure!",
    date: "2023-12-22",
    tripDate: "November 2023",
    tripType: "Solo Traveler",
    helpful: 31,
    verified: true,
    photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    likes: 15,
    dislikes: [],
    tags: ["Solo-friendly", "Cultural immersion", "Excellent support", "Value for money"],
  },
  {
    id: 4,
    userName: "David Thompson",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "London, UK",
    rating: 5,
    title: "Outstanding organization and unforgettable memories",
    content:
      "This was my first major trekking experience, and it couldn't have been better. The pre-trip preparation was thorough, the guides were patient and encouraging, and the group dynamic was fantastic. Every detail was thoughtfully planned. The accommodations exceeded expectations for mountain lodges, and the food was surprisingly good throughout. The highlight was definitely reaching the summit and sharing that moment with fellow trekkers. Transformative experience.",
    date: "2023-12-10",
    tripDate: "October 2023",
    tripType: "Group Trek",
    helpful: 22,
    verified: true,
    photos: ["/placeholder.svg?height=200&width=300"],
    likes: 11,
    dislikes: [],
    tags: ["First-timer friendly", "Great group", "Excellent planning", "Memorable"],
  },
  {
    id: 5,
    userName: "Lisa Park",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "Seoul, South Korea",
    rating: 4,
    title: "Amazing adventure with room for improvement",
    content:
      "The natural beauty and cultural experiences were absolutely incredible. Our guide was knowledgeable about local history and customs, making the journey educational as well as adventurous. The trekking routes were well-chosen and offered diverse landscapes. However, I felt the pace was sometimes too rushed, and we could have benefited from more rest time at certain viewpoints. Overall, still a fantastic experience that I'd recommend to others.",
    date: "2023-11-28",
    tripDate: "September 2023",
    tripType: "Group Trek",
    helpful: 16,
    verified: true,
    photos: [],
    likes: 7,
    dislikes: ["Rushed pace"],
    tags: ["Educational", "Beautiful scenery", "Knowledgeable guide", "Fast-paced"],
  },
  {
    id: 6,
    userName: "James Wilson",
    userAvatar: "/placeholder.svg?height=50&width=50",
    userLocation: "Sydney, Australia",
    rating: 5,
    title: "Exceeded every expectation - truly world-class experience",
    content:
      "Having done treks on multiple continents, I can confidently say this ranks among the very best. The attention to detail, from equipment provided to meal planning, was exceptional. The guides weren't just experts in mountain safety but also cultural ambassadors who enriched our understanding of the region. The small group size allowed for personalized attention while still fostering great friendships. Worth every penny and then some.",
    date: "2023-11-15",
    tripDate: "August 2023",
    tripType: "Private Trek",
    helpful: 28,
    verified: true,
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    likes: 19,
    dislikes: [],
    tags: ["World-class", "Exceptional guides", "Great value", "Small groups", "Highly recommended"],
  },
]

const DestinationReviews = ({ destination }: DestinationReviewsProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [expandedReviews, setExpandedReviews] = useState<number[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)

  const toggleReview = (reviewId: number) => {
    setExpandedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const ratingDistribution = [
    { stars: 5, count: 187, percentage: 76 },
    { stars: 4, count: 45, percentage: 18 },
    { stars: 3, count: 12, percentage: 5 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 0 },
  ]

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Traveler <span className="text-orange-600">Reviews</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from adventurers who've taken this incredible journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Reviews Summary */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-8">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-orange-600 mb-2">{destination.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(destination.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300 fill-current"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-600">{destination.reviewCount} reviews</div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2 mb-6">
                    {ratingDistribution.map((rating) => (
                      <div key={rating.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm text-gray-600">{rating.stars}</span>
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${rating.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{rating.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Filters */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-900 mb-2 block">Sort by</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="helpful">Most Helpful</SelectItem>
                          <SelectItem value="rating-high">Highest Rating</SelectItem>
                          <SelectItem value="rating-low">Lowest Rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-900 mb-2 block">Filter by</label>
                      <Select value={filterBy} onValueChange={setFilterBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Reviews</SelectItem>
                          <SelectItem value="verified">Verified Only</SelectItem>
                          <SelectItem value="photos">With Photos</SelectItem>
                          <SelectItem value="5-star">5 Stars</SelectItem>
                          <SelectItem value="4-star">4 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews List */}
            <div className="lg:col-span-3 space-y-6">
              {displayedReviews.map((review, index) => {
                const isExpanded = expandedReviews.includes(review.id)
                const truncatedContent = review.content.slice(0, 200) + "..."
                const showFullContent = review.content.length <= 200 || isExpanded

                return (
                  <motion.div key={review.id} variants={itemVariants}>
                    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        {/* Review Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={review.userAvatar || "/placeholder.svg"}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {review.userLocation}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {review.date}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300 fill-current"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                • {review.tripType} • {review.tripDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Review Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{review.title}</h3>

                        {/* Review Content */}
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {showFullContent ? review.content : truncatedContent}
                          </p>
                          {review.content.length > 200 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleReview(review.id)}
                              className="text-orange-600 hover:text-orange-700 p-0 h-auto font-medium mt-2"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </Button>
                          )}
                        </div>

                        {/* Review Photos */}
                        {review.photos.length > 0 && (
                          <div className="mb-4">
                            <div className="flex gap-2 overflow-x-auto">
                              {review.photos.map((photo, photoIndex) => (
                                <img
                                  key={photoIndex}
                                  src={photo || "/placeholder.svg"}
                                  alt={`Review photo ${photoIndex + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Review Tags */}
                        {review.tags.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {review.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="bg-orange-50 text-orange-700 border-orange-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Review Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                          </div>
                          <div className="text-sm text-gray-500">{review.likes} people found this helpful</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {/* Show More Button */}
              {!showAllReviews && reviews.length > 3 && (
                <motion.div variants={itemVariants} className="text-center">
                  <Button
                    onClick={() => setShowAllReviews(true)}
                    variant="outline"
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 font-semibold"
                  >
                    Show All {reviews.length} Reviews
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationReviews
