"use client";
import { X } from "lucide-react";
import { useState } from "react";

interface TripGalleryProps {
  trip: {
    images?: string[];
    name: string;
  };
}

const TripGallery = ({ trip }: TripGalleryProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const images = trip.images && trip.images.length > 0 ? trip.images : ["/placeholder.svg?height=600&width=1200"];

  return (
    <div>
      <h4 className="text-xl font-bold mb-4 text-slate-800">Gallery</h4>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
        {images.map((img, idx) => (
          <button
            key={idx}
            className="focus:outline-none flex-shrink-0 w-60 h-40 md:w-auto md:h-auto snap-center"
            onClick={() => setSelected(idx)}
            aria-label={`View image ${idx + 1}`}
          >
            <img
              src={`${BASE_URL}${img}`}
              alt={`${trip.name} photo ${idx + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-200"
            />
          </button>
        ))}
      </div>
      {/* Modal/Lightbox */}
      {selected !== null && (
        <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/80" onClick={() => setSelected(null)}>
          <img
            src={`${BASE_URL}${images[selected]}`}
            alt={`${trip.name} photo ${selected + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white"
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-bold rounded-full px-4 py-2 hover:rotate-2 transition-all duration-300"
            onClick={() => setSelected(null)}
            aria-label="Close gallery preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TripGallery; 