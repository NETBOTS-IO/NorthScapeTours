"use client";

import { getCarById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Fuel, Settings, Shield, MapPin, Calendar, Clock, Phone, Mail } from "lucide-react";
import { RentCar } from "@/data/rent-data";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const CarDetails = () => {
  const [car, setCar] = useState<RentCar | null>(null); 
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined; 

   // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail:"",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    dropoffTime: "",
    specialRequirements: "",
  })

  const fetchCarDetails = async () => {
    if (!id) return;
    setIsSending(true)
    try {
      const res = await getCarById(id);
     setCar(res as RentCar); 
     setIsSending(false)
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBookNow = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.customerName || !formData.phoneNumber || !formData.pickupLocation || !formData.pickupDate 
    || !formData.customerEmail) {
    alert("Please fill in all required fields");
    return;
  }

  setIsLoading(true);

  const bookingData = {
    carId: car?._id,
    carName: car?.carName,
    carModel: car?.carModel,
    pricePerDay: car?.pricePerDay,
    ...formData
  };
  try {
    const res = await fetch(`${BASE_API_URL}/bookings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    const result = await res.json();
    console.log('result', result)
    if (result.success) {
      alert("Booking request sent! The owner has been notified.");
      setFormData({
        customerName: "",
        customerEmail:"",
        phoneNumber: "",
        pickupLocation: "",
        dropoffLocation: "",
        pickupDate: "",
        dropoffDate: "",
        pickupTime: "",
        dropoffTime: "",
        specialRequirements: "",
      });
      router.push('/rent')
    } else {
      alert(`${result.message}`);
    }
  } catch (error) {
    alert(`Error sending booking request.`);
  } finally {
    setIsLoading(false);
  }
};



  if (isSending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <motion.div {...fadeInUp}>
            <div className="space-y-4 pt-4">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                 src={`${BASE_URL}${car?.carImage}` || "/placeholder.jpg"}
                  alt={car?.carName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div {...fadeInUp} className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                {car?.carName}
              </h1>
              <p className="text-xl text-slate-600">{car?.carModel} Model</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Seats</p>
                    <p className="font-semibold">{car?.seats} People</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Fuel Type</p>
                    <p className="font-semibold">{car?.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Transmission</p>
                    <p className="font-semibold">{car?.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Insurance</p>
                    <p className="font-semibold">Included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Description</h3>
              <p className="text-slate-600 leading-relaxed">{car.description}</p>
            </div> */}

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600">Price per day</p>
                  <p className="text-3xl font-bold text-orange-600">${car?.pricePerDay}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Driver</p>
                  <p className="font-semibold text-slate-800">{car?.driverName}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

 {/* Booking Form */}
        <motion.div
          className="mt-12 bg-white rounded-2xl shadow-xl p-8 border"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Book This Car</h2>

           <form onSubmit={handleBookNow} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Cutomer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
            </div>
<div className="grid grid-cols-1  gap-6">
<div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Customer Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="Enter customer email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Pickup Location <span className="text-red-500">*</span>
                </label>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select pickup location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Miami">Miami</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Drop-off Location
                </label>
                <select
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select drop-off location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Miami">Miami</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Pickup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Drop-off Date
                </label>
                <input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pickup Time
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Drop-off Time
                </label>
                <input
                  type="time"
                  name="dropoffTime"
                  value={formData.dropoffTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Special Requirements</label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any special requirements or notes..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-slate-800">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">${car?.pricePerDay}/day</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">Final price will be calculated based on rental duration</p>
            </div>

            <motion.button
  type="submit"
  className={`w-full font-semibold py-4 px-6 rounded-lg text-lg transition-colors flex items-center justify-center gap-2
    ${car?.status === "Confirmed" 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-orange-500 hover:bg-orange-600 text-white"
    }`}
  whileHover={car?.status === "Confirmed" ? {} : { scale: 1.02 }}
  whileTap={car?.status === "Confirmed" ? {} : { scale: 0.98 }}
  disabled={car?.status === "Confirmed"}
>
  {isLoading ? (
    <div>...</div>
  ) : (
    <>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
      </svg>
      <span>
        {car?.status === "Confirmed" ? "Booking Confirmed" : `Book via WhatsApp - $${car?.pricePerDay}/day`}
      </span>
    </>
  )}
</motion.button>
            <p className="text-sm text-slate-500 text-center">
              * Required fields. You'll receive a comfirmation email within 24 hours.
            </p>
          </form>
        </motion.div>
        {/* contact information  */}
            <motion.div
          className="mt-8 bg-blue-50 rounded-xl p-6 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Need Help? Contact Us</h3>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-600" />
              <span className="text-slate-600">(0320) 5077123</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
              <span className="text-slate-600">info@northscapetours.com</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CarDetails;
