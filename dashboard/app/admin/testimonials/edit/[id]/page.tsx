"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {  getTestimonialsById } from "@/lib/data-utils";
import { Testimonials } from "@/lib/types";
import TestimonialsForm
 from "@/components/TestimonialsForm";

export default function EditGalleryPhotoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Testimonials | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (id) {
    getTestimonialsById(id as string).then((testimonial) => {
      setCar(testimonial || null);
      setLoading(false);
    });
  }
}, [id]);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>car not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Edit Car Details</h1>
      <TestimonialsForm initialData={car} testimonialId={id as string} />
    </div>
  );
} 