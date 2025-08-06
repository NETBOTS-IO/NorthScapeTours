"use client"

import type React from "react"
import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, MapPin, CreditCard, Shield, CheckCircle, User } from "lucide-react"

const BookingForm = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const [formData, setFormData] = useState({
    // Trip Selection
    destination: "",
    tripDate: "",
    duration: "",
    groupSize: 1,

    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Travel Preferences
    accommodationType: "",
    dietaryRequirements: "",
    fitnessLevel: "",
    specialRequests: "",

    // Payment
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  })

  const destinations = [
    "Everest Base Camp Trek - Nepal",
    "Serengeti Safari - Tanzania",
    "Angkor Wat Cultural Tour - Cambodia",
    "Costa Rica Family Adventure",
    "Iceland Northern Lights",
    "Maldives Luxury Retreat",
    "Patagonia Wilderness Trek",
    "Japan Cultural Journey",
    "Morocco Desert Adventure",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsBooked(true)
    setIsSubmitting(false)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  if (isBooked) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl p-12 text-center shadow-xl border border-slate-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <h2 className="text-3xl font-bold text-slate-800 mb-4">Booking Confirmed!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Thank you for booking with TRAVELMAKER! Your adventure is confirmed and we'll send you detailed trip
              information and preparation guidelines within 24 hours.
            </p>

            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Booking ID:</span>
                  <span className="font-medium text-slate-800">
                    TM-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Destination:</span>
                  <span className="font-medium text-slate-800">{formData.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-medium text-slate-800">{formData.tripDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Travelers:</span>
                  <span className="font-medium text-slate-800">{formData.groupSize} person(s)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex-1">
                View Trip Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex-1"
                onClick={() => {
                  setIsBooked(false)
                  setCurrentStep(1)
                  setFormData({
                    destination: "",
                    tripDate: "",
                    duration: "",
                    groupSize: 1,
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    emergencyContact: "",
                    emergencyPhone: "",
                    accommodationType: "",
                    dietaryRequirements: "",
                    fitnessLevel: "",
                    specialRequests: "",
                    paymentMethod: "",
                    cardNumber: "",
                    expiryDate: "",
                    cvv: "",
                    billingAddress: "",
                  })
                }}
              >
                Book Another Trip
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Complete Your <span className="text-orange-600">Booking</span>
          </h2>
          <p className="text-xl text-slate-600">Fill out the form below to secure your adventure</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    step <= currentStep ? "bg-orange-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                      step < currentStep ? "bg-orange-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Trip Selection</span>
            <span>Personal Info</span>
            <span>Preferences</span>
            <span>Payment</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Trip Selection */}
            {currentStep === 1 && (
              <motion.div variants={itemVariants} className="p-8">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Select Your Adventure</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Destination</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    >
                      <option value="">Choose your destination</option>
                      {destinations.map((dest) => (
                        <option key={dest} value={dest}>
                          {dest}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Departure Date</label>
                    <input
                      type="date"
                      name="tripDate"
                      value={formData.tripDate}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    >
                      <option value="">Select duration</option>
                      <option value="3-5 days">3-5 days</option>
                      <option value="6-10 days">6-10 days</option>
                      <option value="11-15 days">11-15 days</option>
                      <option value="16+ days">16+ days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Travelers</label>
                    <select
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div variants={itemVariants} className="p-8">
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Travel Preferences */}
            {currentStep === 3 && (
              <motion.div variants={itemVariants} className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Travel Preferences</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Accommodation Type</label>
                      <select
                        name="accommodationType"
                        value={formData.accommodationType}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                      >
                        <option value="">Select accommodation</option>
                        <option value="shared">Shared Room</option>
                        <option value="private">Private Room</option>
                        <option value="single">Single Room</option>
                        <option value="luxury">Luxury Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Fitness Level</label>
                      <select
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                      >
                        <option value="">Select fitness level</option>
                        <option value="beginner">Beginner</option>
                        <option value="moderate">Moderate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Dietary Requirements</label>
                    <textarea
                      name="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Please specify any dietary restrictions or allergies..."
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any special requests or additional information..."
                      className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <motion.div variants={itemVariants} className="p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Payment Information</h3>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Your payment information is secure and encrypted</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                        <label
                          key={method}
                          className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span className="font-medium text-slate-700">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.paymentMethod === "Credit Card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Billing Address</label>
                        <textarea
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Enter your billing address..."
                          className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Booking Summary */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-4">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Destination:</span>
                        <span className="font-medium text-slate-800">{formData.destination || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Date:</span>
                        <span className="font-medium text-slate-800">{formData.tripDate || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Travelers:</span>
                        <span className="font-medium text-slate-800">{formData.groupSize} person(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-medium text-slate-800">{formData.duration || "Not selected"}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 mt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-800">Total Amount:</span>
                          <span className="font-bold text-orange-600 text-lg">$3,299</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              >
                Previous
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Next Step
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Complete Booking</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingForm
