import type { Metadata } from "next"
import BlogPageClient from "@/components/blog/blog-page-client"

export const metadata: Metadata = {
  title: "Travel Blog - NORTHSCAPE | Travel Tips & Destination Guides",
  description:
    "Discover travel tips, destination guides, and inspiring stories from our adventures around the world. Get expert advice for your next journey.",
  keywords: "travel blog, travel tips, destination guides, travel stories, adventure blog, travel advice",
}

export default function BlogPage() {
  return (
    <div className="pt-16">
      <BlogPageClient />
    </div>
  )
}
