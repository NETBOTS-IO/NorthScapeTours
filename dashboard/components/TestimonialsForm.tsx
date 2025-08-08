"use client";

import { useRef, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createTestimonials, updatingTestimonialsById } from "@/lib/data-utils";
import { Testimonials, TestimonialsFormState } from "@/lib/types";
import { toast } from "react-hot-toast";
import { FileText, User, Tag, ImageIcon, X } from "lucide-react";
import { BASE_URL } from "@/Var";

interface BlogFormProps {
  testimonialId?: string;
  initialData?: TestimonialsFormState;
}

export default function TestimonialForm({ testimonialId, initialData }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [blog, setBlog] = useState<TestimonialsFormState>({
    name: "",
    location: "",
    description: "",
    image: "",
    tags: [],
    rating: 0,
    occupation: "",
    tripName: "",
    tripDate: "",
    verified: false,
    featured: false,
  });

  useEffect(() => {
    if (initialData) {
      setBlog({
        ...initialData,
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData?.image) {
      setImagePreview(Array.isArray(initialData.image) ? initialData.image[0] : initialData.image || "");
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setBlog((prev) => ({ ...prev, [name]: checked }));
  } else {
    setBlog((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlog((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleAddTag = () => {
    if (tagInput && !blog.tags.includes(tagInput)) {
      setBlog((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(blog).forEach(([key, value]) => {
        if (key === "tags") {
          value.forEach((tag: string | Blob, i: any) => formData.append(`tags[${i}]`, tag));
        } else if (key === "image") {
          if (value instanceof File) formData.append("image", value);
          else formData.append("image", value);
        } else {
          formData.append(key, value as string);
        }
      });

      let response;
      if (testimonialId) {
        response = await updatingTestimonialsById(testimonialId, formData);
        toast.success("Testimonial updated successfully!");
      } else {
        response = await createTestimonials(formData);
        toast.success("Testimonial created successfully!");
      }

      router.refresh();
      router.push("/admin/testimonials");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name" },
              { label: "Location", name: "location" },
              { label: "Occupation", name: "occupation" },
              { label: "Trip Name", name: "tripName" },
              { label: "Trip Date", name: "tripDate" },
              { label: "Rating", name: "rating", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  name={field.name}
                  type={field.type || "text"}
                  value={(blog as any)[field.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              name="description"
              value={blog.description}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              rows={4}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <Label>Verified</Label>
              <Input
                type="checkbox"
                name="verified"
                checked={blog.verified}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Featured</Label>
              <Input
                type="checkbox"
                name="featured"
                checked={blog.featured}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex items-center gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
              />
              <Button type="button" onClick={handleAddTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
  src={
    imagePreview?.startsWith("blob:")
      ? imagePreview
      : `${BASE_URL}${imagePreview}`
  }
  alt="Preview"
  className="mt-2 h-40 object-cover border"
/>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {testimonialId ? "Update Testimonial" : "Create Testimonial"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
