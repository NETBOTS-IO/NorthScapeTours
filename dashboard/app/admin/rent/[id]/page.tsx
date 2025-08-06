"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCarById,  } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";
import { RentCar } from "@/lib/types";

export default function SingleRentCar() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<RentCar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCarById(id as string).then((car) => {
        setCar(car || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>car not found</div>;

  const formattedDate = new Date(car!.createdAt!).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">{car.carName}</h1>
      <div className="flex gap-4 flex-wrap mb-6">
          <img
            src={`${BASE_URL}${car.carImage}`}
            alt={car.carName}
            className="w-40 h-40 object-cover rounded-md border"
          />
      </div>
      <div>
        <p><strong>Model:</strong> {car.carModel}</p>
        <p><strong>Price/day:</strong> $ {car.pricePerDay}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Owner:</strong> {car.driverName}</p>
      </div>
    </div>
  );
} 