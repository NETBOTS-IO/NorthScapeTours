"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, CreditCard, Shield, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/data/destinations-data";
import { createDestinationBooking, } from "@/lib/api";

interface DestinationBookingProps {
  destination: Destination;
}

const DestinationBooking = ({ destination }: DestinationBookingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [travelers, setTravelers] = useState(2);
  const [formData, setFormData] = useState({
    departureDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = destination?.price * travelers;
  const deposit = Math.round(totalPrice * 0.3);

// console.log('destination :>> ', destination);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
const price = totalPrice.toLocaleString()
   const handleBooking = () => {
  // const destinaitonId = destination._id;
  const updatedAvailaibility = destination.availability;
// console.log('updatedAvailability', updatedAvailaibility);
const customerDetails = {...formData, travelers, price }
// console.log('customerDetails', customerDetails);

  async function tourBooking() {
    setLoading(true)
    try {
      const response =  await createDestinationBooking( {
        ...customerDetails,
        destinationId: destination._id,
        availability: updatedAvailaibility,
      });
      // console.log('response :>> ', response);
      if (response?.success) {
        alert("Your Destination Booked successfully");
        // window.location.reload();
        setFormData({  
          departureDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requirements: "",
  });
      }else{
        alert(response?.data?.message || "Somethin went wrong")
      }
    } catch (error) {
      console.log("error", error); 
    }finally{
      setLoading(false)
    }
  }

  tourBooking();
};

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-orange-50 to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Book Your <span className="text-orange-600">Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure your spot on this incredible journey with our easy booking
              process
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    Booking Details
                  </h3>

                  <div className="space-y-6">
                    {/* Date + Travelers */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="departureDate"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          Departure Date
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="departureDate"
                            type="date"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="travelers"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          Number of Travelers
                        </Label>
                        <Select
                          value={travelers.toString()}
                          onValueChange={(value) =>
                            setTravelers(Number.parseInt(value))
                          }
                        >
                          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-gray-400" />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Traveler" : "Travelers"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-base font-semibold text-gray-900 mb-2 block"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="h-12 border-2 border-gray-200 focus:border-orange-600 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <Label
                        htmlFor="requirements"
                        className="text-base font-semibold text-gray-900 mb-2 block"
                      >
                        Special Requirements (Optional)
                      </Label>
                      <textarea
                        id="requirements"
                        rows={4}
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Any dietary restrictions, medical conditions, or special requests..."
                        className="w-full p-3 border-2 border-gray-200 focus:border-orange-600 rounded-lg resize-none"
                      />
                    </div>

                    {/* Error / Success */}
                    {error && (
                      <p className="text-red-600 font-medium">{error}</p>
                    )}
                    {success && (
                      <p className="text-green-600 font-medium">
                        ✅ Booking successful!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
                <CardContent className="p-0">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">
                    Booking Summary
                  </h4>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per person</span>
                      <span className="font-semibold">
                        ${destination.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of travelers</span>
                      <span className="font-semibold">{travelers}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-gray-900">
                          Total Price
                        </span>
                        <span className="font-bold text-2xl text-orange-600">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-green-800 font-medium">
                          Deposit Required
                        </span>
                        <span className="font-bold text-green-800">
                          ${deposit.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Pay remaining balance 2 days before departure
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleBooking}
                    disabled={!destination.availability}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {loading ? "Loading..." : "Book Now - Pay Deposit"}
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Why Book With Us
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Secure Booking
                        </div>
                        <div className="text-sm text-gray-600">
                          SSL encrypted & protected
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Highly Rated
                        </div>
                        <div className="text-sm text-gray-600">
                          {destination.rating}/5 from {destination.reviews}{" "}
                          reviews
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">
                          Free Cancellation
                        </div>
                        <div className="text-sm text-gray-600">
                          Up to 30 days before departure
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.9, opacity: 0 }
                }
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold">
                  ✓ Available - Limited Spots Remaining
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationBooking;
