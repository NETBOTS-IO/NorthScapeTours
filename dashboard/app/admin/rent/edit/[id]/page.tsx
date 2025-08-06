"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import GalleryForm from "@/components/GalleryForm";
import { getCarById } from "@/lib/data-utils";
import { RentCar } from "@/lib/types";
import RentForm from "@/components/RentForm";

export default function EditGalleryPhotoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<RentCar | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (id) {
    getCarById(id as string).then((car) => {
      setCar(car || null);
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
      <RentForm initialData={car} onSuccess={() => router.push("/admin/rent")} />
    </div>
  );
} 