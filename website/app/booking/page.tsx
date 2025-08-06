import type { Metadata } from "next"
import BookingHero from "@/components/booking/booking-hero"
import BookingForm from "@/components/booking/booking-form"
import BookingSteps from "@/components/booking/booking-steps"

export const metadata: Metadata = {
  title: "Book Your Adventure - NORTHSCAPE | Secure Online Booking",
  description:
    "Book your dream adventure with NORTHSCAPE. Secure online booking, flexible payment options, and expert support throughout your journey.",
  keywords: "book travel, adventure booking, secure booking, travel reservation, trip booking",
}

export default function BookingPage() {
  return (
    <div className="pt-16">
      <BookingHero />
      <BookingSteps />
      <BookingForm />
    </div>
  )
}
