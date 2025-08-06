"use client";

// import { motion } from "framer-motion";
import { Heart, MapPin, Calendar } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery-data";
import { ImageSlider } from "../ui/ImageSlider";

interface PhotoCardProps {
  photo: GalleryPhoto;
  isFavorite: boolean;
  onCardClick: () => void;
  onFavoriteClick: () => void;
}

export const PhotoCard = ({
  photo,
  isFavorite,
  onCardClick,
  onFavoriteClick,
}: PhotoCardProps) => {
  const imageUrls = photo.src || [];

  return (
    <div
      onClick={onCardClick}
      className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md border border-green-600 transform transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-64 w-full">
        <ImageSlider
          images={imageUrls}
          className="w-full h-full"
          interval={5000}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">View Photo</p>
        </div>

        {/* Badge & Favorite Button */}
        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          {photo.category}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-transform duration-200 active:scale-95 z-10 ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-slate-700 hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-slate-800 mb-1 truncate">
          {photo.title}
        </h3>
        <div className="flex items-center text-slate-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1.5 text-orange-500" />
          <span>{photo.location}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <Calendar className="w-4 h-4 mr-1.5 text-orange-500" />
          <span>{photo.date}</span>
        </div>
      </div>
    </div>
  );
};
