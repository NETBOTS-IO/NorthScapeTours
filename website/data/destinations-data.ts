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
  data: any
  _id?: string
  slug: string | undefined
  name: string
  country: string
  continent: string
  description: string
  destination:string
  longDescription: string
  shortDescription?: string
  inclusions:string[]
  exclusions:string[]
  images: string[]
  gallery: string[]
  highlights: string[] 
  bestTime: string
  days: string
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert"
  groupSize: string
  price: string
  rating: number
  reviews: number
  included: string[]
  notIncluded: string[]
  itineraries: {
    day: number
    title: string
    description: string
    activities: string[]
    accommodation?: string
    meals?: string[]
  }[]
  location: string
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
