import type { Metadata } from "next"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import TeamSection from "@/components/about/team-section"
import ValuesSection from "@/components/about/values-section"

export const metadata: Metadata = {
  title: "About Us - NORTHSCAPE PAKISTAN",
  description:
    "Learn about NORTHSCAPE's pakistan journey, our passionate team, and our commitment to creating extraordinary travel experiences around the world.",
  keywords: "about northscape pakistan, travel company, our story, travel experts, mission, values",
}

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutStory />
      <ValuesSection />
      <TeamSection />
      {/* <AwardsSection /> */}
      {/* <CertificationsSection /> */}
    </div>
  )
}
