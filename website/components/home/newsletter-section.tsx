"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send } from "lucide-react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="section-padding bg-gradient-to-r from-[#f5530c] to-[#e04a0b]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated on Your Next Adventure</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get exclusive travel deals, destination guides, and early access to new tour packages delivered to your
            inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#040404] hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-white/80 text-sm mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#06901c] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
              <p className="text-white/90">Thank you for subscribing. Get ready for amazing travel inspiration!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
