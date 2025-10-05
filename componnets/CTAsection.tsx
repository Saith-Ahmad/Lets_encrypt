"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="w-full flex justify-center py-16 px-3 bg-white" id="contact">
      <div className="max-w-6xl w-full bg-primary text-white rounded-2xl shadow-lg  p-7 md:p-10 grid md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Ensure Your Facility is Safe & <span className="text-accent">Fully Compliant</span>
          </h2>
          <p className="text-base md:text-lg text-gray-200">
            Don't compromise on safety. Schedule your professional boiler inspection with our certified experts to ensure optimal performance and complete peace of mind.
          </p>
          <a href="https://wa.link/ojg67j" target="_blank">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              viewport={{ once: true }}
              className="bg-accent text-primary px-10 py-3 rounded-full font-medium text-lg hover:opacity-90 transition hover:bg-accent-hover">
              Request a Quote
            </motion.button>
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="/assets/cta1.png"
            alt="Boiler Inspection"
            width={400}
            height={600}
            className="rounded-xl object-contain"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}