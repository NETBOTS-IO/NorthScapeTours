import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // applies to all search engines
      allow: "/", // allow everything on your site
      disallow: ["/admin", "/dashboard"], // stop crawling admin pages
    },
    sitemap: "https://www.yourtoursite.com/sitemap.xml",
  };
}