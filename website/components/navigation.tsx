"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { fetchTourCategories } from "@/lib/api";

interface TripCategory {
  _id: string;
  count: number;
  categoryId: string;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoriesData, setCategoriesData] = useState<TripCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await fetchTourCategories();
        setCategoriesData(data);
      } catch (err: any) {
        console.log(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  // console.log("categoriesData", categoriesData)
  // console.log("loading", loading)

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Tours", href: "/tours", children: categoriesData.slice(0, 10).map((ct) => ({
        name: ct._id,
        href: `/${ct.categoryId}`,
        count: ct.count,
      }))
    },
    { name: "Car Rental", href: "/car-rent" },
    { name: "Destinations", href: "/destinations" },
    { name: "Gallery", href: "/gallery" },
    { name: "International Travelers", href: "/international-travelers" },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed  top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="bg-sky-800 text-white h-20 md:h-8 flex flex-col md:flex-row items-center justify-between p-2">
        {/* Email */}
        <div className="flex gap-2 items-center pl-8">
          <Mail className="w-4 h-4 text-[#f5530c]" />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@northscapetours.com&su=Tour%20Inquiry&body=Hello%20Northscape%20Tours"
            // href="mailto:info@northscapepakistan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            info@northscapepakistan.com
          </a>
        </div>

        {/* Phones */}
        <div className="flex items-center gap-4 space-x-3 pr-8">
          {/* First phone */}
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-[#f5530c]" />
            <a href="tel:+923205077123" className="text-white text-sm hover:underline">
              (0320) 5077123
            </a>
          </div>

          {/* Second phone */}
          <div className="flex items-center space-x-3">
            <svg
              className="w-4 h-4 text-[#f5530c]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            <a href="tel:+923555758727" className="text-white text-sm hover:underline">
              (0355) 5758727
            </a>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <Image alt="northscape logo" src="/new-logo.png" width={90} height={85} />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isOpen = isDropdownOpen === item.name

              return (

                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen(item.name)}
                  onMouseLeave={() => setIsDropdownOpen(null)}
                >
                  {/* Main Nav Item */}
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-1 py-2 text-sm font-medium transition-colors duration-200 
          ${pathname === item.href
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-slate-700 hover:text-orange-600"
                      }`}
                  >
                    <span>{item.name}</span>
                    {
                      item.name === "Tours" && (
                        isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )
                    }
                  </Link>

                  {/* Dropdown only if children exist */}
                  {item.children && isDropdownOpen && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-60 z-50">
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={`/tours/category?category=${encodeURIComponent(child.href)}&tripType=${child.name}`}
                              className="block px-4 py-2 text-sm capitalize text-slate-700 hover:bg-orange-100 hover:text-orange-600"
                            >
                              <div className="inline-flex items-center justify-center gap-2">
                                {loading ? "loading..." : child.name}
                                <span className="w-5 h-5 bg-orange-500 flex items-center justify-center text-white rounded-full text-sm">{child.count}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>


          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-orange-600 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed top-26 right-0 h-screen w-80 bg-white border-l border-gray-200 shadow-xl"
            >
              <div className="px-4 pt-4 pb-3 space-y-2">
                {navItems.map((item, index) => {
                  // const isOpen = isDropdownOpen === item.name
                  return (

                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    // onClick={() => setIsDropdownOpen(item.name)}
                    // onMouseLeave={() => setIsDropdownOpen(null)}
                    >
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${pathname === item.href
                          ? "text-orange-600 bg-orange-50"
                          : "text-slate-700 hover:text-orange-600 hover:bg-gray-50"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {/* <span className="flex items-center justify-start gap-4"> */}
                        {item.name}
                        {/* {
                            item.name === "Tours" && (
                              isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )
                          }
                        </span> */}
                      </Link>
                      {/* {item.children && isDropdownOpen && (
                        <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 z-50">
                          <ul className="py-2">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={`/tours/category?category=${encodeURIComponent(child.href)}&tripType=${child.name}`}
                                  className="block px-4 py-2 text-sm capitalize text-slate-700 hover:bg-orange-100 hover:text-orange-600"
                                >
                                  {loading ? "loading..." : child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )} */}
                    </motion.div>

                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
