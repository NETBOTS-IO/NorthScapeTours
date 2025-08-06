export interface Attraction {
  id: number
  name: string
  description: string
  image: string
  rating: number
  visitDuration: string
  difficulty: string
  bestTime: string
  highlights: string[]
  category: string
}

export interface Destination {
  id: number
  slug: string
  name: string
  country: string
  continent: string
  description: string
  longDescription: string
  heroImage: string
  gallery: string[]
  highlights: string[]
  bestTimeToVisit: string
  duration: string
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert"
  groupSize: string
  price: {
    from: number
    currency: string
  }
  rating: number
  reviewCount: number
  included: string[]
  notIncluded: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    meals?: string[]
  }[]
  location: {
    coordinates: [number, number]
    nearestAirport: string
    timezone: string
  }
  weather: {
    season: string
    temperature: string
    conditions: string
  }[]
  essentials: {
    category: string
    items: string[]
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  relatedDestinations: string[]
  featured: boolean
  category: string
  tags: string[]
  attractions?: Attraction[]
}

export const destinationsData: Destination[] = [
  {
    id: 1,
    slug: "himalayan-base-camp-trek",
    name: "Himalayan Base Camp Trek",
    country: "Nepal",
    continent: "Asia",
    description: "Experience the ultimate adventure with breathtaking mountain views and cultural immersion.",
    longDescription:
      "Embark on the journey of a lifetime to the base camp of the world's highest peaks. This incredible trek combines stunning mountain vistas, rich Sherpa culture, and personal achievement. Walk in the footsteps of legendary mountaineers while experiencing the warmth of local hospitality and the raw beauty of the Himalayas.",
    heroImage: "/images/marsur-rock.jpg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "Reach Everest Base Camp at 5,364m",
      "Experience authentic Sherpa culture",
      "Visit ancient Buddhist monasteries",
      "Witness sunrise from Kala Patthar",
      "Cross suspension bridges over deep gorges",
      "Stay in traditional mountain lodges",
    ],
    bestTimeToVisit: "March-May, September-November",
    duration: "14 days",
    difficulty: "Challenging",
    groupSize: "8-12 people",
    price: {
      from: 2499,
      currency: "USD",
    },
    rating: 4.9,
    reviewCount: 247,
    included: [
      "Professional mountain guide",
      "All permits and fees",
      "Accommodation in lodges",
      "All meals during trek",
      "Domestic flights",
      "Airport transfers",
      "First aid kit and oxygen",
      "Porter services",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal equipment",
      "Tips for guides and porters",
      "Extra meals in Kathmandu",
      "Personal expenses",
      "Emergency evacuation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Transfer to hotel and trip briefing.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Trip briefing"],
        accommodation: "Hotel in Kathmandu",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Fly to Lukla, Trek to Phakding",
        description: "Scenic flight to Lukla followed by first day of trekking.",
        activities: ["Early morning flight", "Meet trekking crew", "Trek to Phakding", "River valley walk"],
        accommodation: "Lodge in Phakding",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Trek to Namche Bazaar",
        description: "Cross suspension bridges and climb to the Sherpa capital.",
        activities: ["Cross Dudh Koshi river", "Enter Sagarmatha National Park", "First Everest view", "Arrive Namche"],
        accommodation: "Lodge in Namche Bazaar",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        title: "Acclimatization Day in Namche",
        description: "Rest day for altitude acclimatization with optional hikes.",
        activities: [
          "Visit Everest View Hotel",
          "Explore Namche market",
          "Visit Sherpa museum",
          "Short acclimatization hike",
        ],
        accommodation: "Lodge in Namche Bazaar",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        title: "Trek to Tengboche",
        description: "Visit the famous Tengboche Monastery with stunning mountain views.",
        activities: [
          "Rhododendron forest walk",
          "Visit Tengboche Monastery",
          "Mountain panorama views",
          "Evening prayers",
        ],
        accommodation: "Lodge in Tengboche",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],
    location: {
      coordinates: [27.9881, 86.925],
      nearestAirport: "Tribhuvan International Airport (KTM)",
      timezone: "Nepal Time (NPT)",
    },
    weather: [
      {
        season: "Spring (Mar-May)",
        temperature: "10-15°C at altitude",
        conditions: "Clear skies, blooming rhododendrons",
      },
      {
        season: "Autumn (Sep-Nov)",
        temperature: "5-10°C at altitude",
        conditions: "Stable weather, excellent visibility",
      },
      {
        season: "Winter (Dec-Feb)",
        temperature: "-10 to 5°C",
        conditions: "Cold, possible snow, clear mountain views",
      },
    ],
    essentials: [
      {
        category: "Clothing",
        items: ["Insulated jacket", "Trekking boots", "Warm layers", "Rain gear", "Sun hat", "Gloves"],
      },
      {
        category: "Equipment",
        items: ["Sleeping bag", "Trekking poles", "Headlamp", "Sunglasses", "Water bottles", "Daypack"],
      },
      {
        category: "Personal",
        items: ["Sunscreen", "First aid kit", "Altitude sickness medication", "Camera", "Power bank", "Snacks"],
      },
    ],
    faqs: [
      {
        question: "What is the best time to trek to Everest Base Camp?",
        answer:
          "The best times are pre-monsoon (March-May) and post-monsoon (September-November) when weather is stable and views are clear.",
      },
      {
        question: "Do I need previous trekking experience?",
        answer:
          "While previous high-altitude experience is helpful, it's not mandatory. Good physical fitness and mental preparation are essential.",
      },
      {
        question: "What about altitude sickness?",
        answer:
          "We follow a carefully planned itinerary with proper acclimatization days. Our guides are trained in altitude sickness recognition and treatment.",
      },
      {
        question: "What accommodation can I expect?",
        answer:
          "You'll stay in traditional mountain lodges (teahouses) with basic but comfortable rooms and shared facilities.",
      },
    ],
    relatedDestinations: ["annapurna-circuit", "manaslu-circuit", "langtang-valley"],
    featured: true,
    category: "Trekking",
    tags: ["Adventure", "Mountains", "Culture", "Challenge", "Nepal", "Himalayas"],
    attractions: [
      {
        id: 1,
        name: "Sacred Mountain Summit",
        description:
          "Reach the breathtaking summit with panoramic views of the entire mountain range. This iconic peak offers spiritual significance and incredible photo opportunities.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        visitDuration: "2-3 hours",
        difficulty: "Challenging",
        bestTime: "Early morning",
        highlights: ["360° panoramic views", "Sunrise viewing", "Prayer flags", "Photo opportunities"],
        category: "Mountain Peak",
      },
      {
        id: 2,
        name: "Ancient Monastery",
        description:
          "Explore this centuries-old monastery featuring traditional architecture, ancient artifacts, and peaceful meditation gardens.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        visitDuration: "1-2 hours",
        difficulty: "Easy",
        bestTime: "Afternoon",
        highlights: ["Buddhist artifacts", "Traditional architecture", "Meditation gardens", "Cultural immersion"],
        category: "Cultural Site",
      },
      {
        id: 3,
        name: "Suspension Bridge Valley",
        description:
          "Cross dramatic suspension bridges over deep gorges with rushing rivers below. An adrenaline-pumping experience with stunning views.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.7,
        visitDuration: "1 hour",
        difficulty: "Moderate",
        bestTime: "Midday",
        highlights: ["Suspension bridges", "Deep gorges", "River views", "Adventure experience"],
        category: "Adventure Site",
      },
      {
        id: 4,
        name: "Sherpa Village",
        description:
          "Immerse yourself in authentic Sherpa culture, visit local homes, and learn about traditional mountain life and customs.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        visitDuration: "2-4 hours",
        difficulty: "Easy",
        bestTime: "Morning",
        highlights: ["Cultural immersion", "Traditional homes", "Local customs", "Community interaction"],
        category: "Cultural Experience",
      },
      {
        id: 5,
        name: "Alpine Lake",
        description:
          "Discover pristine alpine lakes reflecting snow-capped peaks. Perfect for rest, reflection, and incredible photography.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.6,
        visitDuration: "1-2 hours",
        difficulty: "Moderate",
        bestTime: "Late afternoon",
        highlights: ["Mirror reflections", "Snow-capped peaks", "Wildlife viewing", "Photography"],
        category: "Natural Wonder",
      },
      {
        id: 6,
        name: "Rhododendron Forest",
        description:
          "Walk through enchanting forests filled with colorful rhododendron blooms (seasonal) and diverse wildlife.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.5,
        visitDuration: "2-3 hours",
        difficulty: "Easy",
        bestTime: "Spring mornings",
        highlights: ["Colorful blooms", "Wildlife spotting", "Forest trails", "Seasonal beauty"],
        category: "Nature Trail",
      },
    ],
  },
  {
    id: 2,
    slug: "african-safari-adventure",
    name: "African Safari Adventure",
    country: "Kenya & Tanzania",
    continent: "Africa",
    description: "Witness the Great Migration and encounter Africa's Big Five in their natural habitat.",
    longDescription:
      "Experience the raw beauty and incredible wildlife of East Africa on this comprehensive safari adventure. From the vast plains of the Serengeti to the stunning Ngorongoro Crater, witness nature's greatest spectacle - the Great Migration - while staying in luxury safari camps and lodges.",
    heroImage: "/images/mountain.jpg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "Witness the Great Migration",
      "Spot the Big Five animals",
      "Visit Ngorongoro Crater",
      "Luxury safari lodges",
      "Maasai cultural experience",
      "Hot air balloon safari",
    ],
    bestTimeToVisit: "June-October, December-March",
    duration: "10 days",
    difficulty: "Easy",
    groupSize: "6-8 people",
    price: {
      from: 3299,
      currency: "USD",
    },
    rating: 4.8,
    reviewCount: 189,
    included: [
      "Luxury safari vehicles",
      "Professional safari guide",
      "All park fees",
      "Luxury lodge accommodation",
      "All meals",
      "Airport transfers",
      "Game drives",
      "Cultural visits",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips for guides",
      "Personal expenses",
      "Alcoholic beverages",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Welcome to Kenya! City tour and preparation for safari.",
        activities: ["Airport pickup", "Nairobi city tour", "Safari briefing", "Equipment check"],
        accommodation: "Luxury hotel in Nairobi",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Maasai Mara National Reserve",
        description: "Enter the world-famous Maasai Mara for your first game drive.",
        activities: ["Drive to Maasai Mara", "Afternoon game drive", "Sunset viewing", "Welcome dinner"],
        accommodation: "Safari lodge in Maasai Mara",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],
    location: {
      coordinates: [-1.2921, 36.8219],
      nearestAirport: "Jomo Kenyatta International Airport (NBO)",
      timezone: "East Africa Time (EAT)",
    },
    weather: [
      {
        season: "Dry Season (Jun-Oct)",
        temperature: "20-28°C",
        conditions: "Sunny, minimal rainfall, excellent wildlife viewing",
      },
      {
        season: "Short Rains (Nov-Dec)",
        temperature: "22-30°C",
        conditions: "Brief afternoon showers, lush landscapes",
      },
    ],
    essentials: [
      {
        category: "Clothing",
        items: ["Neutral colored clothing", "Sun hat", "Light jacket", "Comfortable shoes", "Swimwear"],
      },
      {
        category: "Equipment",
        items: ["Binoculars", "Camera with zoom lens", "Sunglasses", "Sunscreen", "Insect repellent"],
      },
    ],
    faqs: [
      {
        question: "When is the best time to see the Great Migration?",
        answer:
          "The Great Migration occurs year-round, but the best viewing is typically July-October in Maasai Mara and December-July in Serengeti.",
      },
      {
        question: "What animals will I see?",
        answer:
          "You'll have excellent chances to see the Big Five (lion, leopard, elephant, buffalo, rhino) plus cheetahs, giraffes, zebras, wildebeest, and hundreds of bird species.",
      },
    ],
    relatedDestinations: ["serengeti-migration", "gorilla-trekking", "victoria-falls"],
    featured: true,
    category: "Safari",
    tags: ["Wildlife", "Safari", "Africa", "Big Five", "Migration", "Luxury"],
    attractions: [
      {
        id: 1,
        name: "Maasai Mara National Reserve",
        description: "World-famous reserve known for the Great Migration and Big Five sightings.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.9,
        visitDuration: "Full day",
        difficulty: "Easy",
        bestTime: "July-October",
        highlights: ["Great Migration", "Big Five", "Game drives", "Scenic landscapes"],
        category: "Wildlife Reserve",
      },
      {
        id: 2,
        name: "Ngorongoro Crater",
        description: "A UNESCO World Heritage Site with diverse wildlife and stunning views.",
        image: "/placeholder.svg?height=300&width=400",
        rating: 4.8,
        visitDuration: "Half day",
        difficulty: "Easy",
        bestTime: "June-October",
        highlights: ["Crater views", "Wildlife spotting", "Photography"],
        category: "Natural Wonder",
      },
    ],
  },
  {
    id: 3,
    slug: "angkor-wat-culture-tour",
    name: "Angkor Wat Cultural Tour",
    country: "Cambodia",
    continent: "Asia",
    description: "Discover the magnificent temples of Angkor and immerse yourself in ancient Khmer culture.",
    longDescription:
      "Embark on a journey of a lifetime to the temples of Angkor and experience the rich Khmer culture. From the intricate carvings to the stunning architecture, this cultural tour will transport you to a world of history and tradition.",
    heroImage: "/images/marsur-rock.jpg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "Angkor Wat",
      "Bayon Temple",
      "Local Markets",
      "Floating Villages",
      "Temple Visits",
      "Monuments",
    ],
    bestTimeToVisit: "November-March",
    duration: "10 days",
    difficulty: "Easy",
    groupSize: "6-10 people",
    price: {
      from: 1999,
      currency: "USD",
    },
    rating: 4.7,
    reviewCount: 156,
    included: [
      "Luxury tours",
      "Luxury lodge accommodation",
      "All meals",
      "Airport transfers",
      "Cultural tours",
      "Cultural visits",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Phnom Penh",
        description: "Welcome to Cambodia! Transfer to hotel and trip briefing.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Trip briefing"],
        accommodation: "Luxury hotel in Phnom Penh",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Angkor Wat",
        description: "Explore the magnificent temples of Angkor and immerse yourself in ancient Khmer culture.",
        activities: ["Temple tour", "Temple visits", "Floating villages", "Bayon temple"],
        accommodation: "Luxury lodge in Angkor Wat",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],
    location: {
      coordinates: [10.75, 104.9167],
      nearestAirport: "Phnom Penh International Airport (PNH)",
      timezone: "Indochina Time (ICT)",
    },
    weather: [
      {
        season: "Dry Season (Nov-Mar)",
        temperature: "20-28°C",
        conditions: "Sunny, minimal rainfall, excellent wildlife viewing",
      },
      {
        season: "Rainy Season (Apr-Oct)",
        temperature: "20-30°C",
        conditions: "Brief afternoon showers, lush landscapes",
      },
    ],
    essentials: [
      {
        category: "Clothing",
        items: ["Neutral colored clothing", "Sun hat", "Light jacket", "Comfortable shoes", "Swimwear"],
      },
      {
        category: "Equipment",
        items: ["Binoculars", "Camera with zoom lens", "Sunglasses", "Sunscreen", "Insect repellent"],
      },
    ],
    faqs: [
      {
        question: "What is the best time to visit Angkor Wat?",
        answer:
          "The best time to visit Angkor Wat is during the dry season (November-March) when the weather is sunny and the temples are open. The rainy season (April-October) is ideal for those who want to avoid the crowds and enjoy the lush landscapes.",
      },
      {
        question: "What is the best way to get around Angkor Wat?",
        answer:
          "The best way to get around Angkor Wat is by foot or by hiking. You can also take a taxi or a motorbike tour to explore the temples at your own pace.",
      },
      {
        question: "What is the best way to explore the temples?",
        answer:
          "The best way to explore the temples is by taking a guided tour. A knowledgeable guide can provide insights into the history and significance of each temple.",
      },
    ],
    relatedDestinations: ["mandalay-temple", "champa-temple", "wat-phinom", "wat-koh-rattan"],
    featured: true,
    category: "Culture",
    tags: ["Temples", "Architecture", "Khmer", "Culture", "Cambodia", "Angkor Wat"],
  },
  {
    id: 4,
    slug: "costa-rica-family-adventure",
    name: "Costa Rica Family Adventure",
    country: "Costa Rica",
    continent: "Americas",
    description: "Perfect family adventure with wildlife, beaches, and exciting activities suitable for all ages.",
    longDescription:
      "Experience the magic of Costa Rica's lush rainforests, pristine beaches, and endless wildlife. From zip-lining to zip-lining, this family adventure will transport you to a world of natural wonders and adventure.",
    heroImage: "/images/mountain.jpg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "Manuel Antonio",
      "Zip Lining",
      "Wildlife Spotting",
      "Beach Time",
      "Family-Friendly Activities",
      "Adventure Activities",
    ],
    bestTimeToVisit: "December-April",
    duration: "8 days",
    difficulty: "Easy",
    groupSize: "4-8 people",
    price: {
      from: 2999,
      currency: "USD",
    },
    rating: 4.6,
    reviewCount: 203,
    included: [
      "Luxury tours",
      "Luxury lodge accommodation",
      "All meals",
      "Airport transfers",
      "Family-Friendly Activities",
      "Adventure Activities",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages",
      "Optional activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in San Jose",
        description: "Welcome to Costa Rica! Transfer to hotel and trip briefing.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Trip briefing"],
        accommodation: "Luxury hotel in San Jose",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Visit Manuel Antonio",
        description: "Explore the stunning rainforests of Manuel Antonio and witness the wildlife of the area.",
        activities: ["Wildlife spotting", "Zip-lining", "Beach time", "Family-friendly activities"],
        accommodation: "Luxury lodge in Manuel Antonio",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],
    location: {
      coordinates: [9.93333, -84.08333],
      nearestAirport: "Juan Santamaria International Airport (SJO)",
      timezone: "Central Time (CST)",
    },
    weather: [
      {
        season: "Dry Season (Dec-Apr)",
        temperature: "20-28°C",
        conditions: "Sunny, minimal rainfall, excellent wildlife viewing",
      },
      {
        season: "Rainy Season (May-Nov)",
        temperature: "20-30°C",
        conditions: "Brief afternoon showers, lush landscapes",
      },
    ],
    essentials: [
      {
        category: "Clothing",
        items: ["Neutral colored clothing", "Sun hat", "Light jacket", "Comfortable shoes", "Swimwear"],
      },
      {
        category: "Equipment",
        items: ["Binoculars", "Camera with zoom lens", "Sunglasses", "Sunscreen", "Insect repellent"],
      },
    ],
    faqs: [
      {
        question: "What is the best time to visit Manuel Antonio?",
        answer:
          "The best time to visit Manuel Antonio is during the dry season (December-April) when the weather is sunny and the wildlife is active. The rainy season (May-Nov) is ideal for those who want to avoid the crowds and enjoy the lush landscapes.",
      },
      {
        question: "What is the best way to get around Manuel Antonio?",
        answer:
          "The best way to get around Manuel Antonio is by foot or by hiking. You can also take a taxi or a motorbike tour to explore the area at your own pace.",
      },
      {
        question: "What is the best way to explore the area?",
        answer:
          "The best way to explore the area is by taking a guided tour. A knowledgeable guide can provide insights into the history and significance of the area.",
      },
    ],    
    relatedDestinations: ["san-jose-city", "san-juan-bautista-de-tucuman", "san-carlos-de-bara", "san-miguel-de-tucuman"],
    featured: true,
    category: "Family",
    tags: ["Wildlife", "Adventure", "Luxury", "Family", "Costa Rica", "Manuel Antonio"],
  },
  {
    id: 5,
    slug: "everest-base-camp-trek",
    name: "Everest Base Camp Trek",
    country: "Nepal",
    continent: "Asia",
    description: "Explore the stunning Himalayan mountains and trek to the base camp of the world's highest peak.",
    longDescription:
      "Experience the breathtaking beauty of the Himalayas and trek to the base camp of the world's highest peak. This adventure will transport you to a world of natural wonders and adventure.",
    heroImage: "/images/marsur-rock.jpg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "Trek to Everest Base Camp",
      "Skiing and Snowboarding",
      "Hiking and Trekking",
      "Mountain Climbing",
      "Camping",
      "Wildlife Viewing",
    ],
    bestTimeToVisit: "March-May, September-November",
    duration: "14 days",
    difficulty: "Challenging",
    groupSize: "8-12 people",
    price: {
      from: 2499,
      currency: "USD",
    },
    rating: 4.9,
    reviewCount: 247,
    included: [
      "Professional mountain guide",
      "All permits and fees",
      "Accommodation in lodges",
      "All meals during trek",
      "Domestic flights",
      "Airport transfers",
      "First aid kit and oxygen",
      "Porter services",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal equipment",
      "Tips for guides and porters",
      "Extra meals in Kathmandu",
      "Personal expenses",
      "Emergency evacuation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Transfer to hotel and trip briefing.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Trip briefing"],
        accommodation: "Hotel in Kathmandu",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Fly to Lukla, Trek to Phakding",
        description: "Scenic flight to Lukla followed by first day of trekking.",
        activities: ["Early morning flight", "Meet trekking crew", "Trek to Phakding", "River valley walk"],
        accommodation: "Lodge in Phakding",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        title: "Trek to Namche Bazaar",
        description: "Cross suspension bridges and climb to the Sherpa capital.",
        activities: ["Cross Dudh Koshi river", "Enter Sagarmatha National Park", "First Everest view", "Arrive Namche"],
        accommodation: "Lodge in Namche Bazaar",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        title: "Acclimatization Day in Namche",
        description: "Rest day for altitude acclimatization with optional hikes.",
        activities: [
          "Visit Everest View Hotel",
          "Explore Namche market",
          "Visit Sherpa museum",
          "Short acclimatization hike",
        ],
        accommodation: "Lodge in Namche Bazaar",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        title: "Trek to Tengboche",
        description: "Visit the famous Tengboche Monastery with stunning mountain views.",
        activities: [
          "Rhododendron forest walk",
          "Visit Tengboche Monastery",
          "Mountain panorama views",
          "Evening prayers",
        ],
        accommodation: "Lodge in Tengboche",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],
    location: {
      coordinates: [27.9881, 86.925],
      nearestAirport: "Tribhuvan International Airport (KTM)",
      timezone: "Nepal Time (NPT)",
    },
    weather: [
      {
        season: "Spring (Mar-May)",
        temperature: "10-15°C at altitude",
        conditions: "Clear skies, blooming rhododendrons",
      },
      {
        season: "Autumn (Sep-Nov)",
        temperature: "5-10°C at altitude",
        conditions: "Stable weather, excellent visibility",
      },
      {
        season: "Winter (Dec-Feb)",
        temperature: "-10 to 5°C",
        conditions: "Cold, possible snow, clear mountain views",
      },
    ],
    essentials: [
      {
        category: "Clothing",
        items: ["Insulated jacket", "Trekking boots", "Warm layers", "Rain gear", "Sun hat", "Gloves"],
      },
      {
        category: "Equipment",
        items: ["Sleeping bag", "Trekking poles", "Headlamp", "Sunglasses", "Water bottles", "Daypack"],
      },
      {
        category: "Personal",
        items: ["Sunscreen", "First aid kit", "Altitude sickness medication", "Camera", "Power bank", "Snacks"],
      },
    ],
    faqs: [
      {
        question: "What is the best time to trek to Everest Base Camp?",
        answer:
          "The best times are pre-monsoon (March-May) and post-monsoon (September-November) when weather is stable and views are clear.",
      },
      {
        question: "Do I need previous trekking experience?",
        answer:
          "While previous high-altitude experience is helpful, it's not mandatory. Good physical fitness and mental preparation are essential.",
      },
      {
        question: "What about altitude sickness?",
        answer:
          "We follow a carefully planned itinerary with proper acclimatization days. Our guides are trained in altitude sickness recognition and treatment.",
      },
      {
        question: "What accommodation can I expect?",
        answer:
          "You'll stay in traditional mountain lodges (teahouses) with basic but comfortable rooms and shared facilities.",
      },
    ],
    relatedDestinations: ["annapurna-circuit", "manaslu-circuit", "langtang-valley"],
    featured: true,
    category: "Trekking",
    tags: ["Adventure", "Mountains", "Culture", "Challenge", "Nepal", "Himalayas"],
  },
]

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return destinationsData.find((destination) => destination.slug === slug)
}

export const getRelatedDestinations = (destinationId: number, limit = 3): Destination[] => {
  const destination = destinationsData.find((d) => d.id === destinationId)
  if (!destination) return []

  return destinationsData
    .filter((d) => d.id !== destinationId && destination.relatedDestinations.includes(d.slug))
    .slice(0, limit)
}
