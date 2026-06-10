"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Car, User, DollarSign, ImageIcon } from "lucide-react";
import { createCarDetails, updateCar } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";

interface RentFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export default function RentForm({ initialData, onSuccess }: RentFormProps) {
  const [form, setForm] = useState({
    carName: "",
    carModel: "",
    pricePerDay: "",
    transmission: "",
    fuelType: "",
    seats: "",
    driverName: "",
    mileage: "null",
    conditioned: "null",
    carImage: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
   const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const router = useRouter();
   const fileInputRef = useRef<HTMLInputElement | null>(null);


   useEffect(() => {
      if (initialData) {
        setForm((prev) => ({
          ...prev,
          ...initialData,
          carImage: [], // Don't preload files, only show previews for existing URLs
          previews: initialData.carImage || [],
        }));
      }
    }, [initialData]);

    useEffect(() => {
        if (initialData?.carImage) {
          setImagePreview(Array.isArray(initialData.carImage) ? initialData.carImage[0] : initialData.carImage || "");
        }
      }, [initialData]);

        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setForm((prev) => ({ ...prev, carImage: file }));
            setImagePreview(URL.createObjectURL(file));
          }
        };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // Handle file separately
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("carName", form.carName);
      formData.append("carModel", form.carModel);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("transmission", form.transmission);
      formData.append("fuelType", form.fuelType);
      formData.append("seats", form.seats);
      formData.append("driverName", form.driverName);
      formData.append("mileage", form.mileage);
      formData.append("conditioned", form.conditioned);

      if (form.carImage) {
        formData.append("carImage", form.carImage);
      }

      if (initialData && initialData._id) {
              await updateCar(initialData._id, formData);
              toast.success("Update car details successfully");
            } else {
              await createCarDetails(formData);
              toast.success("Car added successfully");
            }

      router.push("/admin/rent");
    } catch (error:any) {
        console.log('error.form', error)
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Name */}
          <div>
            <Label htmlFor="carName">
              <Car className="inline w-4 h-4 mr-2" /> Car Name
            </Label>
            <Input
              name="carName"
              value={form.carName}
              onChange={handleChange}
              placeholder="e.g., Toyota Corolla"
              required
            />
          </div>

          {/* Car Model */}
          <div>
            <Label htmlFor="carModel">
              <Car className="inline w-4 h-4 mr-2" /> Car Model
            </Label>
            <Input
              name="carModel"
              value={form.carModel}
              onChange={handleChange}
              placeholder="e.g., 2023"
              required
            />
          </div>
          <div>
            <Label htmlFor="seats">Max People</Label>
            <Input
            typeof="number"
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              placeholder="e.g., 5"
              required
            />
          </div>
          <div>
            <Label htmlFor="fuelType">Door Count</Label>
            <Input
            type="number"
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              placeholder="e.g.,5"
              required
            />
          </div>
          {/* Price Per Day */}
          <div>
            <Label htmlFor="pricePerDay">
              <DollarSign className="inline w-4 h-4 mr-2" /> Price Per Day
            </Label>
            <Input
              type="number"
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
            />
          </div>

          {/* Transmission */}
          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <Input
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              placeholder="Auto / Manual"
              required
            />
          </div>
          <div>
            <Label htmlFor="driverName">
              <User className="inline w-4 h-4 mr-2" /> Minimun Drive Age
            </Label>
            <Input
            type="number"
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              placeholder="Enter Minimun Drive Age"
              required
            />
          </div>
          <div>
  <Label className="mb-2 block">Unlimited Mileage?</Label>

  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="mileage"
        value="yes"
        checked={form.mileage === "yes"}
        onChange={handleChange}
      />
      Yes
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="mileage"
        value="no"
        checked={form.mileage === "no"}
        onChange={handleChange}
      />
      No
    </label>
  </div>
</div>
<div>
  <Label className="mb-2 block">Air-Conditioned?</Label>

  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="conditioned"
        value="yes"
        checked={form.conditioned === "yes"}
        onChange={handleChange}
      />
      Yes
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="conditioned"
        value="no"
        checked={form.conditioned === "no"}
        onChange={handleChange}
      />
      No
    </label>
  </div>
</div>
          {/* Car Image */}
          {/* <div>
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
                    </div> */}

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
