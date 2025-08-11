"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCarById, getTestimonialsById,  } from "@/lib/data-utils";
import { BASE_URL } from "@/Var";
import { TestimonialsFormState } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function SingleRentCar() {
  const { id } = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<TestimonialsFormState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getTestimonialsById(id as string).then((testimonial) => {
        setTestimonial(testimonial || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!testimonial) return <div>Testimonial not found</div>;


  return (
    <div className="container mx-auto px-4 py-8">
         <Button variant="outline" onClick={() => router.back()} className="mb-4">
           <ChevronLeft className="mr-2 h-4 w-4" /> Back
         </Button>
   
         <h1 className="text-3xl font-bold mb-6">{testimonial.name}</h1>
   
         <Tabs defaultValue="overview" className="w-full">
   
           <TabsContent value="overview">
             <Card>
               <CardHeader>
                 <CardTitle>{testimonial.name}</CardTitle>
                 <CardDescription>{testimonial.description}</CardDescription>
                  <div className="mb-6">
                   <h3 className="font-semibold text-lg mb-2">Image</h3>
                   <div className="grid grid-cols-3 gap-2 mt-2">
                     {testimonial.image.map((image, index) => (
                       <img
                         key={index}
                         src={`${BASE_URL}${image}` || "/placeholder.svg?height=200&width=300"}
                         alt={`testimonial image ${index + 1}`}
                         className="w-full h-34 object-cover rounded-md border"
                       />
                     ))}
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 {/* General Info */}
                 <div className="mb-6">
                   <h3 className="font-semibold text-lg mb-2">General Information</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div><strong>Location:</strong> {testimonial.location}</div>
                     <div><strong>Occupation:</strong> {testimonial.occupation} days</div>
                     <div><strong>Rating:</strong> {testimonial.rating} ⭐</div>
                     <div><strong>Created At:</strong> {testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleString() : '-'}</div>
                     <div><strong>Updated At:</strong> {testimonial.updatedAt ? new Date(testimonial.updatedAt).toLocaleString() : '-'}</div>
                   </div>
                   <div className="mt-4">
                   <h3 className="font-semibold text-lg mb-2">Trip Information</h3>
                   <div className="grid grid-cols-2 gap-4">
                   <div><strong>Trip Name:</strong> {testimonial.tripName}</div>
                   <div><strong>Trip Date:</strong> {testimonial.tripDate}</div>
                   </div>
                   </div>
                 </div>
                 {/* Tags, Features, Highlights, Related Trips */}
                 <div className="mb-6 grid grid-cols-2 gap-4">
                   <div>
                     <h3 className="font-semibold text-lg mb-2">Tags</h3>
                     <div className="flex flex-wrap gap-2">
                       {testimonial.tags && testimonial.tags.length > 0 ? testimonial.tags.map((tag, idx) => (
                         <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tag}</span>
                       )) : <span className="text-gray-400">-</span>}
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
         </Tabs>
       </div>
  );
} 