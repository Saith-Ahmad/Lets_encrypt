import { TextAnimate } from "@/components/magicui/text-animate";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    title: "Boiler Inspection",
    desc: "Comprehensive visual and detailed inspections for boilers, ensuring safety and compliance.",
    img: "/assets/service.png",
  },
  {
    title: "Auxiliary Equipment",
    desc: "Inspection and quality assurance for auxiliary systems to maintain peak performance.",
    img: "/assets/service2.png",
  },
  {
    title: "Quality Control",
    desc: "Expert solutions to welding problems, monitoring, and QA reporting.",
    img: "/assets/service3.png",
  },
  {
    title: "Outage Management",
    desc: "Contractor coordination, scheduling, and safety observations during outages.",
    img: "/assets/service4.png",
  },
  {
    title: "Borescope Inspection",
    desc: "Advanced borescope inspections with visual reports and recorded documentation.",
    img: "/assets/service5.png",
  },
  {
    title: "DATO Service",
    desc: "Non-destructive testing (NDT) management, analysis, and optimization services.",
    img: "/assets/service6.png",
  },

];

export default function Services() {
  return (
    <section className="py-16  bg-gray-50" id="services">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <TextAnimate animation="blurIn" by="word" duration={0.6} as="h2" className="text-2xl md:text-4xl font-bold text-primary">
            Our Services
          </TextAnimate>
          <img src="/assets/arrow.png" alt="Decorative arrow" className="w-[250px] text-center mx-auto mb-2" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Boiler Services and Inspection, LLC provides a wide range of
            professional inspection, quality assurance, and outage management
            services for the industrial and power sector.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              desc={service.desc}
              img={service.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
