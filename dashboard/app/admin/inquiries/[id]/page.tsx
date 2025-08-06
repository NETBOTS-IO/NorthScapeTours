"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { getInquiryById, updateInquiryStatus, type Inquiry } from "@/lib/data-utils"
// Remove the separate type import
// import type { Inquiry } from "@/lib/data-utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"

export default function InquiryDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchedInquiry = getInquiryById(id as string)
      setInquiry(fetchedInquiry || null)
      setLoading(false)
    }
  }, [id])

  const handleStatusChange = (status: "new" | "in-progress" | "resolved") => {
    if (inquiry) {
      const updatedInquiry = updateInquiryStatus(inquiry.id, status)
      if (updatedInquiry) {
        setInquiry(updatedInquiry)
        toast.success("Status updated successfully")
      } else {
        toast.error("Failed to update status")
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!inquiry) {
    return <div>Inquiry not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{inquiry.subject}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Name:</strong> {inquiry.name}
            </div>
            <div>
              <strong>Email:</strong> {inquiry.email}
            </div>
            <div>
              <strong>Date:</strong> {inquiry.date}
            </div>
            <div>
              <strong>Status:</strong>
              <Select
                value={inquiry.status}
                onValueChange={(value) => handleStatusChange(value as "new" | "in-progress" | "resolved")}
              >
                <SelectTrigger className="w-[180px] ml-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <strong>Message:</strong>
            <p className="mt-2 whitespace-pre-line">{inquiry.message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

