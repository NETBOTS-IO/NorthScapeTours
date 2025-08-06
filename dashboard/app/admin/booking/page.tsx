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
import { Plus,  Trash, Eye} from "lucide-react";
import { getBookings, deleteBookingById, updatingBookingById } from "@/lib/data-utils";
import { Booking, type Blog } from "@/lib/types";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";

export default function BlogManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getBookings({ page, search: searchTerm });
      setBookings(response.bookings || []);
        setTotalPages(response.pages || 1);
      } catch (error) {
        console.error("Failed to load Bookings:", error);
        toast.error("Failed to load Bookings");
      setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchTerm]);


  const filteredBookings = bookings?.filter((book) =>
    (book?.carName || "").toLowerCase().includes(searchTerm?.toLowerCase()) ||
    (book?.carModel || "").toLowerCase().includes(searchTerm?.toLowerCase()) || []
  );


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const success = await deleteBookingById(id);
        if (success) {
          setBookings((prev) => prev.filter((blog) => blog._id !== id));
          toast.success("Booking deleted successfully");
        } else {
          toast.error("Failed to delete Booking");
        }
      } catch (error) {
        toast.error("An error occurred while deleting Booking");
      }
    }
  };
// Confirm booking
const handleConfirm = async (id: string, status: string) => {
    if (window.confirm("Are you sure you want to Confrim this Booking?")) {
      try {
        console.log('status', status)
        const updateStatus = status === "Pending" ? "Confirmed" : "Pending";
        const success = await updatingBookingById(id, updateStatus);
        console.log('updateStatus', updateStatus)
        if (success) {
        const response =   await getBookings({page, search: searchTerm})
        setBookings(response.bookings || [])
         setTotalPages(response.pages || 1);
         
          toast.success("Booking  successfully");
        } else {
          toast.error("Failed to Booking");
        }
      } catch (error) {
        toast.error("An error occurred while Booking");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/Bookings/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(bookings || []).length} blog(s) — Page {page} of {totalPages}
        </p>
        <Input
          placeholder="Search Bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car Name</TableHead>
            <TableHead>Car Model</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Price Per Day</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Confirm</TableHead>
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
          ) : filteredBookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                <div className="flex items-center justify-center mt-4">
                  <p className="text-center font-medium text-gray-400">
                    No Bookings found.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredBookings.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="truncate">{book.carName}</TableCell>
                <TableCell>{book.carModel}</TableCell>
                <TableCell>{book.customerName}</TableCell>
                <TableCell>{book.customerEmail}</TableCell>
                <TableCell>{book.pricePerDay}</TableCell>
                <TableCell>
                  {new Date(book.createdAt).toLocaleDateString()}{" "}
                </TableCell>
                <TableCell><span    className={`${book.status === "Confirmed" ? "bg-green-500" : book.status ==="Cancelled" ? "bg-red-500" : "bg-amber-600" } px-2 py-1 rounded-md text-sm `}>{book.status}</span></TableCell>
                 <TableCell className="text-center text-muted-foreground py-6">
                  {book.status !== "Confirmed" ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleConfirm(`${book._id}`, book.status )}
                    >
                      Confirm
                    </Button>
                   ):(
                    <Button
                      size="sm"
                      className="bg-purple-800"
                        onClick={() => handleConfirm(`${book._id}`, book.status )}
                    >
                      Cancelled
                    </Button>
                  )}

                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/booking/${book._id}`)}
                  >
                    <Eye className="h-4 w-4" /> 
                  </Button>
                  {/* <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => router.push(`/admin/booking/edit/${book._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button> */}
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

      {filteredBookings.length > 0 && !loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
