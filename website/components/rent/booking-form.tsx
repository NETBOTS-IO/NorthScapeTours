"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Calendar,
  Search,
} from "lucide-react"

const BookingForm = () => {
  return (
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
              <motion.h2
                       className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center "
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.2 }}
                       viewport={{ once: true }}
                     >
                       Book Your{" "}
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                         Car Now
                       </span>
                     </motion.h2>
           
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Pickup Location
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select location</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                    <option value="miami">Miami</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Drop-off Location
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select location</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                    <option value="miami">Miami</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Drop-off Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <motion.div className="text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-3 text-lg rounded-lg transition-colors flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Search Cars
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default BookingForm