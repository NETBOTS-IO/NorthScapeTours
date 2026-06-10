"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button
} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash,
  Search,
  Eye,
} from "lucide-react";

import { getCar, deleteCar } from "@/lib/data-utils";
import { RentCar } from "@/lib/types";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@/Var";
import { Pagination } from "@/components/ui/pagination";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function RentManagement() {
  const [cars, setCars] = useState<RentCar[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 10;
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load cars
  useEffect(() => {
    getCar().then((data) => {
      const filtered = data.filter((car) =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setCars(filtered);
      setTotalPages(Math.ceil(filtered.length / perPage));
    });
  }, [searchTerm]);

  // Delete car
  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const success = await deleteCar(deleteId);
    setIsDeleting(false);

    if (success) {
      setCars((prev) => prev.filter((car) => car._id !== deleteId));
      toast.success("Car deleted successfully");
    } else {
      toast.error("Failed to delete car");
    }

    setDeleteId(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rented Cars</h1>

        <Button
          className="bg-primary text-white"
          onClick={() => router.push("/admin/rent/add")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Image</TableHead> */}
              <TableHead>Car Name</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Transmission</TableHead>
              <TableHead>AC</TableHead>
              <TableHead>Mileage</TableHead>
              {/* <TableHead>Fuel</TableHead> */}
              <TableHead>Max people</TableHead>
              <TableHead>Minimum Driver Age</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cars
              .slice((page - 1) * perPage, page * perPage)
              .map((car) => (
                <TableRow key={car._id}>
                  {/* Image */}
                  {/* <TableCell>
                    {car.carImage?.length > 0 ? (
                      <img
                        src={`${BASE_URL}${car.carImage[0]}`}
                        alt={car.carName}
                        className="w-16 h-12 object-cover rounded-md border"
                      />
                    ) : (
                      <span className="text-gray-400">
                        No Image
                      </span>
                    )}
                  </TableCell> */}

                  {/* Name */}
                  <TableCell className="font-medium">
                    {car.carName}
                  </TableCell>

                  {/* Model */}
                  <TableCell>{car.carModel}</TableCell>

                  {/* Price */}
                  <TableCell>
                    ${car.pricePerDay}
                  </TableCell>

                  {/* Transmission */}
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {car.transmission}
                    </span>
                  </TableCell>

                  {/* AC */}
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        car.conditioned === "Yes"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.conditioned}
                    </span>
                  </TableCell>

                  {/* Mileage */}
                  <TableCell>{car.mileage}</TableCell>

                  {/* Fuel */}
                  {/* <TableCell>{car.fuelType}</TableCell> */}

                  {/* Seats */}
                  <TableCell>{car.seats}</TableCell>

                  {/* Driver */}
                  <TableCell>{car.driverName}</TableCell>

                  {/* Status */}
                  {/* <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        car.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {car.status}
                    </span>
                  </TableCell> */}

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/admin/rent/${car._id}`
                          )
                        }
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/admin/rent/edit/${car._id}`
                          )
                        }
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setDeleteId(car._id)
                            }
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Car
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to
                              delete this car? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() =>
                                setDeleteId(null)
                              }
                              disabled={isDeleting}
                            >
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              onClick={handleDelete}
                              disabled={isDeleting}
                            >
                              {isDeleting
                                ? "Deleting..."
                                : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}