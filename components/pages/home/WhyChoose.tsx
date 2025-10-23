"use client";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white relative overflow-hidden" >

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/icon.png"
              alt="security shield"
              className="mx-auto mb-6 w-[80px]"
            />
          </motion.div>

          <h2
            className="text-2xl md:text-3xl -mt-3 font-bold mb-2 text-primary"
          >
            Why Choose <span className="text-accent">Let’s Encrypt?</span>
          </h2>

         
          <p className="text-gray-600">
            Let’s Encrypt is your all-in-one encryption solution designed to
            secure your text and files using advanced AES and RSA algorithms.
            We combine simplicity, speed, and uncompromised security so that
            your data always remains yours, and yours only.
          </p>
        </div>

        {/* Content Grid + Image */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {/* Left Grid */}
          <div className="md:max-w-[50%] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 shadow-md rounded-xl bg-white border 
                            transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2 ">
                End-to-End Encryption
              </h3>
              <p className="text-gray-600 text-sm">
                Your files and text are encrypted locally before they ever leave
                your device — ensuring full privacy from upload to download.
              </p>
             
            </div>

            {/* Card 2 */}
            <div className="p-6 shadow-md rounded-xl bg-white border 
                            transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">Strong Algorithms</h3>
              <p className="text-gray-600 text-sm">
                Built on industry-standard AES (symmetric) and RSA (asymmetric)
                cryptography, the same technologies trusted by governments and
                enterprises worldwide.
              </p>
             
            </div>

            {/* Card 3 */}
            <div className="p-6 shadow-md rounded-xl bg-white border md:col-span-2 
                            transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">
                Secure Key Management
              </h3>
              <p className="text-gray-600 text-sm">
                Generate, store, and manage encryption keys safely in your
                personal dashboard — or use your own password-like key with
                strength validation.
              </p>
              
            </div>
          </div>

          {/* Right Image */}
          <div className="md:max-w-[50%] justify-center overflow-hidden rounded-md hidden md:flex">
            <img
              src="/assets/encrypt5.png"
              alt="Data security illustration"
              className="rounded-xl w-full max-w-[250px] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
