// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { aboutMilestones, aboutFounders, termsAndCondition, infoWeCollect, infoWeUseCollect, securityData, thirtPartyData, cookiesData, yourRightData } from "@/data/about-data";
// import { Calendar, Users, Globe, Award } from "lucide-react";
// import Image from "next/image";

// const iconMap = { Calendar, Users, Globe, Award };

// const AboutStory = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring" as const,
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   return (
//     <section ref={ref} className="section-padding bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header section */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12 md:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//             Who <span className="text-orange-600">We Are</span>
//           </h2>
//           <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//             Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd is a registered travel company dedicated to delivering exceptional tourism experiences across Pakistan. based in Skardu, we specialize in showcasing the unmatched beauty of Northern Pakistan, with expertly curated journeys to Skardu, Hunza, and beyond.
//           </p>
//         </motion.div>

//         {/* Founders image section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="w-full h-full relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
//           >
//             <Image
//               src={aboutFounders.image ?? "/placeholder.svg"}
//               alt={aboutFounders.alt}
//               fill
//               className="rounded-2xl md:rounded-3xl shadow-md object-cover"
//               sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               priority={false}
//               placeholder={aboutFounders.image ? undefined : "blur"}
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="space-y-4 md:space-y-6"
//           >
//             <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
//               Born from a Love of{" "}
//               <span className="text-green-600">Adventure & Luxury</span>
//             </h3>
//             {aboutFounders.paragraphs.map((p, i) => (
//               <p
//                 key={i}
//                 className="text-slate-600 leading-relaxed text-base sm:text-lg"
//               >
//                 {p}
//               </p>
//             ))}
//             <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-2">
//               {aboutFounders.stats.map((stat, i) => (
//                 <div className="text-center min-w-[100px]" key={i}>
//                   <div className="text-2xl sm:text-3xl font-bold text-orange-600">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm sm:text-base text-slate-600">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* mission and commitment section  */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               Our <span className="black">Mission & Vision</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//               Mission: To provide travelers with safe, authentic, and personalized travel experiences that showcase the best of Pakistan. <br /><br />
//               Vision: To become Pakistan’s most trusted name in tourism and a global ambassador for the country’s culture, heritage, and natural beauty.
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               Our <span className="black">Commitment</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//               At Northscape Pakistan, we believe travel is not just about visiting places — it’s about creating lasting memories. We are committed to:
//               Providing safe and enjoyable travel experiences.

//               Respecting local culture, traditions, and environment.

//               Ensuring every client feels valued and cared for.

//               Northscape Pakistan – Where Journeys Become Memories.
//             </p>
//           </motion.div>

//         </div>

//         {/* terms and conditions */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               Our <span className="text-orange-600">Terms & Conditions</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
//               These Terms and Conditions govern all bookings made with Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd. By confirming a booking with us, clients agree to abide by the following terms:
//             </p>
//             {termsAndCondition.map((item, index) => (
//               <div key={index} className="lg:col-span-1 mt-4">
//                 <h3 className="text-2xl font-semibold mb-2">{item.section}</h3>
//                 <ul className="list-disc list-inside">
//                   {item.points.map((point, pointIndex) => (
//                     <li key={pointIndex} className="mb-1 text-slate-700">{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               Our <span className="text-orange-600">Policy</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
//               At Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd (“Northscape Pakistan,” “we,” “our,” or “us”), we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, and team.
//             </p>
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 Information <span className="text-orange-600">We Collect</span>
//               </h2>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4">
//                 {infoWeCollect.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 How We Use <span className="text-orange-600"> Your Information</span>
//               </h2>
//               <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
//                 Your information is used for the following purposes:
//                 To confirm and manage your bookings
//               </p>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
//                 {infoWeUseCollect.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* security data  */}
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 Data <span className="text-orange-600">  Protection & Security</span>
//               </h2>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
//                 {securityData.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* thirt party data  */}
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 Third-Party <span className="text-orange-600">Services</span>
//               </h2>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
//                 {thirtPartyData.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* Cookies & Website Tracking */}
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 Cookies & Website <span className="text-orange-600">Tracking</span>
//               </h2>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
//                 {cookiesData.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* Your Rights */}
//             <div className="mt-6 w-full">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//                 Your <span className="text-orange-600">Rights</span>
//               </h2>
//               <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
//                 {yourRightData.map((item, index) => (
//                   <li
//                     key={index}
//                     className="mb-2 w-full"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>



//         </div>
//         {/* international and policy update  */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               International  <span className="text-orange-600">Clients</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">

//               If you are booking from outside Pakistan, please note that your information will be processed and stored in accordance with Pakistani data protection regulations.
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//             transition={{ duration: 0.6 }}
//             className="text-left text-balance mb-12 md:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
//               Policy  <span className="text-orange-600">Updates</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//               We may update this Privacy Policy from time to time. Any changes will be posted on our website, and continued use of our services will indicate acceptance of the updated terms.
//             </p>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutStory;







"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutMilestones, aboutFounders, termsAndCondition, infoWeCollect, infoWeUseCollect, securityData, thirtPartyData, cookiesData, yourRightData } from "@/data/about-data";
import { Calendar, Users, Globe, Award } from "lucide-react";
import Image from "next/image";

const iconMap = { Calendar, Users, Globe, Award };
const titleStyle =
  "font-serif text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-slate-600 leading-tight";

const subTitleStyle =
  "font-serif text-xl md:text-2xl font-semibold tracking-tight text-slate-900 leading-snug semibold";

  const textStyle =
  "font-sans text-lg md:text-xl leading-8 text-slate-600 font-normal";

const AboutStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className= {titleStyle}>
            Who <span className="text-orange-600">We Are</span>
          </h2>
          <p className={textStyle}>
            Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd is a registered travel company dedicated to delivering exceptional tourism experiences across Pakistan. based in Skardu, we specialize in showcasing the unmatched beauty of Northern Pakistan, with expertly curated journeys to Skardu, Hunza, and beyond.
          </p>
        </motion.div>

        {/* Founders image section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
          >
            <Image
              src={aboutFounders.image ?? "/placeholder.svg"}
              alt={aboutFounders.alt}
              fill
              className="rounded-2xl md:rounded-3xl shadow-md object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              placeholder={aboutFounders.image ? undefined : "blur"}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            <h3 className={subTitleStyle}>
              Born from a Love of{" "}
              <span className="text-green-600">Adventure & Luxury</span>
            </h3>
            {aboutFounders.paragraphs.map((p, i) => (
              <p
                key={i}
                className={textStyle}
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-2">
              {aboutFounders.stats.map((stat, i) => (
                <div className="text-center min-w-[100px]" key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* mission and commitment section  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              Our <span className="black">Mission & Vision</span>
            </h2>
            <p className={textStyle}>
              Mission: To provide travelers with safe, authentic, and personalized travel experiences that showcase the best of Pakistan. <br /><br />
              Vision: To become Pakistan’s most trusted name in tourism and a global ambassador for the country’s culture, heritage, and natural beauty.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              Our <span className="black">Commitment</span>
            </h2>
            <p className={textStyle}>
              At Northscape Pakistan, we believe travel is not just about visiting places — it’s about creating lasting memories. We are committed to:
              Providing safe and enjoyable travel experiences.

              Respecting local culture, traditions, and environment.

              Ensuring every client feels valued and cared for.

              Northscape Pakistan – Where Journeys Become Memories.
            </p>
          </motion.div>

        </div>

        {/* terms and conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              Our <span className="text-orange-600">Terms & Conditions</span>
            </h2>
            <p className={textStyle}>
              These Terms and Conditions govern all bookings made with Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd. By confirming a booking with us, clients agree to abide by the following terms:
            </p>
            {termsAndCondition.map((item, index) => (
              <div key={index} className="lg:col-span-1 mt-4">
                <h3 className={subTitleStyle}>{item.section}</h3>
                <ul className="list-disc list-inside">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="mb-1 text-slate-700">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              Our <span className="text-orange-600">Policy</span>
            </h2>
            <p className={textStyle}>
              At Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd (“Northscape Pakistan,” “we,” “our,” or “us”), we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, and team.
            </p>
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                Information <span className="text-orange-600">We Collect</span>
              </h2>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4">
                {infoWeCollect.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                How We Use <span className="text-orange-600"> Your Information</span>
              </h2>
              <p className={textStyle}>
                Your information is used for the following purposes:
                To confirm and manage your bookings
              </p>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
                {infoWeUseCollect.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* security data  */}
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                Data <span className="text-orange-600">  Protection & Security</span>
              </h2>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
                {securityData.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* thirt party data  */}
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                Third-Party <span className="text-orange-600">Services</span>
              </h2>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
                {thirtPartyData.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Cookies & Website Tracking */}
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                Cookies & Website <span className="text-orange-600">Tracking</span>
              </h2>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
                {cookiesData.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Your Rights */}
            <div className="mt-6 w-full">
              <h2 className={titleStyle}>
                Your <span className="text-orange-600">Rights</span>
              </h2>
              <ul className="list-disc list-inside text-slate-600 max-w-3xl px-4 mt-4">
                {yourRightData.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 w-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>



        </div>
        {/* international and policy update  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              International  <span className="text-orange-600">Clients</span>
            </h2>
            <p className={textStyle}>

              If you are booking from outside Pakistan, please note that your information will be processed and stored in accordance with Pakistani data protection regulations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className={titleStyle}>
              Policy  <span className="text-orange-600">Updates</span>
            </h2>
            <p className={textStyle}>
              We may update this Privacy Policy from time to time. Any changes will be posted on our website, and continued use of our services will indicate acceptance of the updated terms.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutStory;

