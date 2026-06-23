"use client"

import { motion, useInView } from "framer-motion";
import { termsAndCondition, infoWeCollect, infoWeUseCollect, securityData, thirtPartyData, cookiesData, yourRightData } from "@/data/about-data";
import { useRef } from "react";

const PrivacyPolicy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-16 md:mb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
              Our <span className="text-orange-600">Terms & Conditions</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
              These Terms and Conditions govern all bookings made with Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd. By confirming a booking with us, clients agree to abide by the following terms:
            </p>
            {termsAndCondition.map((item, index) => (
              <div key={index} className="lg:col-span-1 mt-4">
                <h3 className="text-2xl font-semibold mb-2">{item.section}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
              Our <span className="text-orange-600">Policy</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
              At Northscape Pakistan Tours and Travels (SMC-Pvt) Ltd (“Northscape Pakistan,” “we,” “our,” or “us”), we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, and team.
            </p>
            <div className="mt-6 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
                How We Use <span className="text-orange-600"> Your Information</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl px-4">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
              International  <span className="text-orange-600">Clients</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">

              If you are booking from outside Pakistan, please note that your information will be processed and stored in accordance with Pakistani data protection regulations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-left text-balance mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-800 font-serif">
              Policy  <span className="text-orange-600">Updates</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on our website, and continued use of our services will indicate acceptance of the updated terms.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy