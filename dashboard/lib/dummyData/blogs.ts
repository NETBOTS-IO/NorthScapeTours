export interface Blog {
  id: string
  title: string
  author: string
  date: string
  content: string
  image: string
  tags: string[]
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "10 Must-Visit Places in Northern Pakistan",
    author: "Sarah Johnson",
    date: "2023-05-20T09:00:00Z",
    content:
      "Northern Pakistan is a treasure trove of natural beauty and rich culture. In this blog post, we'll explore 10 must-visit destinations that will take your breath away. From the mighty Karakoram Highway to the serene Attabad Lake, each location offers a unique experience that will leave you in awe of Pakistan's diverse landscapes and warm hospitality.",
    image: "/images/northern-pakistan.jpg",
    tags: ["travel", "Pakistan", "adventure"],
  },
  {
    id: "2",
    title: "Preparing for Your First High-Altitude Trek",
    author: "Mike Wilson",
    date: "2023-06-05T11:30:00Z",
    content:
      "High-altitude trekking can be a life-changing experience, but it requires proper preparation. In this comprehensive guide, we'll cover essential tips to help you get ready for your first high-altitude adventure. From physical conditioning to acclimatization strategies, we'll ensure you're well-prepared to tackle the challenges and enjoy the rewards of trekking at elevation.",
    image: "/images/high-altitude-trek.jpg",
    tags: ["trekking", "preparation", "adventure"],
  },
  {
    id: "3",
    title: "The Rich Cultural Heritage of Hunza Valley",
    author: "Amina Khan",
    date: "2023-06-10T14:00:00Z",
    content:
      "Hunza Valley is not only known for its stunning natural beauty but also for its rich cultural heritage. In this article, we delve into the fascinating history, traditions, and way of life of the Hunza people. From ancient forts to traditional music and dance, discover the cultural treasures that make Hunza Valley a truly unique destination.",
    image: "/images/hunza-culture.jpg",
    tags: ["culture", "Hunza", "history"],
  },
  // Add more blog posts as needed...
]

