import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import BlogForm from "@/components/BlogForm"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Add New Blog Post | TourMaker",
  description: "Create a new blog post for TourMaker",
  openGraph: {
    title: "Add New Blog Post | TourMaker",
    description: "Create a new blog post for TourMaker",
    type: "website",
    url: "https://tourmaker.com/admin/blogs/add",
  },
}

export default function AddBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/blogs">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <BlogForm />
    </div>
  )
}

