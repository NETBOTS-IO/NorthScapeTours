"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Mountain,
  Telescope,
  Users,
  Crown,
  Waves,
  Camera,
  TreePine,
  Compass,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchTourCategories } from "@/lib/api"

interface TripCategory {
  _id: string; // category name
  count: number;
  categoryId: string;
}

const TripCategories = () => {
  const [categoriesData, setCategoriesData] = useState<TripCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const container = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { root: container, initial: true, once: true, margin: "-100px" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await fetchTourCategories();
        setCategoriesData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    mountain: Mountain,
    telescope: Telescope,
    users: Users,
    crown: Crown,
    waves: Waves,
    camera: Camera,
    tree: TreePine,
    compass: Compass,
  };

  const getIconString = (title: string) => {
    switch (title.toLowerCase()) {
      case "trekking":
      case "trekking & hiking":
        return "mountain";
      case "wildlife safaris":
        return "telescope";
      case "cultural tours":
        return "users";
      case "luxury escapes":
        return "crown";
      case "water adventures":
        return "waves";
      case "photography tours":
        return "camera";
      case "eco adventures":
        return "tree";
      case "expeditions":
        return "compass";
      default:
        return "mountain";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section ref={container} className="section-padding bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Adventure <span className="text-orange-600">Categories</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the perfect type of adventure that matches your interests
            and experience level
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categoriesData.map((category, index) => {
            const iconString = getIconString(category._id);
            const IconComponent = iconMap[iconString] || Mountain;
            return (
              <motion.div key={index} variants={itemVariants} className=  "group">
                <Link href={`/trips/category?category=${encodeURIComponent(category.categoryId)}&tripType=${category._id}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      rotateY: 5,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 group-hover:from-orange-500 group-hover:to-orange-700 transition-all duration-500`}
                    />
                    {/* Content */}
                    <div className="relative p-4 text-white">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                        {category._id}
                      </h3>
                      {/* Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">
                          {category.count} adventures
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                    {/* Hover Effect Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        {/* Clear Filter Button */}
        {/* {selectedCategory && (
          <div className="text-center mt-8">
            <button
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => router.push("/trips")}
            >
              Clear Category Filter
            </button>
          </div>
        )} */}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact" className="btn-outline">
              Request Custom Adventure
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TripCategories;
