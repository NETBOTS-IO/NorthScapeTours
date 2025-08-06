"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import BlogForm from "@/components/BlogForm";
import { getBlogById } from "@/lib/data-utils";
import { type Blog } from "@/lib/types";
import Link from "next/link";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const fetchedBlog = await getBlogById(id as string);
          setBlog(fetchedBlog);
        } catch (error) {
          console.error("Failed to fetch blog:", error);
          setBlog(null);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin/blogs">
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Button>
        </Link>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-700">Blog not found</h2>
          <p className="text-gray-500 mt-2">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/blogs">
        <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm blogId={id as string} initialData={blog} />
    </div>
  );
}
