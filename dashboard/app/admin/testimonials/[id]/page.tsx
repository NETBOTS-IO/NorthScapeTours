"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCarById, getTestimonialsById,  } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";
import { Testimonials } from "@/lib/types";

export default function SingleRentCar() {
  const { id } = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTestimonialsById(id as string).then((testimonial) => {
        setTestimonial(testimonial || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!testimonial) return <div>Testimonial not found</div>;

  const formattedDate = new Date(testimonial!.createdAt!).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">{testimonial.name}</h1>
      <div className="flex gap-4 flex-wrap mb-6">
          <img
            src={`${BASE_URL}${testimonial.image}`}
            alt={testimonial.name}
            className="w-40 h-40 object-cover rounded-md border"
          />
      </div>
      <div>
        <p><strong>Description:</strong> {testimonial.description}</p>
        <p><strong>Occupation:</strong> $ {testimonial.occupation}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Location:</strong> {testimonial.location}</p>
        <p><strong>Rating:</strong> {testimonial.rating} ⭐</p>
      </div>
    </div>
  );
} 