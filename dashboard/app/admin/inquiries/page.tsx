"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Trash } from "lucide-react"
import { getInquiries, deleteInquiry, type Inquiry } from "@/lib/data-utils"
import { toast } from "react-hot-toast"

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load inquiries
    const fetchedInquiries = getInquiries()
    setInquiries(fetchedInquiries)
  }, [])

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const success = deleteInquiry(id)
      if (success) {
        setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))
        toast.success("Inquiry deleted successfully")
      } else {
        toast.error("Failed to delete inquiry")
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inquiries</h1>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
              <TableCell>{inquiry.date}</TableCell>
              <TableCell>
                <Link href={`/admin/inquiries/${inquiry.id}`}>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(inquiry.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

