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
import { ChevronLeft, Calendar, CarFront , Edit,  DollarSign  } from "lucide-react";
import { getBookingById } from "@/lib/data-utils";
import { Booking } from "@/lib/types";
import Link from "next/link";

export default function ViewBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fettchbooking = async () => {
      try {
        const fetchedbooking = await getBookingById(id as string);
        setBooking(fetchedbooking);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    fettchbooking();
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

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin/bookings">
          <Button variant="outline" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to bookings
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-700">
                booking not found
              </h2>
              <p className="text-gray-500 mt-2">
                The booking post you're looking for doesn't exist or has been
                removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
const book = booking.data
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin/booking">
        <Button variant="outline" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Bookings
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{book.carName}</CardTitle>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 " />
              {new Date(book.createdAt).toLocaleDateString()} |{" "}
              {new Date(book.createdAt).toLocaleTimeString()}
            </div>
            <div className="flex items-center">
              <CarFront  className="h-4 w-4 mr-1 text-orange-500" />
              {book.carModel}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-orange-500" />
              {book.pricePerDay}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-line">
                    <h2 className="text-lg text-gray-700 mb-4">Customer Detials</h2>
                    <p className="text-medium text-gray-900 mb-4">Customer Name:{book.customerName}</p>
                    <p className="text-medium text-gray-900 mb-4">Customer Email:{book.customerEmail}</p>
                    <p className="text-medium text-gray-900 mb-4">Custmoer Phome:{book.phoneNumber}</p>
                    <p className="text-medium text-gray-900 mb-4">Pick UP Location:{book.pickupLocation}</p>
                    <p className="text-medium text-gray-900 mb-4">Drop Off Location:{book.dropoffLocation}</p>
                    <p className="text-medium text-gray-900 mb-4">Pick Up Date:{book.pickupDate}</p>
                    <p className="text-medium text-gray-900 mb-4">Drop Off Date:{book.dropoffDate}</p>
                </div>
            </div>

            <div className="mt-6 flex items-center">
              Status: 
              <div className="flex flex-wrap gap-2">
                  <span
                    // className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                    className={`${book.status === "Confirmed" ? "bg-green-500" : book.status ==="Cancelled" ? "bg-red-500" : "bg-amber-600" } px-2 py-1 rounded-md text-sm `}
                  >
                    {book.status}
                  </span>
              </div>
            </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/booking")}>
            Back to List
          </Button>
          {/* <Button
            onClick={() => router.push(`/admin/booking/edit/${book._id}`)}
            className="bg-primary hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Booking
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
