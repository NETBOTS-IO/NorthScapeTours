export interface Testimonial {
  id: number
  name: string
  title: string
  company?: string
  location: string
  rating: number
  text: string
  fullText?: string
  content: string
  image: string
  trip: string
  tripName: string
  tripDate: string
  date: string
  verified: boolean
  featured: boolean
  highlights?: string[]
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Adventure Photographer",
    company: "National Geographic",
    location: "New York, USA",
    rating: 5,
    text: "TOURMAKER exceeded all my expectations! The Everest Base Camp trek was perfectly organized, and our guide was incredibly knowledgeable.",
    content:
      "TOURMAKER exceeded all my expectations! The Everest Base Camp trek was perfectly organized, and our guide was incredibly knowledgeable. Every detail was meticulously planned, from the accommodation to the daily itinerary. The breathtaking views and cultural experiences made this truly a life-changing adventure. I've traveled to over 50 countries, but this expedition stands out as one of the most memorable and well-executed trips I've ever taken.",
    fullText:
      "TOURMAKER exceeded all my expectations! The Everest Base Camp trek was perfectly organized, and our guide was incredibly knowledgeable. Every detail was meticulously planned, from the accommodation to the daily itinerary. The breathtaking views and cultural experiences made this truly a life-changing adventure. I've traveled to over 50 countries, but this expedition stands out as one of the most memorable and well-executed trips I've ever taken.",
    image: "images/g1.jpeg?height=120&width=120",
    trip: "Everest Base Camp Trek",
    tripName: "Everest Base Camp Trek",
    tripDate: "March 2024",
    date: "March 2024",
    verified: true,
    featured: true,
    highlights: ["Expert Guides", "Amazing Views", "Well Organized"],
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Wildlife Biologist",
    company: "Toronto Zoo",
    location: "Toronto, Canada",
    rating: 5,
    text: "The African safari was absolutely incredible. Every detail was taken care of, from luxury accommodations to expert guides.",
    content:
      "The African safari was absolutely incredible. Every detail was taken care of, from luxury accommodations to expert guides. I saw the Big Five and so much more! The conservation efforts we witnessed were inspiring, and our guide's knowledge of animal behavior was exceptional. The lodges were sustainable and comfortable, and the photography opportunities were endless. This trip reignited my passion for wildlife conservation.",
    fullText:
      "The African safari was absolutely incredible. Every detail was taken care of, from luxury accommodations to expert guides. I saw the Big Five and so much more! The conservation efforts we witnessed were inspiring, and our guide's knowledge of animal behavior was exceptional. The lodges were sustainable and comfortable, and the photography opportunities were endless. This trip reignited my passion for wildlife conservation.",
    image: "images/b1.jpeg?height=120&width=120",
    trip: "African Safari Expedition",
    tripName: "African Safari Expedition",
    tripDate: "February 2024",
    date: "February 2024",
    verified: true,
    featured: true,
    highlights: ["Big Five", "Conservation", "Expert Guides"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Family Travel Blogger",
    location: "Madrid, Spain",
    rating: 5,
    text: "Our family adventure in Costa Rica was perfect for all ages. The kids loved the wildlife, and we adults enjoyed the cultural experiences.",
    content:
      "Our family adventure in Costa Rica was perfect for all ages. The kids loved the wildlife, and we adults enjoyed the cultural experiences. TOURMAKER created an itinerary that balanced adventure with relaxation, education with fun. From zip-lining through cloud forests to learning about sustainable farming, every day brought new discoveries. The accommodations were family-friendly, and the guides were patient with our curious children.",
    fullText:
      "Our family adventure in Costa Rica was perfect for all ages. The kids loved the wildlife, and we adults enjoyed the cultural experiences. TOURMAKER created an itinerary that balanced adventure with relaxation, education with fun. From zip-lining through cloud forests to learning about sustainable farming, every day brought new discoveries. The accommodations were family-friendly, and the guides were patient with our curious children.",
    image: "images/g2.jpeg?height=120&width=120",
    trip: "Costa Rica Family Adventure",
    tripName: "Costa Rica Family Adventure",
    tripDate: "January 2024",
    date: "January 2024",
    verified: true,
    featured: true,
    highlights: ["Family Friendly", "Wildlife", "Adventure"],
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Outdoor Enthusiast",
    company: "REI Co-op",
    location: "London, UK",
    rating: 5,
    text: "The Patagonia wilderness trek was challenging but incredibly rewarding. The landscapes were breathtaking.",
    content:
      "The Patagonia wilderness trek was challenging but incredibly rewarding. The landscapes were breathtaking, and the small group size made it feel very personal. Our guide's expertise in mountaineering and local ecology enhanced every moment of the journey. The camping equipment was top-notch, and the meals were surprisingly gourmet for a wilderness expedition. This trip pushed my limits and exceeded my expectations.",
    fullText:
      "The Patagonia wilderness trek was challenging but incredibly rewarding. The landscapes were breathtaking, and the small group size made it feel very personal. Our guide's expertise in mountaineering and local ecology enhanced every moment of the journey. The camping equipment was top-notch, and the meals were surprisingly gourmet for a wilderness expedition. This trip pushed my limits and exceeded my expectations.",
    image: "images/b2.jpeg?height=120&width=120",
    trip: "Patagonia Wilderness Trek",
    tripName: "Patagonia Wilderness Trek",
    tripDate: "December 2023",
    date: "December 2023",
    verified: true,
    featured: true,
    highlights: ["Challenging", "Small Groups", "Expert Guides"],
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Cultural Anthropologist",
    company: "Oxford University",
    location: "Mumbai, India",
    rating: 5,
    text: "The cultural immersion program in Nepal was transformative. Living with local families and participating in daily traditions.",
    content:
      "The cultural immersion program in Nepal was transformative. Living with local families and participating in daily traditions gave me insights I could never gain from textbooks. TOURMAKER's commitment to responsible tourism and community support was evident throughout the journey. The homestays were authentic, the food was incredible, and the connections I made will last a lifetime.",
    fullText:
      "The cultural immersion program in Nepal was transformative. Living with local families and participating in daily traditions gave me insights I could never gain from textbooks. TOURMAKER's commitment to responsible tourism and community support was evident throughout the journey. The homestays were authentic, the food was incredible, and the connections I made will last a lifetime.",
    image: "images/g1.jpeg?height=120&width=120",
    trip: "Nepal Cultural Immersion",
    tripName: "Nepal Cultural Immersion",
    tripDate: "November 2023",
    date: "November 2023",
    verified: true,
    featured: false,
    highlights: ["Cultural", "Authentic", "Transformative"],
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Marine Biologist",
    location: "Sydney, Australia",
    rating: 5,
    text: "The Galápagos expedition was a dream come true. Swimming with sea lions and observing unique wildlife up close.",
    content:
      "The Galápagos expedition was a dream come true. Swimming with sea lions and observing unique wildlife up close was an unforgettable experience. The naturalist guides were incredibly knowledgeable about Darwin's research and current conservation efforts. The small group size allowed for intimate wildlife encounters while maintaining respect for the fragile ecosystem.",
    fullText:
      "The Galápagos expedition was a dream come true. Swimming with sea lions and observing unique wildlife up close was an unforgettable experience. The naturalist guides were incredibly knowledgeable about Darwin's research and current conservation efforts. The small group size allowed for intimate wildlife encounters while maintaining respect for the fragile ecosystem.",
    image: "images/b1.jpeg?height=120&width=120",
    trip: "Galápagos Wildlife Expedition",
    tripName: "Galápagos Wildlife Expedition",
    tripDate: "October 2023",
    date: "October 2023",
    verified: true,
    featured: false,
    highlights: ["Wildlife", "Conservation", "Unique Experience"],
  },
]
