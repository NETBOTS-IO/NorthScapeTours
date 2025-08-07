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
import { Plus,  Trash, Eye, Edit} from "lucide-react";
import {  deleteBookingById,  deleteTestimonialsById,  getTestimonials } from "@/lib/data-utils";
import {  Testimonials } from "@/lib/types";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { BASE_URL } from "@/Var";

export default function BlogManagement() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getTestimonials({ page, search: searchTerm });
      setTestimonials(response.testimonials || []);
        setTotalPages(response.pages || 1);
      } catch (error) {
        console.error("Failed to load Testimonials:", error);
        toast.error("Failed to load Testimonials");
      setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchTerm]);

  const filteredTestimonials = testimonials?.filter((book) =>
    (book?.name || "").toLowerCase().includes(searchTerm?.toLowerCase()) ||
    (book?.location || "").toLowerCase().includes(searchTerm?.toLowerCase()) || []
  );


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const success = await deleteTestimonialsById(id);
        if (success) {
          setTestimonials((prev) => prev.filter((blog) => blog._id !== id));
          toast.success("Testimonials deleted successfully");
        } else {
          toast.error("Failed to delete Testimonials");
        }
      } catch (error) {
        toast.error("An error occurred while deleting Testimonials");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button onClick={() => router.push("/admin/testimonials/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Testimonials
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(testimonials || []).length} testimonials(s) — Page {page} of {totalPages}
        </p>
        <Input
          placeholder="Search Testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Occupation</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
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
          ) : filteredTestimonials.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                <div className="flex items-center justify-center mt-4">
                  <p className="text-center font-medium text-gray-400">
                    No Testimonials found.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredTestimonials.map((book) => (
              <TableRow key={book._id}>
                <TableCell >
                  <img src={`${BASE_URL}${book.image}`} alt={book.name}   width={60} height={40} />
                </TableCell>
                <TableCell className="truncate">{book.name}</TableCell>
                <TableCell>{book.location}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden text-ellipsis">
                  <div className="line-clamp-3 leading-snug">
                    {book.description}
                  </div>
                </TableCell>
                <TableCell>{book.occupation}</TableCell>
                <TableCell>{book.rating}</TableCell>
                <TableCell>
                  {new Date(book.createdAt).toLocaleDateString()}{" "}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/testimonials/${book._id}`)}
                  >
                    <Eye className="h-4 w-4" /> 
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/testimonials/edit/${book._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(`${book._id}`)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {filteredTestimonials.length > 0 && !loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
