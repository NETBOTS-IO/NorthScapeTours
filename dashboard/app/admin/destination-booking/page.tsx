"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash, Search, Eye } from "lucide-react"
import { getTours, deleteTour, getTourBookings, TourBooking, deleteTourBooking, updatingBookingById, updateTourBookingById, getDestinationBookings, DestinationBooking, deleteDestinationBooking, updateDestinationBookingById } from "@/lib/data-utils"
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

export default function DestinationBookingPage() {
    
  const [tourList, setTourList] = useState<DestinationBooking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null | undefined>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      const destionations = await getDestinationBookings()
      setTourList(destionations)
    }
    fetchTours()
  }, []);

  console.log('tourList', tourList);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await deleteDestinationBooking(deleteId);
    setIsDeleting(false);
    if (success) {
      setTourList((prevTours) => prevTours.filter((tour) => tour._id !== deleteId));
      toast.success("Tour Booking deleted successfully");
    } else {
      toast.error("Failed to delete tour booking");
    }
    setDeleteId(null);
  };

  const handleConfirm = async (id: string, status: boolean, _id: string | undefined) => {
      if (window.confirm(`Are you sure you want to ${status === true ? "Confirm" : "Concelled"} this Booking?`)) {
        // api called for updating status 
        setLoading(true);
        try {
          console.log('_id', _id);
          console.log('status', status);

          const response = await updateDestinationBookingById(id, {status, _id});
          console.log('res Destination booking', response)
  
          if (response.success) {
          const response =   await getDestinationBookings();
          console.log('response get destination :>> ', response);
          setTourList(response || [])
            toast.success(`Destination Booking Successfully Confirm`);
          } else {
            toast.error(`Error update Destination Booking ${response.message}`);
            return 
          } 
        } catch (error) {
          console.log('error', error)
          toast.error("An error occurred while Destination Booking");
          return
        }finally{
          setLoading(false);
        }
  
      }
    };
    

  const filteredTours = tourList
    .filter((tour) => tour.destination?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((tour) => filterDifficulty === "all" || tour.destination?.difficulty === filterDifficulty)
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.destination.price - b.destination.price
      } else if (sortBy === "days") {
        return a.destination.days - b.destination.days
      } else {
        return a.destination.name.localeCompare(b.destination.name)
      }
    })


  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Booking Tour Packages</h1>
        {/* <Button className="bg-primary hover:bg-primary-dark text-white" onClick={() => router.push("/admin/tours/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Tour
        </Button> */}
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
              <TableHead>Status</TableHead>
              <TableHead>Confirm</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.map((destination) => (
              <TableRow key={destination._id} className="hover:bg-primary-light">
                <TableCell>{destination?.destination?.name}</TableCell>
                <TableCell>{destination?.destination?.days} days</TableCell>
                <TableCell>${destination?.destination?.price}</TableCell>
                <TableCell>{destination?.destination?.category}</TableCell>
                <TableCell>{destination?.destination?.difficulty}</TableCell>
                <TableCell><span    className={`${destination?.destination?.availability === true ? " bg-red-500" : 
                  destination?.destination?.availability === false ? "bg-green-500" : "bg-amber-600" } px-2 py-1 rounded-md text-sm `}>{destination?.destination?.availability === true ? "Pending" : "Confirmed" }</span>
                  </TableCell>
                   <TableCell className="text-center text-muted-foreground py-6">
                                    {destination?.availability === true ? (
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleConfirm(`${destination._id}`, destination?.destination?.availability, destination?.destination?._id  )}
                                      >
                                       {loading ? "..." : "Confirm"}
                                      </Button>
                                     ):(
                                      <Button
                                        size="sm"
                                        className="bg-red-500"
                                          onClick={() => handleConfirm(`${destination._id}`, destination?.destination?.availability, destination?.destination?._id )}
                                      >
                                        {loading ? "..." : "Cancelled"}
                                      </Button>
                                    )}
                  
                                  </TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/destination-booking/${destination._id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(destination._id)}
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

