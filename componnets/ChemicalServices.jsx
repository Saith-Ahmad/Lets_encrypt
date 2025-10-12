"use client";

import Image from "next/image";

const chemicalServices = [
  {
    title: "Boiler Chemicals",
    desc: "Essential chemicals designed to optimize boiler performance and prevent corrosion.",
    img: "/assets/service7.png",
  },
  {
    title: "Steam Boiler Chemicals",
    desc: "Includes oxygen scavengers, amines, phosphates, and alkalinity builders to protect and treat steam boilers.",
    img: "/assets/service8.png",
  },
  {
    title: "Hot Water Boiler Chemicals",
    desc: "Sodium nitrite-based blends for efficient hot water boiler treatment and corrosion prevention.",
    img: "/assets/service11.png",
  },
  {
    title: "Cooling Tower Chemicals",
    desc: "Formulated to control scale, corrosion, and biological growth in cooling systems.",
    img: "/assets/service10.png",
  },
];

export default function ChemicalServices() {
  return (
    <section className="py-20 bg-white" id="chemical-services">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - TEXT */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
            Boiler Chemical Solutions
          </h2>
          <p className="text-gray-600 mb-6">
            Our advanced range of chemical solutions ensures maximum efficiency,
            corrosion protection, and long-term performance for all types of boilers.
          </p>

          <ul className="space-y-3">
            {chemicalServices.map((service, idx) => (
              <li key={idx}>
                <h4 className="font-semibold text-gray-800">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE - IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4">
          {chemicalServices.map((service, idx) => (
            <div
              key={idx}
              className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={service.img}
                alt={service.title}
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
