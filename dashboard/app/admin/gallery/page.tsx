"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, Eye, Search } from "lucide-react";
import {
  getGalleryPhotos,
  deleteGalleryPhoto
} from "@/lib/data-utils";
import { type GalleryPhoto } from "@/lib/types";
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

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await deleteGalleryPhoto(deleteId);
    setIsDeleting(false);
    if (success) {
      setPhotos((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Photo deleted successfully");
    } else {
      toast.error("Failed to delete photo");
    }
    setDeleteId(null);
  };

  useEffect(() => {
    getGalleryPhotos({ page, limit: perPage, search: searchTerm }).then(
      (result: any) => {
        // If backend returns { photos, total, pages, ... }
        if (Array.isArray(result)) {
          setPhotos(result);
          setTotalPages(1); // fallback for old API
        } else {
          setPhotos(result.photos || []);
          setTotalPages(result.pages || 1);
        }
      }
    );
  }, [page, searchTerm]);
  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Photos</h1>
        <Button className="bg-primary hover:bg-primary-dark text-white" onClick={() => router.push("/admin/gallery/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Photo
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <Input
          placeholder="Search photos..."
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
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.map((photo) => (
            <TableRow key={photo.id}>
              <TableCell>
                {photo.src && photo.src.length > 0 ? (
                  <img
                    src={`${BASE_URL}${photo.src[0]}`}
                    alt={photo.title}
                    className="w-16 h-10 object-cover rounded-md border"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </TableCell>
              <TableCell>{photo.title}</TableCell>
              <TableCell>{photo.category}</TableCell>
              <TableCell>{photo.location || "-"}</TableCell>
              <TableCell>{photo.date || "-"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => router.push(`/admin/gallery/${photo.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() =>
                      router.push(`/admin/gallery/edit/${photo.id}`)
                    }
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(photo.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Photo</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this photo? This action cannot be undone.
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
