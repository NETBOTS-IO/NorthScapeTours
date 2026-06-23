"use client";

import { getCarById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Fuel, Settings, Shield, MapPin, Calendar, Clock, Phone, Mail,CarFront } from "lucide-react";
import { RentCar } from "@/data/rent-data";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const CarDetails = () => {
  const [car, setCar] = useState<RentCar | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
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
    setIsLoading(true)
    try {
      const res = await getCarById(id);
      setCar(res as RentCar);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setIsLoading(false)
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

  // console.log('car', car)

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.phoneNumber || !formData.pickupLocation || !formData.pickupDate
      || !formData.customerEmail) {
      alert("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const bookingPayload = {
        ...formData,
        carId: car?._id,
        carName: car?.carName,
        carModel: car?.carModel,
        pricePerDay: car?.pricePerDay,
        seats: car?.seats,
        transmission: car?.transmission,
        fuelType: car?.fuelType,
        driverName: car?.driverName
      };

      const response = await fetch(`${BASE_API_URL}/api/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });
      const data = await response.json();

      // console.log('response', response)
      // console.log('data', data)
      if (!data.success) {
        alert(data.message)
        setIsLoading(false);
        return // return here while car exist in booking
      }

      if (data.success) {
        alert(data.message)
        setIsLoading(false);
        setFormData({
          customerName: "",
          customerEmail: "",
          phoneNumber: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDate: "",
          dropoffDate: "",
          pickupTime: "",
          dropoffTime: "",
          specialRequirements: "",
        })
      }


      // console.log("Booking created:", data);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }

  };



  if (isLoading) {
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
          <p className="text-sm text-slate-600">Max People</p>
          <p className="font-semibold">{car?.seats}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <CarFront className="w-5 h-5 text-orange-600" />
        <div>
          <p className="text-sm text-slate-600">Door Count</p>
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
      
      {/* <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-orange-600" />
        <div>
          <p className="text-sm text-slate-600">Insurance</p>
          <p className="font-semibold">Included</p>
        </div>
      </div> */}
      
      {/* Mileage */}
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <div>
          <p className="text-sm text-slate-600">Mileage</p>
          <p className="font-semibold">{car?.mileage}</p>
        </div>
      </div>
      
      {/* Air Conditioned */}
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <div>
          <p className="text-sm text-slate-600">Air Conditioned</p>
          <p className="font-semibold">{car?.conditioned}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="bg-blue-50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-sm text-slate-600">Price per day</p>
        <p className="text-3xl font-bold text-orange-600">${car?.pricePerDay}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-600">Minimum Driver Age</p>
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
                  <option value="skardu_airport">Skardu International Airport</option>
                  <option value="skardu_bus-station">Skardu Bus Station</option>
                  <option value="main_bazar">Main Bazar Skardu</option>
                  <option value="other">Other</option>
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
                  <option value="skardu_airport">Skardu International Airport</option>
                  <option value="skardu_bus-station">Skardu Bus Station</option>
                  <option value="main_bazar">Main Bazar Skardu</option>
                  <option value="other">Other</option>
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
              {loading ? (
                <div>...</div>
              ) : (
                <span>
                  {car?.status === "Confirmed" ? "Booking Confirmed" : `Book Now`}
                </span>
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
              <span className="text-slate-600">info@northscapepakistan.com</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CarDetails;
