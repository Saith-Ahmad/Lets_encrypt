"use client";

import Image from "next/image";

const encryptionFeatures = [
  {
    title: "AES Encryption",
    desc: "Protect your data with AES-256 — the global standard for fast and secure symmetric encryption.",
    img: "/assets/feature1.png",
  },
  {
    title: "RSA Encryption",
    desc: "Use RSA for asymmetric encryption, perfect for secure sharing of files and messages between users.",
    img: "/assets/feature2.png",
  },
  {
    title: "File Encryption & Decryption",
    desc: "Upload and download encrypted files seamlessly. Your files are encrypted before they ever leave your device.",
    img: "/assets/feature3.png",
  },
  {
    title: "Key Management System",
    desc: "Generate, store, and manage encryption keys safely — or bring your own custom password-like key.",
    img: "/assets/feature4.png",
  },
];

export default function EncryptionFeatures() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - TEXT */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
            Powerful <span className="text-accent">Encryption </span>Features
          </h2>
          <p className="text-gray-600 mb-6">
            Let’s Encrypt offers next-generation data protection tools that make
            text and file encryption simple, fast, and secure. Whether you’re
            safeguarding personal notes or confidential documents, our platform
            ensures complete privacy and control.
          </p>

          <ul className="space-y-3">
            {encryptionFeatures.map((feature, idx) => (
              <li key={idx}>
                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE - IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4">
          {encryptionFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={feature.img}
                alt={feature.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
