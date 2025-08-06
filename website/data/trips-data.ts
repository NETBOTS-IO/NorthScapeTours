export interface Trip {
  _id: string;
  name: string;
  country?: string;
  location?: string;
  category: string;
  days?: number;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  groupSize?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  originalPrice?: number;
  images?: string[];
  availability: boolean;
  nextDeparture?: string;
  features?: string[];
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  shortDescription?: string;
  longDescription?: string;
  overview?: string;
  whyChoose?: {
    title: string;
    description: string;
  }[];
  physicalRequirements?: string;
  bestTime?: string;
  itineraries?: {
    day: number;
    title: string;
    description: string;
    activities?: string[];
    accommodation?: string;
    meals?: string[];
    location?: string;
    duration?: string;
    type?: string;
    highlights?: string[];
    images?: string[];
  }[];
  featured?: boolean;
  tags?: string[];
  relatedTrips?: string[];
  destination?: string;
  faqs?: { question: string; answer: string }[];
  termsAndConditions?: string[];
  policies?: string[];
  map?: {
    latitude?: number;
    longitude?: number;
  };
  // Optionally include timestamps if used
  createdAt?: string;
  updatedAt?: string;
}

export const tripsData: Trip[] = [
  {
    _id: "1",
    name: "Andes Expedition",
    country: "Peru",
    location: "Cusco, Peru",
    category: "Trekking & Hiking",
    days: 3,
    difficulty: "Moderate",
    groupSize: "6-12 people",
    rating: 4.8,
    reviews: 112,
    price: 1899,
    originalPrice: 2199,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    availability: true,
    nextDeparture: "2024-05-10",
    features: ["Small Groups", "Expert Guides", "Cultural Immersion"],
    highlights: [
      "Machu Picchu visit",
      "Sacred Valley exploration",
      "High-altitude trekking",
      "Cultural immersion",
    ],
    shortDescription:
      "Join us for an unforgettable journey through the Andes, where you'll experience the rich culture of Peru, visit ancient Incan sites, and trek through some of the most stunning mountain scenery in the world.",
    longDescription:
      "Embark on the adventure of a lifetime with our Andes Expedition. This carefully crafted 10-day journey takes you through the heart of the Andes, offering breathtaking views, immersive cultural experiences, and the ultimate achievement of reaching Machu Picchu.",
    overview:
      "Embark on the adventure of a lifetime with our Everest Base Camp Ultimate Trek. This carefully crafted 14-day journey takes you through the heart of the Khumbu Valley, offering breathtaking views of the world's highest peaks, immersive cultural experiences with the legendary Sherpa people, and the ultimate achievement of reaching Everest Base Camp at 5,364 meters.",
    whyChoose: [
      {
        title: "Expert Local Guides",
        description:
          "Our certified guides have decades of experience and intimate knowledge of the region.",
      },
      {
        title: "Safety First",
        description:
          "Comprehensive safety protocols, emergency evacuation insurance, and medical support.",
      },
      {
        title: "Small Groups",
        description:
          "Maximum 12 people per group ensures personalized attention and authentic experiences.",
      },
      {
        title: "Cultural Immersion",
        description:
          "Stay in traditional lodges and experience genuine local hospitality.",
      },
    ],
    physicalRequirements:
      "This trek is rated as moderate and requires good physical fitness. Participants should be able to walk 6-8 hours daily on mountain terrain. Prior trekking experience is recommended but not mandatory.",
    bestTime:
      "The best times for this trek are during the dry season (May-September). These periods offer the clearest mountain views, stable weather conditions, and comfortable temperatures for trekking.",
    itineraries: [
      {
        day: 1,
        title: "Arrival in Cusco",
        description: "Welcome to Peru! Transfer to hotel and trip briefing.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Trip briefing",
        ],
        accommodation: "Hotel in Cusco",
        meals: ["Dinner"],
        location: "Cusco (3,400m)",
        duration: "Full Day",
        type: "arrival",
        highlights: [
          "Meet your trekking team",
          "Final preparations",
          "Explore Cusco",
        ],
      },
      {
        day: 2,
        title: "Sacred Valley Tour",
        description:
          "Explore the Sacred Valley and visit local markets and ruins.",
        activities: [
          "Pisac market",
          "Ollantaytambo ruins",
          "Lunch in Urubamba",
        ],
        accommodation: "Hotel in Sacred Valley",
        meals: ["Breakfast", "Lunch"],
        location: "Sacred Valley",
        duration: "Full Day",
        type: "tour",
        highlights: ["Pisac market", "Ollantaytambo ruins"],
      },
    ],
    featured: true,
    tags: ["Adventure", "Mountains", "Culture", "Peru", "Andes"],
    relatedTrips: ["andes-expedition", "andes-expedition-2"],
    destination: "Cusco, Peru",
  },
  {
    _id: "2",
    name: "Kenya Safari Adventure",
    country: "Kenya",
    location: "Nairobi, Kenya",
    category: "Wildlife Safaris",
    days: 8,
    difficulty: "Easy",
    groupSize: "4-8 people",
    rating: 4.9,
    reviews: 98,
    price: 2999,
    originalPrice: 3499,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    availability: true,
    nextDeparture: "2024-07-15",
    features: ["Luxury Lodges", "Private Vehicle", "Photography Focus"],
    highlights: [
      "Great Migration",
      "Big Five sightings",
      "Luxury lodges",
      "Cultural visits",
    ],
    shortDescription:
      "Witness the Great Migration, see the Big Five, and enjoy luxury lodges on this once-in-a-lifetime safari adventure in Kenya.",
    longDescription:
      "Experience the thrill of African wildlife on a guided safari through Kenya's top national parks. Enjoy luxury lodges, expert guides, and unforgettable wildlife encounters.",
    overview:
      "Experience the thrill of African wildlife on a guided safari through Kenya's top national parks. Enjoy luxury lodges, expert guides, and unforgettable wildlife encounters.",
    whyChoose: [
      {
        title: "Expert Safari Guides",
        description:
          "Our guides are wildlife experts with years of experience in Kenya's national parks.",
      },
      {
        title: "Luxury Lodges",
        description:
          "Stay in handpicked luxury lodges for maximum comfort and authentic safari experience.",
      },
      {
        title: "Big Five Guarantee",
        description:
          "We maximize your chances to see all of Africa's Big Five animals.",
      },
      {
        title: "Cultural Encounters",
        description:
          "Visit Maasai villages and experience local culture firsthand.",
      },
    ],
    physicalRequirements:
      "This safari is rated as easy and suitable for all fitness levels. Game drives are conducted in comfortable vehicles.",
    bestTime:
      "The best time for this safari is during the Great Migration (July-October) for optimal wildlife viewing.",
    itineraries: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Welcome to Kenya! City tour and safari briefing.",
        activities: ["Airport pickup", "Nairobi city tour", "Safari briefing"],
        accommodation: "Hotel in Nairobi",
        meals: ["Dinner"],
        location: "Nairobi",
        duration: "Full Day",
        type: "arrival",
        highlights: ["Meet your safari team", "Explore Nairobi"],
      },
      {
        day: 2,
        title: "Maasai Mara Game Drive",
        description:
          "First game drive in the world-famous Maasai Mara reserve.",
        activities: [
          "Drive to Maasai Mara",
          "Afternoon game drive",
          "Sunset viewing",
        ],
        accommodation: "Safari lodge in Maasai Mara",
        meals: ["Breakfast", "Lunch", "Dinner"],
        location: "Maasai Mara",
        duration: "Full Day",
        type: "game drive",
        highlights: ["Big Five sightings", "Great Migration"],
      },
    ],
    featured: true,
    tags: ["Wildlife", "Safari", "Africa", "Kenya", "Luxury"],
    relatedTrips: ["kenya-safari-adventure"],
    destination: "Nairobi, Kenya",
  },
  {
    _id: "3",
    name: "Everest Base Camp Ultimate Trek",
    country: "Nepal",
    location: "Khumbu Valley, Nepal",
    category: "Trekking & Hiking",
    days: 14,
    difficulty: "Challenging",
    groupSize: "8-16 people",
    rating: 4.9,
    reviews: 210,
    price: 2499,
    originalPrice: 2799,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    availability: true,
    nextDeparture: "2024-10-01",
    features: ["Sherpa Culture", "Panoramic Views", "Teahouse Trekking"],
    highlights: [
      "Reach Everest Base Camp (5,364m)",
      "Scenic flight to Lukla",
      "Namche Bazaar",
      "Tengboche Monastery",
      "Kala Patthar sunrise"
    ],
    shortDescription:
      "Trek to the legendary Everest Base Camp, experience Sherpa hospitality, and witness the majesty of the Himalayas.",
    longDescription:
      "This 14-day adventure takes you through the heart of the Khumbu Valley, offering breathtaking views of the world's highest peaks, immersive cultural experiences with the legendary Sherpa people, and the ultimate achievement of reaching Everest Base Camp at 5,364 meters.",
    overview:
      "Trek through the Khumbu Valley to Everest Base Camp, experiencing Sherpa culture and Himalayan vistas on this bucket-list adventure.",
    whyChoose: [
      {
        title: "Epic Himalayan Views",
        description: "Enjoy panoramic vistas of Everest, Lhotse, and Ama Dablam."
      },
      {
        title: "Sherpa Hospitality",
        description: "Stay in traditional teahouses and learn about Sherpa culture."
      },
      {
        title: "Expert Leadership",
        description: "Led by experienced guides with high safety standards."
      }
    ],
    physicalRequirements:
      "This trek is rated as challenging. Good fitness and some hiking experience are recommended. Daily hikes of 5-7 hours at altitude.",
    bestTime:
      "Spring (March-May) and Autumn (September-November) offer the best weather and views.",
    itineraries: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Meet your guide and group.",
        activities: ["Airport pickup", "Trip briefing"],
        accommodation: "Hotel in Kathmandu",
        meals: ["Dinner"],
        location: "Kathmandu",
        duration: "Half Day",
        type: "arrival",
        highlights: ["Meet your team", "Explore Kathmandu"]
      },
      {
        day: 2,
        title: "Fly to Lukla & Trek to Phakding",
        description: "Scenic flight to Lukla, trek begins.",
        activities: ["Flight to Lukla", "Trek to Phakding"],
        accommodation: "Teahouse in Phakding",
        meals: ["Breakfast", "Lunch", "Dinner"],
        location: "Phakding",
        duration: "Full Day",
        type: "trek",
        highlights: ["First views of the Himalayas"]
      }
    ],
    featured: true,
    tags: ["Trekking", "Himalayas", "Nepal", "Everest", "Adventure"],
    relatedTrips: ["andes-expedition"],
    destination: "Khumbu Valley, Nepal",
  },
  {
    _id: "4",
    name: "Japan Cherry Blossom Cultural Tour",
    country: "Japan",
    location: "Tokyo, Kyoto, Osaka",
    category: "Cultural Tours",
    days: 8,
    difficulty: "Easy",
    groupSize: "10-20 people",
    rating: 4.7,
    reviews: 87,
    price: 3199,
    originalPrice: 3499,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    availability: true,
    nextDeparture: "2025-03-25",
    features: ["Cherry Blossoms", "Temples", "Japanese Cuisine"],
    highlights: [
      "Hanami (cherry blossom viewing)",
      "Kyoto's ancient temples",
      "Traditional tea ceremony",
      "Osaka street food tour"
    ],
    shortDescription:
      "Experience Japan's cherry blossom season and immerse yourself in its rich culture and cuisine.",
    longDescription:
      "Travel through Japan during the magical cherry blossom season. Explore Tokyo's vibrant neighborhoods, Kyoto's tranquil temples, and Osaka's lively food scene. Enjoy authentic cultural experiences and the beauty of sakura in full bloom.",
    overview:
      "Travel through Japan during cherry blossom season, exploring Tokyo, Kyoto, and Osaka with authentic cultural experiences.",
    whyChoose: [
      {
        title: "Iconic Scenery",
        description: "Capture unforgettable moments under the cherry blossoms."
      },
      {
        title: "Cultural Immersion",
        description: "Participate in tea ceremonies and local traditions."
      },
      {
        title: "Expert Guides",
        description: "Guided by local experts passionate about Japanese culture."
      }
    ],
    physicalRequirements:
      "This tour is easy and suitable for all fitness levels. Some walking required in cities and gardens.",
    bestTime:
      "Late March to early April for peak cherry blossom viewing.",
    itineraries: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        description: "Welcome to Japan! Meet your guide and group.",
        activities: ["Airport pickup", "Welcome dinner"],
        accommodation: "Hotel in Tokyo",
        meals: ["Dinner"],
        location: "Tokyo",
        duration: "Half Day",
        type: "arrival",
        highlights: ["First cherry blossoms", "Tokyo skyline"]
      },
      {
        day: 2,
        title: "Tokyo City Tour & Ueno Park Hanami",
        description: "Explore Tokyo's highlights and enjoy hanami in Ueno Park.",
        activities: ["City tour", "Ueno Park hanami", "Senso-ji Temple"],
        accommodation: "Hotel in Tokyo",
        meals: ["Breakfast"],
        location: "Tokyo",
        duration: "Full Day",
        type: "sightseeing",
        highlights: ["Cherry blossoms", "Historic temples"]
      }
    ],
    featured: false,
    tags: ["Japan", "Cherry Blossom", "Culture", "Food", "Asia"],
    relatedTrips: [],
    destination: "Tokyo, Japan",
  },
  {
    _id: "5",
    name: "Galapagos Islands Luxury Cruise",
    country: "Ecuador",
    location: "Galapagos Islands",
    category: "Luxury Escapes",
    days: 7,
    difficulty: "Moderate",
    groupSize: "12-24 people",
    rating: 4.95,
    reviews: 65,
    price: 5999,
    originalPrice: 6499,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    availability: true,
    nextDeparture: "2024-11-15",
    features: ["All-Inclusive", "Naturalist Guides", "Snorkeling"],
    highlights: [
      "Snorkel with sea lions",
      "Visit uninhabited islands",
      "Giant tortoise encounters",
      "Luxury yacht experience"
    ],
    shortDescription:
      "Sail the Galapagos in style, discovering unique wildlife and pristine islands on a luxury yacht.",
    longDescription:
      "Experience the Galapagos Islands in ultimate comfort. This 7-day luxury cruise includes guided excursions, gourmet dining, and up-close encounters with the archipelago's extraordinary wildlife.",
    overview:
      "Sail the Galapagos in style on a luxury yacht, discovering unique wildlife and pristine islands with expert guides.",
    whyChoose: [
      {
        title: "All-Inclusive Luxury",
        description: "Enjoy gourmet meals, premium cabins, and top-tier service."
      },
      {
        title: "Wildlife Encounters",
        description: "See blue-footed boobies, marine iguanas, and giant tortoises."
      },
      {
        title: "Expert Naturalists",
        description: "Guided by certified naturalists for an educational experience."
      }
    ],
    physicalRequirements:
      "Moderate activity level. Includes daily excursions, short hikes, and snorkeling. Suitable for most travelers.",
    bestTime:
      "Year-round, but June to December offers cooler, drier weather and great wildlife viewing.",
    itineraries: [
      {
        day: 1,
        title: "Arrival in Baltra & Embarkation",
        description: "Arrive in the Galapagos, board your luxury yacht.",
        activities: ["Airport transfer", "Welcome briefing", "Set sail"],
        accommodation: "Luxury yacht cabin",
        meals: ["Lunch", "Dinner"],
        location: "Baltra Island",
        duration: "Half Day",
        type: "arrival",
        highlights: ["First wildlife sightings", "Luxury welcome"]
      },
      {
        day: 2,
        title: "North Seymour Island Exploration",
        description: "Discover seabird colonies and snorkel with marine life.",
        activities: ["Guided walk", "Snorkeling", "Wildlife viewing"],
        accommodation: "Luxury yacht cabin",
        meals: ["Breakfast", "Lunch", "Dinner"],
        location: "North Seymour Island",
        duration: "Full Day",
        type: "exploration",
        highlights: ["Blue-footed boobies", "Snorkeling adventure"]
      }
    ],
    featured: true,
    tags: ["Galapagos", "Luxury", "Wildlife", "Cruise", "Ecuador"],
    relatedTrips: [],
    destination: "Galapagos Islands",
  },
];

// export const getRelatedTrips = (tripId: number, limit = 3): Trip[] => {
//   const trip = tripsData.find((t) => t._id. === tripId);
//   if (!trip) return [];

//   return tripsData
//     .filter((t) => t._id !== tripId && trip.relatedTrips?.includes(t.slug))
//     .slice(0, limit);
// };

// export const getTripBySlug = (slug: string): Trip | undefined => {
//   return tripsData.find((trip) => trip.slug === slug);
// };

const categoryMeta: Record<string, { description: string; color: string }> = {
  "Trekking & Hiking": {
    description: "Challenge yourself with epic mountain adventures",
    color: "from-blue-500 to-blue-600",
  },
  "Wildlife Safaris": {
    description: "Encounter amazing wildlife in their natural habitat",
    color: "from-green-500 to-green-600",
  },
  "Cultural Tours": {
    description: "Immerse yourself in local traditions and customs",
    color: "from-purple-500 to-purple-600",
  },
  "Luxury Escapes": {
    description: "Indulge in premium comfort and exclusive experiences",
    color: "from-green-500 to-green-600",
  },
  "Water Adventures": {
    description: "Dive into exciting aquatic experiences",
    color: "from-cyan-500 to-cyan-600",
  },
  "Photography Tours": {
    description: "Capture stunning moments with expert guidance",
    color: "from-pink-500 to-pink-600",
  },
  "Eco Adventures": {
    description: "Sustainable travel that protects our planet",
    color: "from-emerald-500 to-emerald-600",
  },
  "Expeditions": {
    description: "Ultimate challenges for experienced adventurers",
    color: "from-red-500 to-red-600",
  },
};

export const tripCategories = Array.from(new Set(tripsData.map(trip => trip.category))).map(title => ({
  title,
  count: tripsData.filter(trip => trip.category === title).length,
  icon: 'mountain', // You can map category to icon string in the component
  description: categoryMeta[title]?.description || '',
  color: categoryMeta[title]?.color || 'from-blue-500 to-blue-600',
}));
