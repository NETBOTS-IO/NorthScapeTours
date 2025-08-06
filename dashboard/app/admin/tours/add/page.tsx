"use client"

import TourForm from "@/components/TourForm"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddTourPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Add New Tour</h1>
      <TourForm />
    </div>
  )
}

