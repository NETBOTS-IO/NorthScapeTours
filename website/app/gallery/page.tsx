import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/gallery-hero";
import PhotoGallery from "@/components/gallery/photo-gallery";

export const metadata: Metadata = {
  title: "Northscape Tours & Travels | Explore Destinations & Travel Packages",
  description:
    "Discover unforgettable travel experiences with Northscape Tours & Travels. Explore curated tour packages, breathtaking destinations, and personalized journeys tailored for adventure, leisure, and luxury travel.",
  keywords:
    "Northscape tours, Northscape travels, travel agency, tour packages, holiday packages, adventure tours, luxury travel, group tours, honeymoon packages, custom tours, best travel deals",
};


export default function GalleryPage() {
  return (
    <div className="pt-16">
      <GalleryHero />
      <PhotoGallery />
    </div>
  );
}
