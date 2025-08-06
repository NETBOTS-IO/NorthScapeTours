"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, Eye, Badge } from "lucide-react";
import { getBlogs, deleteBlog } from "@/lib/data-utils";
import { type Blog } from "@/lib/types";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";
import { BASE_URL } from "@/Var";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getBlogs({ page, search: searchTerm });
        setBlogs(response.blogs || []);
        setTotalPages(response.pages || 1);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        toast.error("Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchTerm]);

  const filteredBlogs = (blogs || []).filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const success = await deleteBlog(id);
        if (success) {
          setBlogs((prev) => prev.filter((blog) => blog._id !== id));
          toast.success("Blog deleted successfully");
        } else {
          toast.error("Failed to delete blog");
        }
      } catch (error) {
        toast.error("An error occurred while deleting");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/blogs/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(blogs || []).length} blog(s) — Page {page} of {totalPages}
        </p>
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          ) : filteredBlogs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                <div className="flex items-center justify-center mt-4">
                  <p className="text-center font-medium text-gray-400">
                    No blogs found.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredBlogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <img src={`${BASE_URL}${blog.coverImage}`} alt={blog.title} width={60} height={40} />
                </TableCell>
                <TableCell className="truncate">{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString()}{" "}
                </TableCell>
                <TableCell><span className={`${blog.status==="published" ? "bg-green-500" : "bg-amber-600"} text-white text-xs font-medium p-2 rounded-md`}>{blog.status}</span></TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/blogs/${blog._id}`)}
                  >
                    <Eye className="h-4 w-4" /> 
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {filteredBlogs.length > 0 && !loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
