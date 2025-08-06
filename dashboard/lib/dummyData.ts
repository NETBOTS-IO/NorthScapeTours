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

export const dummyTours: Tour[] = [
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
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
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
        images: ["/placeholder.svg?height=400&width=600"],
      },
      {
        day: 2,
        title: "Fly to Skardu",
        description: "Morning flight to Skardu. Afternoon explore the town.",
        activities: "Town exploration",
        accommodation: "Hotel in Skardu",
        meals: "Breakfast, Lunch, Dinner",
        distance: "N/A",
        hours: "1 hour flight",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    inclusions: ["All ground transportation", "Experienced guide", "Camping equipment"],
    exclusions: ["International flights", "Personal expenses", "Travel insurance"],
    faqs: [
      {
        question: "How fit do I need to be for this trek?",
        answer:
          "This is a challenging trek that requires excellent physical fitness and previous high-altitude trekking experience.",
      },
      {
        question: "What is the best time to do this trek?",
        answer: "The best time is from June to August when the weather is most stable.",
      },
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
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
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
        images: ["/placeholder.svg?height=400&width=600"],
      },
      {
        day: 2,
        title: "Baltit Fort and Altit Fort",
        description: "Visit the historic Baltit and Altit forts. Afternoon visit to local craft shops.",
        activities: "Cultural visits",
        accommodation: "Hotel in Karimabad",
        meals: "Breakfast, Lunch, Dinner",
        distance: "5 km",
        hours: "6 hours",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    inclusions: ["Domestic flights", "All accommodations", "Local guide"],
    exclusions: ["International flights", "Optional activities", "Gratuities"],
    faqs: [
      {
        question: "Is this tour suitable for families?",
        answer: "Yes, this tour is suitable for families with children aged 10 and above.",
      },
      {
        question: "What type of accommodation is provided?",
        answer: "We stay in comfortable hotels and guesthouses with private bathrooms.",
      },
    ],
    termsAndConditions: ["Minimum 4 participants required", "Maximum age limit: 70 years"],
    policies: ["Eco-friendly accommodations", "Support for local communities"],
    map: { latitude: 36.3167, longitude: 74.65 },
  },
  {
    id: "3",
    title: "Fairy Meadows Trek",
    category: "Trekking",
    location: "Gilgit-Baltistan, Pakistan",
    days: 7,
    groupSize: "2-15",
    difficulty: "easy",
    price: 1200,
    bestSeason: "May to September",
    description:
      "Experience the magical Fairy Meadows with stunning views of Nanga Parbat, the world's ninth highest mountain. This trek is perfect for beginners and families.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    itineraries: [
      {
        day: 1,
        title: "Islamabad to Raikot Bridge",
        description: "Drive from Islamabad to Raikot Bridge via Karakoram Highway.",
        activities: "Scenic drive",
        accommodation: "Hotel in Raikot",
        meals: "Breakfast, Dinner",
        distance: "450 km",
        hours: "10-12 hours drive",
        images: ["/placeholder.svg?height=400&width=600"],
      },
      {
        day: 2,
        title: "Raikot Bridge to Fairy Meadows",
        description: "Jeep ride to Tato village followed by a trek to Fairy Meadows.",
        activities: "Jeep ride, Trekking",
        accommodation: "Cabin in Fairy Meadows",
        meals: "Breakfast, Lunch, Dinner",
        distance: "15 km",
        hours: "5-6 hours",
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    inclusions: ["Transportation", "Accommodation", "Meals as specified"],
    exclusions: ["Porters", "Tips", "Personal expenses"],
    faqs: [
      {
        question: "How difficult is the trek to Fairy Meadows?",
        answer: "The trek is relatively easy and suitable for beginners, though some sections are steep.",
      },
      {
        question: "Is there electricity at Fairy Meadows?",
        answer: "Yes, but it's limited and powered by generators that run only in the evening.",
      },
    ],
    termsAndConditions: ["Full payment required 30 days before departure", "Children under 5 not recommended"],
    policies: ["No littering policy", "Respect local customs"],
    map: { latitude: 35.3888, longitude: 74.5763 },
  },
]

// Blog types and data
export interface Blog {
  id: string
  title: string
  author: string
  content: string
  image: string
  tags: string[]
  date: string
}

export const dummyBlogs: Blog[] = [
  {
    id: "1",
    title: "10 Must-Visit Places in Northern Pakistan",
    author: "Sarah Johnson",
    content:
      "Northern Pakistan is a treasure trove of natural beauty and rich culture. In this blog post, we'll explore 10 must-visit destinations that will take your breath away. From the mighty Karakoram Highway to the serene Attabad Lake, each location offers a unique experience that will leave you in awe of Pakistan's diverse landscapes and warm hospitality.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["travel", "Pakistan", "adventure"],
    date: "2023-05-20",
  },
  {
    id: "2",
    title: "Preparing for Your First High-Altitude Trek",
    author: "Mike Wilson",
    content:
      "High-altitude trekking can be a life-changing experience, but it requires proper preparation. In this comprehensive guide, we'll cover essential tips to help you get ready for your first high-altitude adventure. From physical conditioning to acclimatization strategies, we'll ensure you're well-prepared to tackle the challenges and enjoy the rewards of trekking at elevation.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["trekking", "preparation", "adventure"],
    date: "2023-06-05",
  },
  {
    id: "3",
    title: "The Rich Cultural Heritage of Hunza Valley",
    author: "Amina Khan",
    content:
      "Hunza Valley is not only known for its stunning natural beauty but also for its rich cultural heritage. In this article, we delve into the fascinating history, traditions, and way of life of the Hunza people. From ancient forts to traditional music and dance, discover the cultural treasures that make Hunza Valley a truly unique destination.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["culture", "Hunza", "history"],
    date: "2023-06-10",
  },
]

// Inquiry types and data
export interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: "new" | "in-progress" | "resolved"
}

export const dummyInquiries: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "K2 Base Camp Trek Inquiry",
    message: "I'm interested in the K2 Base Camp Trek. Can you provide more details about the fitness requirements?",
    date: "2023-06-15",
    status: "new",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Hunza Valley Tour Question",
    message:
      "Hi, I'd like to know if the Hunza Valley Explorer tour is available in September. Also, are there any discounts for groups?",
    date: "2023-06-16",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Custom Tour Request",
    message:
      "I'm looking to organize a custom tour for a group of 8 people. We're interested in combining trekking and cultural experiences. Can you help with this?",
    date: "2023-06-17",
    status: "new",
  },
]

// User types and data
export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user"
}

export const dummyUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    role: "user",
  },
]

// Settings type and data
export interface Settings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
  }
  logo: string
}

export const dummySettings: Settings = {
  siteName: "Mountain Travels Pakistan",
  siteDescription: "Your premier adventure travel company in Pakistan",
  contactEmail: "info@mountaintravelspakistan.com",
  contactPhone: "+92 123 456 7890",
  address: "123 Adventure Street, Islamabad, Pakistan",
  socialLinks: {
    facebook: "https://facebook.com/mountaintravelspakistan",
    instagram: "https://instagram.com/mountaintravelspakistan",
    twitter: "https://twitter.com/mtpakistan",
    youtube: "https://youtube.com/mountaintravelspakistan",
  },
  logo: "/logo.png",
}

export const tours = dummyTours
export const blogs = dummyBlogs

