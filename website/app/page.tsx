import VideoHeroSection from "@/components/home/video-hero-section"
// import FeaturedDestinations from "@/components/home/featured-destinations"
// import PopularPackages from "@/components/home/popular-packages"
import WhyChooseUs from "@/components/home/why-choose-us"
import EnhancedTestimonials from "@/components/home/enhanced-testimonials"
import StatisticsCounter from "@/components/home/statistics-counter"
import NewsletterSection from "@/components/home/newsletter-section"
import FAQAccordion from "@/components/home/faq-accordion"
import PopularPackagesClient from "@/components/home/popular-packages-client"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <VideoHeroSection />
      {/* <FeaturedDestinations /> */}
      <PopularPackagesClient />
      <WhyChooseUs />
      <EnhancedTestimonials />
      <StatisticsCounter />
      <NewsletterSection />
      <FAQAccordion />
    </div>
  )
}
