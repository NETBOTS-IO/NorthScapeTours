"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Search, Eye } from "lucide-react";
import { getCar, deleteCar}  from "@/lib/data-utils";
import  {RentCar}  from "@/lib/types";
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

  // 📌 Load cars
  useEffect(() => {
    getCar().then((data) => {
      const filtered = data.filter((car) =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCars(filtered);
      setTotalPages(Math.ceil(filtered.length / perPage));
    });
  }, [searchTerm]);

  // 📌 Delete handler
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
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rented Cars</h1>
        <Button
          className="bg-primary text-white"
          onClick={() => router.push("/admin/rent/add")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Car
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-2">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Price/Day</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars
            .slice((page - 1) * perPage, page * perPage)
            .map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  {car.carImage ? (
                    <img
                      src={`${BASE_URL}${car.carImage}`}
                      alt={car.carName}
                      className="w-16 h-10 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </TableCell>
                <TableCell>{car.carName}</TableCell>
                <TableCell>{car.carModel}</TableCell>
                <TableCell>${car.pricePerDay}</TableCell>
                <TableCell>{car.driverName}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => router.push(`/admin/rent/${car._id}`)}
                                      >
                                        <Eye className="h-4 w-4 mr-1" /> View
                                      </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/rent/edit/${car._id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(car._id)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Car</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this car? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setDeleteId(null)}
                            disabled={isDeleting}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
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

      {totalPages > 1 && (
        <Pagination
          className="mt-2"
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
