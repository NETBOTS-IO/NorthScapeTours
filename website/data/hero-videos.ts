export interface HeroVideo {
  id: string
  title: string
  subtitle: string
  videoUrl: string
  posterUrl: string
  location: string
  duration: number
  category: string
  primaryCTA: string
  secondaryCTA: string
}

export const heroVideos: HeroVideo[] = [
  {
    id: "bali-adventure",
    title: "Discover Bali's Hidden Gems",
    subtitle: "Experience the magic of Indonesia's most beautiful island paradise",
    videoUrl: "images/marsur-rock.jpg?height=1080&width=1920&text=Bali+Adventure+Video",
    posterUrl: "/placeholder.svg?height=1080&width=1920&text=Bali+Poster",
    location: "Bali, Indonesia",
    duration: 15,
    category: "Adventure",
    primaryCTA: "Explore Bali",
    secondaryCTA: "View Packages",
  },
  {
    id: "swiss-alps",
    title: "Conquer the Swiss Alps",
    subtitle: "Breathtaking mountain adventures await in the heart of Europe",
    videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Swiss+Alps+Video",
    posterUrl: "/images/marsur-rock.jpg?height=1080&width=1920&text=Swiss+Alps+Poster",
    location: "Swiss Alps, Switzerland",
    duration: 12,
    category: "Mountain",
    primaryCTA: "Book Alpine Tour",
    secondaryCTA: "Learn More",
  },
  {
    id: "maldives-luxury",
    title: "Luxury in the Maldives",
    subtitle: "Indulge in pristine beaches and crystal-clear waters",
    videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Maldives+Luxury+Video",
    posterUrl: "/images/marsur-rock.jpg?height=1080&width=1920&text=Maldives+Poster",
    location: "Maldives",
    duration: 18,
    category: "Luxury",
    primaryCTA: "Book Resort",
    secondaryCTA: "View Gallery",
  },
  {
    id: "tokyo-culture",
    title: "Tokyo Cultural Journey",
    subtitle: "Immerse yourself in Japan's vibrant culture and traditions",
    videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Tokyo+Culture+Video",
    posterUrl: "/images/marsur-rock.jpg?height=1080&width=1920&text=Tokyo+Poster",
    location: "Tokyo, Japan",
    duration: 20,
    category: "Culture",
    primaryCTA: "Explore Tokyo",
    secondaryCTA: "Cultural Tours",
  },
  {
    id: "safari-kenya",
    title: "African Safari Adventure",
    subtitle: "Witness the incredible wildlife of Kenya's national parks",
    videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Kenya+Safari+Video",
    posterUrl: "/images/marsur-rock.jpg?height=1080&width=1920&text=Safari+Poster",
    location: "Kenya, Africa",
    duration: 16,
    category: "Wildlife",
    primaryCTA: "Book Safari",
    secondaryCTA: "Wildlife Tours",
  },
]
