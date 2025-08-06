"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import GalleryForm from "@/components/GalleryForm";
import { getGalleryPhotoById, type GalleryPhoto } from "@/lib/data-utils";

export default function EditGalleryPhotoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (id) {
    getGalleryPhotoById(id as string).then((photo) => {
      setPhoto(photo || null);
      setLoading(false);
    });
  }
}, [id]);

  if (loading) return <div>Loading...</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Edit Gallery Photo</h1>
      <GalleryForm initialData={photo} onSuccess={() => router.push("/admin/gallery")} />
    </div>
  );
} 