"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { ImageIcon, FileText, User, Calendar, MapPin, X } from "lucide-react";
import { createGalleryPhoto, updateGalleryPhoto } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";

interface GalleryFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

const categories = [
  "Mountains",
  "Wildlife",
  "Culture",
  "Landscapes",
  "Adventure",
  "People",
];

export default function GalleryForm({ initialData, onSuccess }: GalleryFormProps) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    photographer: "",
    images: [] as File[],
    previews: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
        images: [], // Don't preload files, only show previews for existing URLs
        previews: initialData.src || [],
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        previews: [...prev.previews, ...files.map((file) => URL.createObjectURL(file))],
      }));
    }
  };

  // Remove image handler
  const handleRemoveImage = (idx: number) => {
    setForm((prev) => {
      // If preview is a URL (existing image), remove from previews and src
      const isExisting = prev.previews[idx] && typeof prev.previews[idx] === 'string' && prev.previews[idx].startsWith('/uploads/');
      let newPreviews = [...prev.previews];
      newPreviews.splice(idx, 1);
      let newImages = [...prev.images];
      // If removing a new upload, also remove from images
      if (!isExisting) {
        newImages.splice(idx - (prev.previews.length - prev.images.length), 1);
      }
      return {
        ...prev,
        previews: newPreviews,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("date", form.date);
      formData.append("description", form.description);
      formData.append("photographer", form.photographer);
      // Add new images (files)
      form.images.forEach((file) => formData.append("src", file));
      // Add existing images (URLs) as an array, even if only one
      const existingUrls = form.previews.filter(
        (src) => typeof src === "string" && src.startsWith("/uploads/")
      );
      existingUrls.forEach((src) => {
        formData.append("src", src);
      });
      if (initialData && initialData.id) {
        await updateGalleryPhoto(initialData.id, formData);
        toast.success("Photo updated successfully");
      } else {
        await createGalleryPhoto(formData);
        toast.success("Photo saved successfully");
      }
      if (onSuccess) onSuccess();
      router.push("/admin/gallery");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save photo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Title
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter photo title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" /> Category
            </Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleCategoryChange}
              required
              className="mt-1 w-full border rounded-md p-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" /> Location
            </Label>
            <Input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="date" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Date
            </Label>
            <Input
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              className="mt-1"
              type="date"
            />
          </div>

          <div>
            <Label htmlFor="photographer" className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Photographer
            </Label>
            <Input
              id="photographer"
              name="photographer"
              value={form.photographer}
              onChange={handleChange}
              placeholder="Enter photographer name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="images" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" /> Images
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.previews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src.startsWith('/uploads/') ? `${BASE_URL}${src}` : src}
                    alt={`Preview ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:scale-110"
                    onClick={() => handleRemoveImage(idx)}
                    title="Remove image"
                    style={{ zIndex: 2 }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Photo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 