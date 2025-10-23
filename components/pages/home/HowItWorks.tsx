"use client";

import Image from "next/image";

const processImages = [
  "/assets/work1.png",
  "/assets/work2.png",
  "/assets/work3.png",
  "/assets/work4.png",
];

export default function HowItWorks() {
  return (
    <section
      className="py-5 pb-10 md:py-20 bg-white overflow-hidden"
      id="how-it-works"
    >
      {/* 👇 Responsive layout */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - IMAGE GALLERY */}
        <div className="relative w-full flex justify-center items-center mt-10 md:mt-0">
          <div className="grid grid-cols-2 gap-6 rotate-45 w-72 md:w-96">
            {processImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md -rotate-45"
              >
                <Image
                  src={src}
                  alt={`Encryption process step ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
            How Let’s Encrypt Works
          </h2>
          <p className="text-gray-600 mb-6">
            Our encryption system is designed to make data protection effortless.
            From generating secure keys to encrypting and decrypting files or
            text — every step happens within your browser to ensure complete
            privacy and control.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>1. Key Generation:</strong> Create AES or RSA encryption
              keys unique to your account.
            </li>
            <li>
              <strong>2. Encrypt Your Data:</strong> Encrypt text or files before
              sending or saving locally and securely.
            </li>
            <li>
              <strong>3. Decrypt Anytime:</strong> Easily decrypt using your
              stored or user-provided key.
            </li>
            <li>
              <strong>4. Secure Storage:</strong> All encrypted data and keys are
              safely managed in your personal dashboard.
            </li>
            <li>
              <strong>5. 100% Privacy:</strong> No external servers ever see your
              unencrypted information.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
