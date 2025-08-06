"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TourForm from "@/components/TourForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTourStore } from "@/store/tourStore";
import { type Tour } from "@/lib/data-utils";

export default function EditTourPage() {
  const { id } = useParams();
  const router = useRouter();
  const storedTour = useTourStore((state) => state.tour);
  const [tour, setTour] = useState<any>(storedTour);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchTourData = async () => {
      if (!storedTour || storedTour._id !== id) {
        toast.error("Tour data is missing. Redirecting...");
        
        router.push("/admin/tours");
      } else {
        await setTour(storedTour);
      }
      setIsLoading(false);
    };

    fetchTourData();
    // console.log("Stored tour:", tour);
    // console.log("Tour ID:", id);
  }, [id, storedTour, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Edit Tour</h1>
      <TourForm tourId={id as string} initialData={tour} />
    </div>
  );
}
