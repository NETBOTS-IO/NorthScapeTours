"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Utensils, Bed, ShoppingBag, Info, Plane, CreditCard, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Destination } from "@/data/destinations-data"

interface DestinationPracticalInfoProps {
  destination: Destination
}

const cuisineData = [
  {
    name: "Dal Bhat",
    description: "Traditional lentil curry with rice, vegetables, and pickles. The staple meal of the region.",
    image: "/placeholder.svg?height=150&width=200",
    type: "Main Course",
    spiceLevel: "Mild",
    dietary: ["Vegetarian", "Vegan option"],
  },
  {
    name: "Momo",
    description: "Steamed dumplings filled with vegetables or meat, served with spicy dipping sauce.",
    image: "/placeholder.svg?height=150&width=200",
    type: "Snack",
    spiceLevel: "Medium",
    dietary: ["Vegetarian option"],
  },
  {
    name: "Thukpa",
    description: "Hearty noodle soup with vegetables and meat, perfect for cold mountain weather.",
    image: "/placeholder.svg?height=150&width=200",
    type: "Soup",
    spiceLevel: "Mild",
    dietary: ["Vegetarian option"],
  },
  {
    name: "Tibetan Bread",
    description: "Fresh baked bread served with yak butter and local honey.",
    image: "/placeholder.svg?height=150&width=200",
    type: "Bread",
    spiceLevel: "None",
    dietary: ["Vegetarian"],
  },
]

const accommodationData = [
  {
    name: "Mountain Lodge Deluxe",
    type: "Premium Lodge",
    description: "Comfortable rooms with mountain views, private bathrooms, and heating systems.",
    amenities: ["Private bathroom", "Mountain views", "Heating", "WiFi", "Restaurant"],
    priceRange: "$80-120/night",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Traditional Teahouse",
    type: "Local Experience",
    description: "Authentic mountain accommodation with shared facilities and local hospitality.",
    amenities: ["Shared bathroom", "Local meals", "Cultural experience", "Basic heating"],
    priceRange: "$25-40/night",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Eco-Friendly Lodge",
    type: "Sustainable Stay",
    description: "Environmentally conscious accommodation with solar power and organic meals.",
    amenities: ["Solar power", "Organic meals", "Mountain views", "WiFi", "Eco-friendly"],
    priceRange: "$60-90/night",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const travelTips = [
  {
    category: "Health & Safety",
    icon: Shield,
    tips: [
      "Get travel insurance that covers high-altitude activities",
      "Carry altitude sickness medication (consult your doctor)",
      "Stay hydrated and avoid alcohol at high altitudes",
      "Inform someone of your daily itinerary",
      "Carry a first aid kit with basic supplies",
    ],
  },
  {
    category: "Packing Essentials",
    icon: ShoppingBag,
    tips: [
      "Pack layers for varying temperatures",
      "Bring a good quality sleeping bag (rated for -10°C)",
      "Waterproof hiking boots are essential",
      "Pack a headlamp with extra batteries",
      "Bring water purification tablets",
    ],
  },
  {
    category: "Money & Payments",
    icon: CreditCard,
    tips: [
      "Carry cash in local currency (USD also accepted)",
      "ATMs are available in major towns only",
      "Budget extra for tips and personal expenses",
      "Keep money in multiple secure locations",
      "Credit cards accepted in some larger establishments",
    ],
  },
  {
    category: "Cultural Etiquette",
    icon: Info,
    tips: [
      "Remove shoes before entering homes and temples",
      "Use your right hand for eating and greeting",
      "Dress modestly, especially near religious sites",
      "Learn basic local greetings",
      "Respect photography restrictions at religious sites",
    ],
  },
]

const DestinationPracticalInfo = ({ destination }: DestinationPracticalInfoProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("cuisine")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
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

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Practical <span className="text-orange-600">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know for a comfortable and enjoyable journey
            </p>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="cuisine" className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  <span className="hidden sm:inline">Local Cuisine</span>
                </TabsTrigger>
                <TabsTrigger value="accommodation" className="flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  <span className="hidden sm:inline">Accommodation</span>
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Travel Tips</span>
                </TabsTrigger>
                <TabsTrigger value="preparation" className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  <span className="hidden sm:inline">Preparation</span>
                </TabsTrigger>
              </TabsList>

              {/* Local Cuisine Tab */}
              <TabsContent value="cuisine">
                <div className="grid md:grid-cols-2 gap-6">
                  {cuisineData.map((dish, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="md:flex">
                            <div className="md:w-2/5">
                              <img
                                src={dish.image || "/placeholder.svg"}
                                alt={dish.name}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="md:w-3/5 p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                  {dish.type}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-4">{dish.description}</p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">Spice Level:</span>
                                  <Badge
                                    className={`text-xs ${
                                      dish.spiceLevel === "Mild"
                                        ? "bg-green-100 text-green-800"
                                        : dish.spiceLevel === "Medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {dish.spiceLevel}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {dish.dietary.map((diet, dietIndex) => (
                                    <Badge
                                      key={dietIndex}
                                      variant="outline"
                                      className="text-xs border-green-600 text-green-700"
                                    >
                                      {diet}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Accommodation Tab */}
              <TabsContent value="accommodation">
                <div className="grid lg:grid-cols-3 gap-6">
                  {accommodationData.map((accommodation, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-0">
                          <img
                            src={accommodation.image || "/placeholder.svg"}
                            alt={accommodation.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold text-gray-900">{accommodation.name}</h3>
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(accommodation.rating) ? "text-yellow-500" : "text-gray-300"
                                      }`}
                                    >
                                      ★
                                    </div>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-1">{accommodation.rating}</span>
                              </div>
                            </div>
                            <Badge className="bg-orange-600 text-white mb-3">{accommodation.type}</Badge>
                            <p className="text-gray-600 mb-4">{accommodation.description}</p>
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                              <div className="flex flex-wrap gap-1">
                                {accommodation.amenities.map((amenity, amenityIndex) => (
                                  <Badge
                                    key={amenityIndex}
                                    variant="outline"
                                    className="text-xs border-green-600 text-green-700"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-lg font-bold text-orange-600">{accommodation.priceRange}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Travel Tips Tab */}
              <TabsContent value="tips">
                <div className="grid md:grid-cols-2 gap-6">
                  {travelTips.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: index % 2 === 0 ? -40 : 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                              <category.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                          </div>
                          <ul className="space-y-3">
                            {category.tips.map((tip, tipIndex) => (
                              <motion.li
                                key={tipIndex}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.05 * tipIndex }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-700">{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Preparation Tab */}
              <TabsContent value="preparation">
                <div className="space-y-8">
                  {/* Pre-Trip Checklist */}
                  <Card className="p-6 shadow-lg">
                    <CardContent className="p-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pre-Trip Checklist</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Plane className="w-4 h-4 text-orange-600" />
                            Before You Leave
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Get comprehensive travel insurance</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Consult doctor about altitude sickness medication</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Check passport validity (6+ months remaining)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Get required vaccinations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Notify bank of travel plans</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-green-600" />
                            Packing Preparation
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Test all gear before departure</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Break in hiking boots (2+ weeks)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Organize documents and copies</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Pack medications in original containers</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <span className="text-gray-700">Download offline maps and apps</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Reminders */}
                  <Card className="p-6 shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-600">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">Important Reminders</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Physical fitness preparation should begin 8-12 weeks before departure</li>
                            <li>• Altitude acclimatization cannot be rushed - follow the itinerary schedule</li>
                            <li>• Weather conditions can change rapidly - be prepared for all scenarios</li>
                            <li>• Respect local customs and environmental conservation practices</li>
                            <li>• Emergency evacuation insurance is strongly recommended</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DestinationPracticalInfo
