export interface Tour {
  id: string
  title: string
  category: string
  location: string
  days: number
  groupSize: string
  difficulty: "easy" | "moderate" | "challenging"
  price: number
  bestSeason: string
  description: string
  images: string[]
  itineraries: {
    day: number
    title: string
    description: string
    activities: string
    accommodation: string
    meals: string
    distance: string
    hours: string
    images: string[]
  }[]
  inclusions: string[]
  exclusions: string[]
  faqs: {
    question: string
    answer: string
  }[]
  termsAndConditions: string[]
  policies: string[]
  map: {
    latitude: number
    longitude: number
  }
}

export const tours: Tour[] = [
  {
    id: "1",
    title: "K2 Base Camp Trek",
    category: "Trekking",
    location: "Gilgit-Baltistan, Pakistan",
    days: 21,
    groupSize: "5-10",
    difficulty: "challenging",
    price: 3500,
    bestSeason: "June to August",
    description:
      "Experience the adventure of a lifetime with our K2 Base Camp Trek. This challenging 21-day journey takes you through the heart of the Karakoram Range to the base of the world's second-highest peak.",
    images: ["/images/k2-1.jpg", "/images/k2-2.jpg", "/images/k2-3.jpg"],
    itineraries: [
      {
        day: 1,
        title: "Arrival in Islamabad",
        description: "Arrive in Islamabad and transfer to the hotel. Briefing about the trek.",
        activities: "Rest and acclimatization",
        accommodation: "Hotel in Islamabad",
        meals: "Dinner",
        distance: "N/A",
        hours: "N/A",
        images: ["/images/islamabad.jpg"],
      },
      // Add more days here...
    ],
    inclusions: ["All ground transportation", "Experienced guide", "Camping equipment"],
    exclusions: ["International flights", "Personal expenses", "Travel insurance"],
    faqs: [
      {
        question: "How fit do I need to be for this trek?",
        answer:
          "This is a challenging trek that requires excellent physical fitness and previous high-altitude trekking experience.",
      },
      // Add more FAQs...
    ],
    termsAndConditions: ["Deposit required to secure booking", "Cancellation policy applies"],
    policies: ["Responsible tourism practices", "Leave No Trace principles"],
    map: { latitude: 35.88, longitude: 76.5144 },
  },
  {
    id: "2",
    title: "Hunza Valley Explorer",
    category: "Cultural",
    location: "Hunza, Gilgit-Baltistan, Pakistan",
    days: 10,
    groupSize: "4-12",
    difficulty: "moderate",
    price: 1800,
    bestSeason: "April to October",
    description:
      "Discover the beauty and culture of Hunza Valley with our 10-day explorer tour. Visit ancient forts, meet local artisans, and enjoy breathtaking mountain views.",
    images: ["/images/hunza-1.jpg", "/images/hunza-2.jpg"],
    itineraries: [
      {
        day: 1,
        title: "Arrival in Gilgit",
        description: "Fly to Gilgit and transfer to Karimabad, Hunza. Evening walk in the town.",
        activities: "Town exploration",
        accommodation: "Hotel in Karimabad",
        meals: "Dinner",
        distance: "100 km",
        hours: "2-3 hours drive",
        images: ["/images/gilgit.jpg"],
      },
      // Add more days here...
    ],
    inclusions: ["Domestic flights", "All accommodations", "Local guide"],
    exclusions: ["International flights", "Optional activities", "Gratuities"],
    faqs: [
      {
        question: "Is this tour suitable for families?",
        answer: "Yes, this tour is suitable for families with children aged 10 and above.",
      },
      // Add more FAQs...
    ],
    termsAndConditions: ["Minimum 4 participants required", "Maximum age limit: 70 years"],
    policies: ["Eco-friendly accommodations", "Support for local communities"],
    map: { latitude: 36.3167, longitude: 74.65 },
  },
  // Add more tours as needed...
]

