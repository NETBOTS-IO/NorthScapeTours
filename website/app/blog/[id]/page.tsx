"use client";
import NotFound from "@/app/not-found";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogsResponse, getBlogById, getBlogs } from "@/lib/api";
import { useParams } from "next/navigation";
import { Blog } from "@/data/blogs-types";

// --- Helper: Render Editor.js Content ---
function renderEditorContent(content: any) {
  if (!content?.blocks) return null;

  return (
    <div>
      {content.blocks.map((block: any, idx: number) => {
        switch (block.type) {
          case "header":
            return (
              <h2 key={idx} className={`text-${block.data.level}xl font-bold my-4`}>
                {block.data.text}
              </h2>
            );
          case "paragraph":
            return <p key={idx} className="my-2">{block.data.text}</p>;
          case "image":
            return (
              <div key={idx} className="my-4">
                <Image
                  src={block.data.file?.url || block.data.url}
                  alt={block.data.caption || "Blog Image"}
                  width={400}
                  height={200}
                  className="rounded-lg object-contain"
                />
                {block.data.caption && (
                  <p className="text-sm text-gray-500">{block.data.caption}</p>
                )}
              </div>
            );
          case "list":
            return block.data.style === "ordered" ? (
              <ol key={idx} className="list-decimal ml-5">
                {block.data.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={idx} className="list-disc ml-5">
                {block.data.items.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// --- Helper: Calculate read time ---
function getReadTimeFromEditor(content: any): number {
  if (!content?.blocks) return 1;
  const text = content.blocks
    .map((b: any) => b.data.text || "")
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// --- Related / Prev-Next ---
function getRelatedPosts(post: Blog, allPosts: Blog[], limit = 3): Blog[] {
  if (!post.tags) return [];
  return allPosts
    .filter(
      (p) =>
        p._id !== post._id &&
        (p.category === post.category ||
          (p.tags && p.tags.some((tag) => post.tags!.includes(tag))))
    )
    .slice(0, limit);
}

function getPrevNext(post: Blog, allPosts: Blog[]) {
  const idx = allPosts.findIndex((p) => p._id === post._id);
  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  };
}

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<Blog | null>(null);
  const [blogsData, setBlogsData] = useState<BlogsResponse>({
    blogs: [],
    total: 0,
    pages: 0,
    currentPage: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        const blogsData = await getBlogs({})
        setPost(blog);
        setBlogsData(blogsData);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching blog", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) return <div>Loading Blog...</div>;
  if (!post) return <NotFound />;
  const blogs = blogsData.blogs
  const readTime = getReadTimeFromEditor(post.content);
  const related = getRelatedPosts(post, blogs);
  const { prev, next } = getPrevNext(post, blogs);
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="pb-16">
      {/* Breadcrumbs */}
      <nav className="max-w-3xl mx-auto pt-6 pb-2 text-sm text-gray-500 flex gap-2 mt-16">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-green-600">
          Blog
        </Link>
        <span>/</span>
        <span className="text-orange-600 font-semibold">{post.title}</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-96 mb-8">
        <Image
          src={`${BASE_URL}${post.coverImage}`}
          alt={post.title}
          fill
          className="object-cover w-full h-full rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <span className="bg-orange-600/90 px-3 py-1 rounded-full text-xs font-semibold">
              {post.category}
            </span>
            <span className="text-xs">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="text-xs">by {post.author}</span>
            <span className="text-xs">{readTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 max-w-2xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose mx-auto max-w-3xl">
        {renderEditorContent(post.content)}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs border border-orange-200 hover:bg-orange-100"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Social Share */}
        <div className="mt-8 flex gap-4 items-center">
          <span className="text-sm text-gray-500">Share:</span>
          <a
            href="https://www.instagram.com/northscapetours?igsh=eDBvd3liOG1hamh1&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 text-orange-600"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/share/1CSjyatsgw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 text-orange-600"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@northscapetourstravels?_t=ZS-8yRBs4luce9&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-800 text-orange-600"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </article>

      {/* Author */}
      <div className="max-w-3xl mx-auto mt-16 flex items-center gap-4 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-2xl font-bold text-orange-700">
          {post.author[0]}
        </div>
        <div>
          <div className="font-semibold text-slate-800">{post.author}</div>
          <div className="text-sm text-gray-500">Travel Writer & Explorer</div>
          <div className="text-xs text-gray-400 mt-1">
            This is a placeholder author bio.
          </div>
        </div>
      </div>

      {/* Prev/Next */}
      <div className="max-w-3xl mx-auto mt-12 flex justify-between items-center">
        {prev ? (
          <Link href={`/blog/${prev._id}`} className="text-orange-600 hover:underline">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/blog/${next._id}`} className="text-orange-600 hover:underline">
            {next.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
