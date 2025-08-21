"use client"

import { Destination } from '@/data/destinations-data';
import { fetchRentalCar, fetchTours, getDestinations } from '@/lib/api';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Tour } from '@/data/trips-data';
import { RentCar } from '@/data/rent-data';

const Page = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [cars, setCars] = useState<RentCar[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const [destination, tours, cars] = await Promise.all([
        getDestinations(),
        fetchTours(),
        fetchRentalCar(),
      ]);
      setDestinations(destination)
      setTours(tours)
      setCars(cars)
      setIsLoading(false);
    }
    fetchAll();
  }, [])

  if (isLoading) return <div className="text-center py-20">Loading...</div>

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  // 🟠 Section Component for DRY structure
  const Section = ({
    title,
    subtitle,
    items,
    renderCard,
    bg = "bg-gray-50",
  }: {
    title: string
    subtitle: string
    items: any[]
    renderCard: (item: any) => React.ReactNode
    bg?: string
  }) => (
    <section ref={ref} className={`${bg} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <motion.h1
            variants={childVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-800"
          >
            {title.split(" ")[0]}{" "} <span className="text-orange-600">{title.split(" ")[1]}</span>
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.slice(0, 6).map(renderCard)}
        </div>
      </div>
    </section>
  )

  return (
    <>
      <Section
        title="Popular Destination"
        subtitle="Explore Pakistan’s most loved travel spots — from lush valleys to historic sites, perfect for your next journey."
        items={destinations}
        renderCard={(dest: Destination) => (
          <div
            key={dest._id}
            className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={`${BASE_URL}${dest.images?.[0]}`}
              alt={dest.destination}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h2 className="text-lg font-semibold">{dest.destination}</h2>
            </div>
          </div>
        )}
      />

      <Section
        title="Popular Tours"
        subtitle="Handpicked tours with incredible experiences across Pakistan. Choose your adventure today."
        items={tours}
        bg="bg-white"
        renderCard={(tour: Tour) => (
          <div
            key={tour._id}
            className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={`${BASE_URL}${tour.images?.[0]}`}
              alt={tour.destination}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h2 className="text-lg font-semibold">{tour.destination}</h2>
              <p className="text-sm">{tour.location}</p>
            </div>
          </div>
        )}
      />

      <Section
        title="Popular Cars"
        subtitle="Travel in comfort and style with our top-rated rental cars available across Pakistan."
        items={cars}
        renderCard={(car: RentCar) => (
          <div
            key={car._id}
            className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={`${BASE_URL}${car.carImage?.[0]}`}
              alt={car.carName}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h2 className="text-lg font-semibold">{car.carModel}</h2>
              <p className="text-sm">{car.carName}</p>
            </div>
          </div>
        )}
      />
    </>
  )
}

export default Page
