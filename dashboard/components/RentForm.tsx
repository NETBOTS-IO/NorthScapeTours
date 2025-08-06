"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Car, User, DollarSign, ImageIcon } from "lucide-react";
import { createCarDetails, updateCar } from "@/lib/data-utils";

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
    carImage: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

      if (form.carImage) {
        formData.append("carImage", form.carImage);
      }
console.log('form data sending', Object.entries(formData));

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

          {/* Fuel Type */}
          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Input
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              placeholder="Petrol / Diesel"
              required
            />
          </div>

          {/* Seats */}
          <div>
            <Label htmlFor="seats">Seats</Label>
            <Input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              placeholder="e.g., 5"
              required
            />
          </div>

          {/* Driver Name */}
          <div>
            <Label htmlFor="driverName">
              <User className="inline w-4 h-4 mr-2" /> Driver Name
            </Label>
            <Input
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              placeholder="Enter driver name"
              required
            />
          </div>

          {/* Car Image */}
          <div>
            <Label htmlFor="carImage">
              <ImageIcon className="inline w-4 h-4 mr-2" /> Car Image
            </Label>
            <Input
              type="file"
              name="carImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Details"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
