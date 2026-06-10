"use client"

import type React from "react"
import { motion } from "framer-motion"
import { fetchRentalCar } from "@/lib/api"
import { useEffect, useState } from "react"
import { RentCar } from "@/data/rent-data"
import { useRouter } from "next/navigation";


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}


const Card = () => {
  const[cars, setCars] = useState<RentCar[]>([]);
  const[isLoading, setIsLoading]= useState(false);
  
  const router = useRouter();

const fetchCars = async()=>{
  setIsLoading(true);
  try {
    const data = await fetchRentalCar()
    if(data && Array.isArray(data)){
      setCars(data);
      setIsLoading(false);
    }else{
      setCars([]);
    }
  } catch (error) {
    console.log("error fetching cars", error)
    setCars([])
  }
}
useEffect(()=>{
  fetchCars();
},[])

if (isLoading) return <div>Loading...</div>;

// console.log('cars', cars)

// const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
 const BASE_URL = "http://localhost:5000";

  return (
     <div className="min-h-screen bg-white">
         {/* Car Fleet Section */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto px-4">
         <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Fleet
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {cars?.length ===0 ? "there is no cars" : cars?.map((car) => (
              <motion.div
                key={car._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <img src={`${BASE_URL}${car.carImage}` || "/placeholder.jpg"} alt={car.carName} className="w-full h-48 object-cover" />
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
  <div className="p-6">
    {/* Header with Status Badge */}
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-1">{car.carName}</h3>
        <p className="text-slate-500 text-sm">{car.carModel} Model</p>
      </div>
      {car.status === "Confirmed" && (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          {car.status}
        </span>
      )}
    </div>

    {/* Features as List Items */}
    <div className="space-y-2 mb-5">
      <div className="flex items-center text-sm">
        <span className="w-32 text-slate-500">Mileage</span>
        <span className="text-slate-800 font-medium">{car.mileage ? "Yes" : "No"}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <span className="w-32 text-slate-500">Air Conditioned</span>
        <span className="text-slate-800 font-medium">{car.conditioned ? "Yes" : "No"}</span>
      </div>
      
    <div className="flex items-center text-sm">
  <span className="mr-2 text-slate-500">Minimum Driver Age</span>
  <span className="text-slate-800 font-medium">{car.driverName}</span>
</div>
      
      <div className="flex items-center text-sm">
        <span className="w-32 text-slate-500">Capacity</span>
        <span className="text-slate-800 font-medium">{car.seats} people</span>
      </div>
      
      <div className="flex items-center text-sm">
        <span className="w-32 text-slate-500">Doors-Count</span>
        <span className="text-slate-800 font-medium">{car.fuelType}</span>
      </div>
    </div>

    {/* Price and Action */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div>
        <span className="text-3xl font-bold text-orange-600">${car.pricePerDay}</span>
        <span className="text-slate-400 text-sm"> / day</span>
      </div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button 
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          onClick={() => router.push(`/car-rent/${car._id}`)}
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </div>
  </div>
</div>
              </motion.div>
            ))}
          </motion.div> 
        </div>
      </section>
     </div>
  )
}

export default Card