import JsonLd from "./JsonLd"

export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mountain Travels Pakistan",
    url: "https://mountaintravelspakistan.com",
    logo: "https://mountaintravelspakistan.com/logo.png",
    sameAs: [
      "https://facebook.com/mountaintravelspakistan",
      "https://instagram.com/mountaintravelspakistan",
      "https://twitter.com/mtpakistan",
      "https://youtube.com/mountaintravelspakistan",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-123-456-7890",
      contactType: "customer service",
      email: "info@mountaintravelspakistan.com",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Adventure Street",
      addressLocality: "Islamabad",
      addressRegion: "ICT",
      postalCode: "44000",
      addressCountry: "PK",
    },
  }

  return <JsonLd data={data} />
}

