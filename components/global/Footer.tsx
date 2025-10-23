'use client';
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Lock } from "lucide-react";
import { usePathname } from "next/navigation"; // ✅ Import hook

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Vision", href: "#vision" },
  { label: "Get Started", href: "#get-started" },
];

export default function Footer() {
  const pathname = usePathname(); // ✅ Get current route

  // ✅ Hide footer on all routes except "/"
  if (pathname !== "/") return null;

  return (
    <footer className="flex flex-col">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 relative text-white md:pt-14 py-10 overflow-hidden">

        {/* Main Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20">
          
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 my-4">
              <Lock size={28} className="text-accent" />
              <h2 className="text-2xl font-bold text-accent">Let’s Encrypt</h2>
            </div>

            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Secure your text and files instantly with AES and RSA encryption.
              <br />
              <strong>Let’s Encrypt</strong> empowers you to take control of your privacy
              with simplicity, speed, and security — all in one place.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-accent transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:support@letsencryptapp.com"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <Mail size={18} className="text-accent" /> support@letsencryptapp.com
              </a>
              <a
                href="tel:+923244281854"
                className="flex items-center gap-2 hover:text-accent transition"
              >
                <Phone size={18} className="text-accent" /> +92 324 4281854
              </a>
            </div>
            <p className="text-white/70 text-sm mt-3">
              Available 24/7. We’re here to help keep your data secure.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="max-w-7xl mx-auto px-6 py-6 border-b border-white/20 flex justify-center gap-6">
          <a href="#" className="hover:text-accent transition"><Facebook /></a>
          <a href="#" className="hover:text-accent transition"><Twitter /></a>
          <a href="#" className="hover:text-accent transition"><Instagram /></a>
          <a href="#" className="hover:text-accent transition"><Linkedin /></a>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Let’s Encrypt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
