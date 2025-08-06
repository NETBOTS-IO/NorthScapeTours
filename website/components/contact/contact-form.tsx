"use client"

import type React from "react"

import { useState } from "react"
import { Send, User, Mail, MessageSquare } from "lucide-react"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center animate-fade-in">
        <div className="w-16 h-16 bg-[#06901c] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-gray-300 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
        <button onClick={() => setIsSubmitted(false)} className="btn-primary">
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-white font-semibold mb-2">
            <User className="inline w-4 h-4 mr-2 text-[#f5530c]" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f5530c] transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-2">
            <Mail className="inline w-4 h-4 mr-2 text-[#f5530c]" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f5530c] transition-colors"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-white font-semibold mb-2">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#f5530c] transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="booking">Booking Question</option>
            <option value="custom">Custom Trip Planning</option>
            <option value="support">Support</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-white font-semibold mb-2">
            <MessageSquare className="inline w-4 h-4 mr-2 text-[#f5530c]" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f5530c] transition-colors resize-none"
            placeholder="Tell us about your travel plans or ask any questions..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
