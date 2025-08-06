"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { type GalleryPhoto, getGalleryPhotoById } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";

export default function GalleryPhotoViewPage() {
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
      <h1 className="text-3xl font-bold mb-6">{photo.title}</h1>
      <div className="flex gap-4 flex-wrap mb-6">
        {photo.src.map((src, idx) => (
          <img
            key={idx}
            src={`${BASE_URL}${src}`}
            alt={`Gallery image ${idx + 1}`}
            className="w-40 h-40 object-cover rounded-md border"
          />
        ))}
      </div>
      <div>
        <p><strong>Category:</strong> {photo.category}</p>
        <p><strong>Location:</strong> {photo.location}</p>
        <p><strong>Date:</strong> {photo.date}</p>
        <p><strong>Photographer:</strong> {photo.photographer}</p>
        <p><strong>Description:</strong> {photo.description}</p>
      </div>
    </div>
  );
} 