// components/Footer.tsx
'use client';
import { menuItems } from "@/lib/constants/menuItems";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col">

      <div className="bg-primary relative text-white md:pt-14 py-10 overflow-hidden">
      

        {/* First Row */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20">
          {/* Logo & About */}
          <div>
            <img src={'/assets/logo1.png'} alt="logo" className="w-32 my-4"/>
            <h2 className="text-xl font-bold text-accent">Boiler Inspection <br/> Services Company</h2>
            <p className="mt-3 text-sm text-white/80">
              Your trusted partner for comprehensive boiler inspections, ensuring safety, compliance, and operational excellence for your business.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-accent transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support & Contact */}
          <div>
           
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="flex flex-col gap-2">
              <a href="https://wa.link/ojg67j" target="_blank" className="flex items-center gap-2">
                <Phone size={18} className="text-accent" /> +92 324-4281854
              </a>
              <a href="mailto:info@boilerinspectionservices.com" className="flex items-center gap-2">
                <Mail size={18} className="text-accent" /> info@boilerinspectionservices.com
              </a>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="max-w-7xl mx-auto px-6 py-6 border-b border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Removed Contact Info from here as it's now in the main section */}
          {/* Social Icons */}
          <div className="flex gap-4 justify-center items-center w-full">
            <a href="https://www.facebook.com/share/19vJXzEyQk/" target="_blank" className="hover:text-accent transition"><Facebook /></a>
            <a href="#" className="hover:text-accent transition"><Twitter /></a>
            <a href="#" className="hover:text-accent transition"><Instagram /></a>
            <a href="#" className="hover:text-accent transition"><Linkedin /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} inspectorofboilers.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}