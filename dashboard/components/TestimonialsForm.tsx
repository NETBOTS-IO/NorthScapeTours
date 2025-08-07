"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {  createTestimonials, updatingTestimonialsById } from "@/lib/data-utils";
import { Testimonials, type Blog } from "@/lib/types";
import { toast } from "react-hot-toast";
import {
  FileText,
  User,
  Tag,
  ImageIcon,
  X,
} from "lucide-react";
import { BASE_URL } from "@/Var";

interface BlogFormProps {
  testimonialId?: string;
  initialData?: Testimonials;
}


interface TestimonialsFormState {
  name: string;
  location: string;
  description: string;
  image: File | string;
  tags: string[];
 rating: number;
  occupation: string;
}

export default function BlogForm({ testimonialId, initialData }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [blog, setBlog] = useState<TestimonialsFormState>({
    name: "",
    location: "",
    image: "",
    tags: [],
    description: "",
    rating: 0,
    occupation: "",
  });

  // Set initial data if present
  useEffect(() => {
    if (initialData) {
      setBlog({
        ...initialData,
        image: initialData.image[0] || "",
      })}
  }, [initialData, testimonialId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const formData = new FormData();
      const blogPayload = {
        name: blog.name.trim(),
        location: blog.location.trim(),
        description: blog.description.trim(),
        rating: blog.rating,
        occupation: blog.occupation.trim(),
        tags: blog.tags.filter((tag) => tag.trim()),
      };

      // Add blogData as a string
      formData.append("data", JSON.stringify(blogPayload));

      // Add cover image if it's a File
      if (blog.image instanceof File) {
        if (blog.image.size === 0) {
          throw new Error("Cover image file is empty");
        }
        formData.append("image", blog.image, blog.image.name);
      }


      const response = testimonialId
        ? await updatingTestimonialsById(testimonialId, formData)
        : await createTestimonials(formData);

      if (response.success) {
        toast.success(`Testimonial ${testimonialId ? "updated" : "created"} successfully`);
        router.push("/admin/testimonials");
      } else {
        throw new Error(response.message || "Request failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to save testimonials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setBlog((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (file.size === 0) {
        toast.error("Selected cover image is empty");
        return;
      }
      if (!/image\/(jpeg|jpg|png|gif)/.test(file.type)) {
        toast.error("Only JPEG, JPG, PNG, or GIF files are allowed");
        return;
      }
      setBlog((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
// console.log('initialData', initialData)
  useEffect(() => {
  if (initialData?.image) {
    setImagePreview(Array.isArray(initialData.image) ? initialData.image[0] : initialData.image || ""); 
  }
}, [initialData]);


  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <Label htmlFor="name" className="flex items-center ml-1 mb-2">
              <FileText className="mr-2 h-4 w-4" />Customer name
            </Label>
            <Input
              id="name"
              name="name"
              value={blog.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
              className="mt-1"
            />
          </div>

          {/* Author Field */}
          <div>
            <Label htmlFor="location" className="flex items-center ml-1 mb-2">
              <User className="mr-2 h-4 w-4" /> Customer location
            </Label>
            <Input
              id="location"
              name="location"
              value={blog.location}
              onChange={handleChange}
              required
              placeholder="Enter location name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="occupation" className="flex items-center ml-1 mb-2">
              <User className="mr-2 h-4 w-4" /> Customer Occupation
            </Label>
            <Input
              id="occupation"
              name="occupation"
              value={blog.occupation}
              onChange={handleChange}
              required
              placeholder="Enter occupation name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="rating" className="flex items-center ml-1 mb-2">
              <User className="mr-2 h-4 w-4" /> Rating
            </Label>
            <Input
            type="number"
              id="rating"
              name="rating"
              value={blog.rating}
              onChange={handleChange}
              required
              placeholder="Enter rating(numbers)"
              className="mt-1"
            />
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="image" className="flex items-center ml-1 mb-2">
              <ImageIcon className="mr-2 h-4 w-4" /> Cover Image
            </Label>

{/* Hidden File Input */}
<input
  id="image"
  name="image"
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="hidden"
  ref={fileInputRef}
/>

{/* Image Upload Area */}
<div
  className="mt-2 mb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition"
  onClick={() => fileInputRef.current?.click()}
>
  {imagePreview ? (
    <>
      <img
        src={
          typeof imagePreview === "string" && !imagePreview.startsWith("blob:")
            ? `${BASE_URL}${imagePreview}`
            : imagePreview
        }
        alt="Cover preview"
        className="w-full max-h-48 object-cover rounded-md mb-2"
      />
      <p className="text-sm text-gray-500 text-center">
        Click image to change
      </p>
    </>
  ) : (
    <>
      <svg
        className="w-10 h-10 text-gray-400 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <p className="text-sm text-gray-500">Click or drag image to upload</p>
    </>
  )}
</div>


          </div>

          {/* description */}
          <div>
            <Label htmlFor="description" className="flex items-center ml-1 mb-2">
              <FileText className="mr-2 h-4 w-4" /> Description
            </Label>
            <textarea
              id="description"
              name="description"
              value={blog.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter short description about customer journey"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="flex items-center ml-1 mb-2">
              <Tag className="mr-2 h-4 w-4" /> Tags
            </Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {blog.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <Button type="button" onClick={handleTagAdd}>
                Add
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/testimonials")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Saving..." : testimonialId ? "Update Testimonials" : "Add Testimonials"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
