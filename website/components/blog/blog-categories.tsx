
import { motion } from "framer-motion"
import { Blog } from "@/data/blogs-types";

interface BlogCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  posts: Blog[];
  isLoading: boolean;
}

const BlogCategories = ({ activeCategory, onCategoryChange, posts, isLoading }: BlogCategoriesProps) => {
  // Build categories dynamically from posts
  const categoryMap: Record<string, number> = {};
  posts.forEach((post) => {
    categoryMap[post.category] = (categoryMap[post.category] || 0) + 1;
  });
  const categories = [
    { name: "All", count: posts.length },
    ...Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white border-b border-slate-200 sticky top-16 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading ? ( <div className="text-gray-500 text-sm">Loading categories...</div>) :
          
          (categories.map((category, index) => (
            <motion.button
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              <span>{category.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.name ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {category.count}
              </span>
            </motion.button>
          )))}
        </div>
      </div>
    </motion.section>
  )
}

export default BlogCategories
