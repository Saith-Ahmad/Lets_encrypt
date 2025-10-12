"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="contact-us">
      {/* Decorative Lamp (optional) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
        className="absolute md:-top-2 -top-4 md:right-10 right-2"
      >
        <img
          src="/assets/home/lamp.png"
          alt="lamp"
          className="max-w-[70px] md:max-w-[200px]"
        />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <TextAnimate
            animation="blurIn"
            by="word"
            duration={0.6}
            as="h2"
            className="text-2xl md:text-4xl font-bold text-primary"
          >
            Contact Us
          </TextAnimate>

          <img
            src="/assets/arrow.png"
            alt="Decorative arrow"
            className="w-[250px] text-center mx-auto mb-2"
          />

          <p className="text-gray-600">
            Get in touch with us for any inquiries, service bookings, or
            partnership opportunities. We’re here to help your business stay
            efficient and safe.
          </p>
        </div>

        {/* Content Grid + Image */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {/* Left Grid */}
          <div className="md:max-w-[50%] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EMAIL */}
            <div className="group p-6 shadow-md rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4 mb-3">
                <Mail size={30} className="text-primary group-hover:text-accent transition-colors" />
                <h3 className="font-semibold text-lg">Email Us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Have a question or need a quote? Drop us an email and our team
                will respond within 24 hours.
              </p>
              <p className="font-medium text-primary group-hover:text-accent">
                info@boilerinspectionservices.com
              </p>
            </div>

            {/* PHONE */}
            <div className="group p-6 shadow-md rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4 mb-3">
                <Phone size={30} className="text-primary group-hover:text-accent transition-colors" />
                <h3 className="font-semibold text-lg">Call Us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Need immediate assistance or have urgent queries? Feel free to
                call us directly.
              </p>
              <p className="font-medium text-primary group-hover:text-accent">
                +92-324-4281854
              </p>
            </div>

            {/* ADDRESS */}
            <div className="group p-6 shadow-md rounded-xl col-span-1 bg-white border border-gray-200 md:col-span-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center gap-4 mb-3">
                <MapPin size={30} className="text-primary group-hover:text-accent transition-colors" />
                <h3 className="font-semibold text-lg">Our Address</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Visit our location for consultations or in-person meetings. We
                welcome all industrial clients.
              </p>
              <p className="font-medium text-primary group-hover:text-accent">
                BISC Head Quarters, 17-KM  Thokhar Niaz Baig, Lahore, Pakistan
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:max-w-[50%] justify-center overflow-hidden rounded-md flex">
            <img
              src="/assets/contact.png"
              alt="Contact illustration"
              className="rounded-xl max-w-sm w-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
