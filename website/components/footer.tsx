import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music2 ,
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

  useEffect(()=>{
    const fetchCategories = async()=>{
      try {
        const response = await fetchTourCategories()
        setCategories(response);
      } catch (error) {
        console.log('error', error)
      }finally{
        setLoading(false);
      }
    }
    fetchCategories();
  },[]);
  return (
    <footer className="bg-green-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image alt="northscape logo" src="/Northscape-logo.png" width={200} height={100} /> 
            </div>
            <p className="text-slate-300 text-sm">
              Creating extraordinary travel experiences and unforgettable
              memories around the world.
            </p>
            <div className="flex space-x-4">
              <a
              target="_blank"
                href="https://www.facebook.com/share/1CSjyatsgw/?mibextid=wwXIfr"
                className="text-slate-400 hover:text-[rgb(245,83,12)] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
              target="_blank"
                href="https://www.instagram.com/northscapetours?igsh=eDBvd3liOG1hamh1&utm_source=qr"
                className="text-slate-400 hover:text-[#f5530c] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
              target="_blank"
                href="#"
                className="text-slate-400 hover:text-[#f5530c] transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
              target="_blank"
                href="https://www.tiktok.com/@northscapetourstravels?_t=ZS-8yRBs4luce9&_r=1"
                className="text-slate-400 hover:text-[#f5530c] transition-colors duration-200"
              >
                <Music2 className="w-5 h-5" />
              </a>
              <a
              target="_blank"
                href="https://youtube.com/@northscapetoursandtravels?si=t8M2-_WQi39gkdXd"
                className="text-slate-400 hover:text-[#f5530c] transition-colors duration-200"
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
               {title: "About Us", href:'/about'},
                {title:"Destinations", href: "/destinations"},
                {title:"Tours & Packages", href:"/trip"},
                {title: "Blog", href:"/blog"},
                {title:"Gallery", href:"/gallery"},
                {title:"Contact", href:'/contact'},
              ].map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-[#f5530c] transition-colors duration-200 text-sm"
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
          className="text-slate-300 hover:text-[#f5530c] transition-colors duration-200 text-sm"
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
                <Mail className="w-4 h-4 text-[#f5530c]" />
                <span className="text-slate-300 text-sm">
                  iInfo@northscapetours.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#f5530c]" />
                <span className="text-slate-300 text-sm">
                  Office # 02 benazir road Sukmaidan, skardu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 border-t border-slate-700 mt-8 pt-8 px-4 text-center md:text-left">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Northscape Tours and Travels. All rights reserved.
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
