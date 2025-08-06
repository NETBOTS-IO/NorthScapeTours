"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import { generateSlug } from "@/lib/slug";
import { Blog } from "@/data/blogs-types";

interface BlogGridProps {
  posts?: Blog[];
}

const BlogGrid = ({ posts = [] }: BlogGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const BLOGS_PER_PAGE = 9;
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BLOGS_PER_PAGE);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  } as const;

  const imageHoverVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  } as const;
const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Latest Blogs</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.slice(0, visibleCount).map((post, index) => (
            <motion.div
              key={post._id}
              variants={itemVariants}
              className="group bg-white shadow-md overflow-hidden border border-green-600 hover:shadow-xl transition-all duration-500"
              whileHover="hover"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={`${BASE_URL}${post.coverImage}`}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  variants={imageHoverVariants}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex flex-wrap gap-1 mt-2 mb-4">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs border border-orange-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${(post._id)}`}
                  className="inline-flex items-center space-x-2 text-orange-600 hover:text-green-600 font-semibold transition-colors duration-300 border border-orange-200 rounded-full px-4 py-2 text-sm mt-2"
                >
                  <span>Read Full Blog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {visibleCount < posts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-green-600 font-semibold transition-colors duration-300 border border-orange-200 rounded-full px-6 py-3 text-base bg-white shadow-sm hover:shadow-md"
            >
              <span>Load More</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
