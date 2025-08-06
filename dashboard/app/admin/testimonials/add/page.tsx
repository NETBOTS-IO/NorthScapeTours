"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import RentForm from "@/components/RentForm";



export default function AddGalleryPhotoPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Add New Car Details</h1>
      <RentForm onSuccess={() => router.push("/admin/rent")} />
    </div>
  );
} 