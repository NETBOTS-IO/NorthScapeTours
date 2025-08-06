"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash, Search, Eye } from "lucide-react"
import { getTours, deleteTour } from "@/lib/data-utils"
import {type Tour} from "@/lib/types";
import { toast } from "react-hot-toast"
import { useTourStore } from "@/store/tourStore";
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

export default function TourListPage() {
  const [tourList, setTourList] = useState<Tour[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      const tours = await getTours()
      setTourList(tours)
    }
    fetchTours()
  }, [])
  
  const handleEdit = (tourId: string) => {
    const selectedTour = tourList.find((tour) => tour.id === tourId);
    if (selectedTour) {
      useTourStore.getState().setTour(selectedTour); // Store the complete tour object
     router.push(`/admin/tours/edit/${tourId}`);
    } else {
      toast.error("Tour not found!");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await deleteTour(deleteId);
    setIsDeleting(false);
    if (success) {
      setTourList((prevTours) => prevTours.filter((tour) => tour.id !== deleteId));
      toast.success("Tour deleted successfully");
    } else {
      toast.error("Failed to delete tour");
    }
    setDeleteId(null);
  };
    

  const filteredTours = tourList
    .filter((tour) => tour.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((tour) => filterDifficulty === "all" || tour.difficulty === filterDifficulty)
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "days") {
        return a.days - b.days
      } else {
        return a.name.localeCompare(b.name)
      }
    })


  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tour Packages</h1>
        <Button className="bg-primary hover:bg-primary-dark text-white" onClick={() => router.push("/admin/tours/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Tour
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Title</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="days">Duration</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Challenging">Challenging</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTours.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>

              <TableHead>Package Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.map((tour) => (
              <TableRow key={tour.id} className="hover:bg-primary-light">
                <TableCell>{tour.name}</TableCell>
                <TableCell>{tour.days} days</TableCell>
                <TableCell>${tour.price}</TableCell>
                <TableCell>{tour.category}</TableCell>
                <TableCell>{tour.difficulty}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/tours/${tour.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={(e) => handleEdit(tour.id)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(tour.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this tour? This action cannot be undone.
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
      ) : (
        <p className="text-center text-gray-500">No tours found.</p>
      )}
    </div>
  )
}

