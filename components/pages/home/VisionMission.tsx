"use client";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion";

export default function VisionMission() {
  return (
    <section id="vision"
      className="relative w-full py-32 text-center text-white max-sm:min-h-[50vh] flex items-center"
      style={{
        backgroundImage: "url('/assets/visionbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      {/* Decorative Element */}
      <div className="absolute top-3 left-[50%] translate-x-[-50%]">
        <img
          src="/assets/icon.png"
          alt="Cybersecurity icon"
          className="md:w-[100px] w-[80px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Heading */}
        <TextAnimate
          animation="blurIn"
          by="word"
          duration={0.6}
          as="h2"
          className="text-2xl md:text-4xl -mt-3 font-bold mb-2 text-white"
        >
          Our Vision & Mission
        </TextAnimate>

       
        {/* Paragraph */}
        <p className="text-gray-200">
          Our mission is to make strong encryption accessible to everyone —
          empowering users to protect their privacy with simplicity and trust.
          At <strong>Let’s Encrypt</strong>, we envision a digital world where
          individuals and organizations control their data, not big platforms.
          Through cutting-edge AES and RSA encryption, we aim to make online
          security intuitive, transparent, and truly private for all.
        </p>
      </div>
    </section>
  );
}
