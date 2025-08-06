import type { Metadata } from "next"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import TeamSection from "@/components/about/team-section"
import ValuesSection from "@/components/about/values-section"
import AwardsSection from "@/components/about/awards-section"
import CertificationsSection from "@/components/about/certifications"

export const metadata: Metadata = {
  title: "About Us - NORTHSCAPE",
  description:
    "Learn about NORTHSCAPE's journey, our passionate team, and our commitment to creating extraordinary travel experiences around the world.",
  keywords: "about travelmaker, travel company, our story, travel experts, mission, values",
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutHero />
      <AboutStory />
      <ValuesSection />
      <TeamSection />
      <AwardsSection />
      <CertificationsSection />
    </div>
  )
}
