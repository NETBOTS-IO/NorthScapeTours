"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import TestimonialsForm from "@/components/TestimonialsForm";
import { Metadata } from "next";


export default function AddTestimonials() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Add Testimonials</h1>
      <TestimonialsForm />
    </div>
  );
} 