"use client";
import { useEffect, useState } from "react";
import BlogHero from "./blog-hero";
import BlogGrid from "./blog-grid";
import BlogCategories from "./blog-categories";
import { BlogsResponse, getBlogs } from "@/lib/api";

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [blogsData, setBlogsData] = useState<BlogsResponse>({
  blogs: [],
  total: 0,
  pages: 0,
  currentPage: 1
});

useEffect(() => {
  async function fetchBlogs() {
    try {
      const data = await getBlogs({});
      setBlogsData(data); // ✅ whole object now
      setIsLoading(false)
    } catch (error) {
      console.log("Error fetching blogs", error);
    }
  }
  fetchBlogs();
}, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredPosts =
    activeCategory === "All"
      ? blogsData.blogs
      : blogsData.blogs.filter((post) => post.category === activeCategory);

if(isLoading){return <div>Loading...</div>}

  return (
    <>
      <BlogHero />
      <BlogCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} 
      isLoading={isLoading}
      posts={blogsData.blogs} />
      <BlogGrid posts={filteredPosts} />
    </>
  );
} 