"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronLeft, Calendar, User, Tag, Edit, Clock } from "lucide-react";
import { getBlogById } from "@/lib/data-utils";
import { type Blog } from "@/lib/types";
import Link from "next/link";
import { BASE_URL } from "@/Var";
import Image from "next/image";

export default function ViewBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fettchBlog = async () => {
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
    fettchBlog();
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
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-700">
                Blog not found
              </h2>
              <p className="text-gray-500 mt-2">
                The blog post you're looking for doesn't exist or has been
                removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/blogs">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </Link>

      <Card>
        <CardHeader>
          {blog.coverImage && (
            <div className="w-full mb-6">
              <Image
                src={blog.coverImage ? `${BASE_URL}${blog.coverImage}` : "/placeholder.svg?height=400&width=600"}
                alt={blog.content.blocks.find((block) => block.type === "image")?.data.caption ?? blog.title}
                width={600}
                height={400}
                className="w-full object-cover rounded-md"
              />
            </div>
          )}
          <CardTitle className="text-2xl md:text-3xl">{blog.title}</CardTitle>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(blog.createdAt).toLocaleDateString()} |{" "}
              {new Date(blog.createdAt).toLocaleTimeString()}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {blog.readTime} min(s) read
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-line">
              {blog.content.blocks.map((block) => (
                <div key={block.id}>
                  {block.type === "paragraph" && (
                    <p className="text-medium text-gray-900 mb-4">{block.data.text}</p>
                  )}
                  {block.type === "header" && (
                    <h2 className="text-lg text-gray-700 mb-4">{block.data.text}</h2>
                  )}
                  {block.type === "image" && (
                    <div className="flex flex-col items-center justify-center mb-4">
                      <Image
                        src={block.data.file.url}
                        alt={block.data.caption}
                        width={400}
                        height={200}
                        className="w-full object-cover rounded-md"
                      />
                      <span className="text-sm text-gray-600 mb-2">
                        <i>{block.data.caption}</i>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-6 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
            Back to List
          </Button>
          <Button
            onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
