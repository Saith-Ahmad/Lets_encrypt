"use client";

import Image from "next/image";

const coalImages = [
  "/assets/coal1.png",
  "/assets/coal2.png",
  "/assets/coal3.png",
  "/assets/coal4.png",
];

export default function CoalSupply() {
  return (
    <section className="py-5 md:py-20 bg-gray-50 overflow-hidden" id="coal-supply">
      {/* 👇 Use flex-col-reverse on mobile, grid on md+ */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - DIAMOND GALLERY */}
        <div className="relative w-full flex justify-center items-center mt-10 md:mt-0">
          <div className="grid grid-cols-2 gap-6 rotate-45 w-72 md:w-96">
            {coalImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-square  overflow-hidden rounded-lg shadow-md -rotate-45"
              >
                <Image
                  src={src}
                  alt={`Coal image ${idx + 1}`}
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
            Coal Supply Services
          </h2>
          <p className="text-gray-600 mb-6">
            Along with our boiler inspection services, we provide premium quality
            coal to keep your industries and boilers running efficiently and
            smoothly.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>High-grade, low-ash industrial coal</li>
            <li>Reliable and consistent supply chain</li>
            <li>Moisture-controlled storage and delivery</li>
            <li>Suitable for all types of industrial boilers</li>
            <li>Flexible bulk and custom order options</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
