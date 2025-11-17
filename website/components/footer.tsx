import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchTourCategories } from "@/lib/api";

interface TripCategory {
  _id: string; // category name
  count: number;
  categoryId: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<TripCategory[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchTourCategories()
        setCategories(response);
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);
  return (
    <footer className="bg-sky-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image alt="northscape logo" src="/new-logo.png" width={160} height={90} />
            </div>
            <p className="text-slate-300 text-sm">
              Delivering unforgettable travel experiences with professionalism, comfort, and cultural authenticity across Pakistan.
            </p>
            <div className="flex space-x-4">
              <a
                target="_blank"
                href="https://www.facebook.com/share/1FbhcB8xeo/?mibextid=wwXIfr"
                className="text-slate-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/northscapepakistantours?igsh=eDBvd3liOG1hamh1&utm_source=qr"
                className="text-slate-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a
              target="_blank"
                href="#"
                className="text-slate-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a> */}
              <a
                target="_blank"
                href="https://www.tiktok.com/@northscapepakistan?_r=1&_t=ZS-91OXH1wJ3MD"
                className="transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-slate-400 hover:text-orange-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                target="_blank"
                href="https://youtube.com/@northscapepakistan?si=y3WbuRDELjoMNJo7"
                className="text-slate-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                // { title: "About Us", href: '/about' },
                { title: "Destinations", href: "/destinations" },
                { title: "Tours & Packages", href: "/tours" },
                { title: "Blog", href: "/blog" },
                { title: "Gallery", href: "/gallery" },
                // { title: "Contact", href: '/contact' },
                { title: "Privacy Policy", href: '/privacy-policy' },
                { title: "Customer Feedback", href: '/feedback' },
              ].map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-orange-500 transition-colors duration-200 text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Travel Categories
            </h3>
            <ul className="space-y-2">
              {loading ? (
                // Show 6 loading placeholders
                Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="text-slate-400 text-sm">
                    Loading...
                  </li>
                ))
              ) : (
                categories.slice(0, 6).map((item) => (
                  <li key={item.categoryId}>
                    <Link
                      href={`/trips/category?category=${encodeURIComponent(item.categoryId)}&tripType=${item._id}`}
                      className="text-slate-300 hover:text-orange-500 transition-colors duration-200 text-sm capitalize"
                    >
                      {item._id}
                    </Link>
                  </li>
                ))
              )}
            </ul>

          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#f5530c]" />
                <span className="text-slate-300 text-sm">
                  (0320) 5077123
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Phone className="w-4 h-4 text-[#f5530c]" /> */}
                <svg className="w-4 h-4 text-[#f5530c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="text-slate-300 text-sm">
                  (0355) 5758727
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#f5530c]" />
                <span className="text-slate-300 text-sm">
                  info@northscapepakistan.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#f5530c]" />
                <span className="text-slate-300 text-sm">
                  Office No-02 benazir road Sukmaidan, skardu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 border-t border-slate-700 mt-8 pt-8 px-4 text-center md:text-left">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Northscape Pakistan Tours and Travels. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm">
            Designed and developed by{" "}
            <a
              href="https://netbots.io"
              target="_blank"
              className="hover:text-[#f5530c] transition-colors duration-200"
            >
              Netbots (SMC-Private) Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
