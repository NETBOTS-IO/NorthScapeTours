import type { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import FAQ from "@/components/contact/faq";
import LocationMap from "@/components/contact/location-map";

export const metadata: Metadata = {
  title: "Contact Us - NORTHSCAPE",
  description: "Get in touch with our travel experts",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-[#f5530c]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to start your adventure? Our travel experts are here to help
              you plan the perfect trip.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <ContactForm />
            </div>
            <ContactInfo />
            <div className=" col-span-full">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>
      <FAQ />
    </div>
  );
}
