export interface HeroVideo {
  id: string
  title: string
  subtitle: string
  // videoUrl: string
  posterUrl: string
  location: string
  duration: number
  category: string
  primaryCTA: string
  secondaryCTA: string
}

export const heroVideos: HeroVideo[] = [
  {
    id: "nangma-adventure",
    title: "Discover Nangma Valley Baltistan",
    subtitle: "Experience the magic of Nangma Valley most beautiful paradise in Ghanche",
    // videoUrl: "images/marsur-rock.jpg?height=1080&width=1920&text=Bali+Adventure+Video",
    posterUrl: "/images/nangmavalley.jpg?height=1080&width=1920&text=Nangma+Poster",
    location: "Ghanche, Baltistan",
    duration: 15,
    category: "Adventure",
    primaryCTA: "Explore Nangma Vallye",
    secondaryCTA: "View Packages",
  },
  {
    id: "k2-mountianing",
    title: "Conquer the K2 Base Camp Mountianing",
    subtitle: "Breathtaking mountain adventures await in the heart of Shigar",
    // videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Swiss+Alps+Video",
    posterUrl: "/images/k2.jpg?height=1080&width=1920&text=k2+mountain+Poster",
    location: "Shigar, Skardu",
    duration: 12,
    category: "Mountain",
    primaryCTA: "Book Alpine Tour",
    secondaryCTA: "Learn More",
  },
  {
    id: "skardu-valley",
    title: "Luxury in the Skardu",
    subtitle: "Breathtaking Beauty of Skardu Valley, Gilgit Baltistan.",
    // videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Maldives+Luxury+Video",
    posterUrl: "/images/sunset.jpg?height=1080&width=1920&text=skardu+Poster",
    location: "Skardu, GB",
    duration: 18,
    category: "Luxury",
    primaryCTA: "Book Resort",
    secondaryCTA: "View Gallery",
  },
  {
    id: "hunza-culture",
    title: "Hunza Cultural Journey",
    subtitle: "Immerse yourself in Hunza vibrant culture and traditions",
    // videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Tokyo+Culture+Video",
    posterUrl: "/images/hunza.jpg?height=1080&width=1920&text=hunza+Poster",
    location: "Hunza, Gilgit Baltistan",
    duration: 20,
    category: "Culture",
    primaryCTA: "Explore Hunza",
    secondaryCTA: "Cultural Tours",
  },
  {
    id: "sarfaranga-safari",
    title: "Sarfaranga Safari Adventure",
    subtitle: "Exploring the Safari Advantures in Safaranga, Coldest Desert in the World.",
    // videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Kenya+Safari+Video",
    posterUrl: "/images/marsur-rock.jpg?height=1080&width=1920&text=Sarfaranga+Poster",
    location: "Sarfaranga Desert, Skardu",
    duration: 16,
    category: "Wildlife",
    primaryCTA: "Book Safari",
    secondaryCTA: "Wildlife Tours",
  },
  {
    id: "shagrila-trips",
    title: "Shangrila Escape",
    subtitle: "Experience the heaven of Skardu surrounded by crystal lakes and majestic mountains.",
    // videoUrl: "/videos/Travel_Video.mp4?height=1080&width=1920&text=Kenya+Safari+Video",
    posterUrl: "/images/shangrila.jpg?height=1080&width=1920&text=Shangrila+Poster",
    location: "Shrangila Resort, Skardu",
    duration: 16,
    category: "Luxary",
    primaryCTA: "Book Safari",
    secondaryCTA: "Explore Resort",
  },
]
