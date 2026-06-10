"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCarById } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";
import { RentCar } from "@/lib/types";

export default function SingleRentCar() {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState<RentCar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCarById(id as string).then((data) => {
        setCar(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg font-medium text-red-500">
          Car not found
        </p>
      </div>
    );
  }

  const formattedDate = new Date(car.createdAt!).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Car Images */}
          {/* <div>
            {car.carImage?.length > 0 ? (
              <img
                src={`${BASE_URL}${car.carImage[0]}`}
                alt={car.carName}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
                No Image Available
              </div>
            )}

            {car.carImage?.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {car.carImage.map((image, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}${image}`}
                    alt={`${car.carName}-${index}`}
                    className="h-20 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div> */}

          {/* Car Details */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              {car.carName}
            </h1>

            <div className="grid sm:grid-cols-2 gap-4">
              <DetailCard
                title="Model"
                value={car.carModel}
              />

              <DetailCard
                title="Price Per Day"
                value={`$${car.pricePerDay}`}
              />

              <DetailCard
                title="Transmission"
                value={car.transmission}
              />

              <DetailCard
                title="Air Conditioned"
                value={car.conditioned}
              />

              <DetailCard
                title="Mileage"
                value={car.mileage}
              />

              <DetailCard
                title="Door Count"
                value={car.fuelType}
              />

              <DetailCard
                title="Max People"
                value={String(car.seats)}
              />

              <DetailCard
                title="Driver Name"
                value={car.driverName}
              />

              <DetailCard
                title="Status"
                value={car.status}
              />

              <DetailCard
                title="Created Date"
                value={formattedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border rounded-xl p-4 bg-slate-50">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}