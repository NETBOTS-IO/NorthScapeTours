import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/gallery-hero";
import PhotoGallery from "@/components/gallery/photo-gallery";

export const metadata: Metadata = {
  title: "Gallery - Northscape Pakistan | Adventure and Luxury Tours",
  description:
    "Explore our collection of breathtaking photos from premium adventure and luxury tours across Pakistan. Experience the beauty of Skardu, Hunza, and Gilgit-Baltistan through our lens.",
  keywords:
    "Northscape Pakistan gallery, travel photos Pakistan, adventure tours, luxury travel Pakistan, Skardu photos, Hunza Valley images, Pakistan tourism",
};


export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <PhotoGallery />
    </div>
  );
}
