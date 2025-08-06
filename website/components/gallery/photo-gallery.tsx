"use client";

import { useState, useEffect, useRef } from "react";
import { X, Share2, Heart, MapPin, Calendar } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery-data";
import { galleryData } from "@/data/gallery-data";
import { useIsMobile } from "@/components/ui/use-mobile";
import { PhotoCard } from "./PhotoCard";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { fetchGalleryPhotos } from "@/lib/api";
import { useRouter } from 'next/navigation';

const getPhotoId = (photo: any): string => {
  return photo._id || photo.id?.toString() || "";
};

const fixImagePath = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:8000";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};

const normalizePhoto = (photo: any): GalleryPhoto => {
  let srcArray: string[] = [];
  if (Array.isArray(photo.src)) {
    srcArray = photo.src.map((src: string) => fixImagePath(src));
  } else if (typeof photo.src === "string") {
    srcArray = [fixImagePath(photo.src)];
  }

  const photoId = photo._id || photo.id;

  return {
    _id: photoId ? photoId.toString() : "",
    id: typeof photo.id === "number" ? photo.id : undefined,
    src: srcArray,
    title: photo.title || "",
    location: photo.location || "",
    category: photo.category || "",
    date: photo.date || "",
    description: photo.description || "",
    photographer: photo.photographer || "",
  };
};

const PhotoGallery = () => {
  const router = useRouter();
  const ref = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPhotos = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await fetchGalleryPhotos(pageNum, 20);

      const rawPhotos = Array.isArray(data)
        ? data
        : Array.isArray(data.photos)
        ? data.photos
        : [];

      const normalized = rawPhotos.map(normalizePhoto);

      setPhotos((prev) => {
        const existingIds = new Set(prev.map((p) => getPhotoId(p)));
        const uniqueNew = normalized.filter(
          (p) => !existingIds.has(getPhotoId(p))
        );
        return [...prev, ...uniqueNew];
      });

      if (rawPhotos.length < 20) {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Failed to fetch gallery photos:", e);
      setPhotos(galleryData);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos(page);
  }, [page]);

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const selectedPhoto = selectedId
    ? photos.find((p) => getPhotoId(p) === selectedId)
    : null;

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    if (page === 1) loadPhotos(1);
  }, [selectedCategory]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const categories = [
    "All",
    "Mountains",
    "Wildlife",
    "Culture",
    "Landscapes",
    "Adventure",
    "People",
  ];

  const handleToggleLoad = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    } else {
      setPage(1);
      setPhotos([]);
      setHasMore(true);
    }
  };

  const handleViewDetails = (photoId: string) => {
    router.push(`/gallery/${photoId}`);
  };

  if (loading && photos.length === 0) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto text-center py-24">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">
            Loading gallery...
          </h2>
        </div>
      </section>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto text-center py-24">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">
            No photos found in the gallery.
          </h2>
          <p className="text-slate-500">
            Please check back later or contact support if you believe this is an
            error.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-800 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => {
            const id = getPhotoId(photo);
            return (
              <PhotoCard
                key={id}
                photo={photo}
                isFavorite={favorites.includes(id)}
                onCardClick={() => !isMobile && handleViewDetails(id)}
                onFavoriteClick={() => toggleFavorite(id)}
              />
            );
          })}
        </div>

        {filteredPhotos.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="btn-outline transform transition-transform duration-300 hover:scale-105 active:scale-95"
              onClick={handleToggleLoad}
            >
              {hasMore ? "Load More Photos" : "Show Less"}
            </button>
          </div>
        )}

        {!isMobile && selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden border border-green-600 max-h-[90vh] overflow-y-auto lg:overflow-y-hidden lg:h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 text-gray-900 hover:text-red-600 transition-transform duration-300 hover:rotate-90 hover:scale-110 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 lg:h-full">
                <div className="lg:col-span-2 w-full h-90 lg:h-full">
                  <ImageSlider
                    key={`lightbox-${selectedId}`}
                    images={selectedPhoto.src}
                    currentIndex={0}
                    interval={3000}
                    className="w-full h-full"
                  />
                </div>

                <div className="p-8 bg-white overflow-y-auto">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    {selectedPhoto.title}
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-5 h-5 mr-3 text-orange-600" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-5 h-5 mr-3 text-orange-600" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {selectedPhoto.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-1">Photographer</p>
                    <p className="font-semibold text-slate-800">
                      {selectedPhoto.photographer}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => toggleFavorite(getPhotoId(selectedPhoto))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                        favorites.includes(getPhotoId(selectedPhoto))
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(getPhotoId(selectedPhoto))
                            ? "fill-current"
                            : ""
                        }`}
                      />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
