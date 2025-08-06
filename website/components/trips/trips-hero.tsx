"use client"

import { motion } from "framer-motion"
// import { Search, Filter, MapPin, Calendar } from "lucide-react"
// import { useState } from "react"

const TripsHero = () => {
  // const [searchQuery, setSearchQuery] = useState("")
  // const [quickFilters, setQuickFilters] = useState({
  //   destination: "",
  //   month: "",
  //   duration: "",
  //   difficulty: "",
  // })

  const backgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  }

  const contentVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  // const searchVariants = {
  //   initial: { scale: 0.9, opacity: 0 },
  //   animate: {
  //     scale: 1,
  //     opacity: 1,
  //     transition: {
  //       type: "spring" as const,
  //       stiffness: 200,
  //       damping: 20,
  //       delay: 0.8,
  //     },
  //   },
  // }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <motion.div variants={backgroundVariants} initial="initial" animate="animate" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/sunset.jpg?height=800&width=1920)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={contentVariants} initial="initial" animate="animate" className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Find Your Perfect <span className="text-orange-600">Adventure</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Explore our complete collection of adventures, from challenging treks to luxury escapes
          </motion.p>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { number: "500+", label: "Adventures" },
              { number: "50+", label: "Countries" },
              { number: "15+", label: "Categories" },
              { number: "10K+", label: "Happy Travelers" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-600">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TripsHero

// Advanced Search Interface
//         <motion.div
//           variants={searchVariants}
//           initial="initial"
//           animate="animate"
//           className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
//         >
//           {/* Main Search Bar */}
//           <div className="relative mb-6">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
//             <input
//               type="text"
//               placeholder="Search destinations, activities, or trip names..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-14 pr-4 py-4 text-lg bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
//             />
//           </div>

//           {/* Quick Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div className="relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <select
//                 value={quickFilters.destination}
//                 onChange={(e) => setQuickFilters({ ...quickFilters, destination: e.target.value })}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600 transition-colors duration-300"
//               >
//                 <option value="">Any Destination</option>
//                 <option value="asia">Asia</option>
//                 <option value="africa">Africa</option>
//                 <option value="europe">Europe</option>
//                 <option value="americas">Americas</option>
//                 <option value="oceania">Oceania</option>
//               </select>
//             </div>

//             <div className="relative">
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <select
//                 value={quickFilters.month}
//                 onChange={(e) => setQuickFilters({ ...quickFilters, month: e.target.value })}
//                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600 transition-colors duration-300"
//               >
//                 <option value="">Any Month</option>
//                 <option value="jan-mar">Jan - Mar</option>
//                 <option value="apr-jun">Apr - Jun</option>
//                 <option value="jul-sep">Jul - Sep</option>
//                 <option value="oct-dec">Oct - Dec</option>
//               </select>
//             </div>

//             <select
//               value={quickFilters.duration}
//               onChange={(e) => setQuickFilters({ ...quickFilters, duration: e.target.value })}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600 transition-colors duration-300"
//             >
//               <option value="">Any Duration</option>
//               <option value="1-3">1-3 Days</option>
//               <option value="4-7">4-7 Days</option>
//               <option value="8-14">8-14 Days</option>
//               <option value="15+">15+ Days</option>
//             </select>

//             <select
//               value={quickFilters.difficulty}
//               onChange={(e) => setQuickFilters({ ...quickFilters, difficulty: e.target.value })}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-orange-600 transition-colors duration-300"
//             >
//               <option value="">Any Difficulty</option>
//               <option value="easy">Easy</option>
//               <option value="moderate">Moderate</option>
//               <option value="challenging">Challenging</option>
//               <option value="expert">Expert</option>
//             </select>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <motion.button
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex-1 bg-orange-600 hover:bg-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Search Adventures
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300"
//             >
//               <Filter className="w-5 h-5" />
//               <span>Advanced Filters</span>
//             </motion.button>
//           </div>
//         </motion.div>
