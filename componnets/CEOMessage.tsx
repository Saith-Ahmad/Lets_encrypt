"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { Quote } from "lucide-react";

export default function CEOMessage() {
    return (
        <section className="py-32 container " id="ceo-message">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Heading */}
                <TextAnimate
                    animation="blurIn"
                    by="word"
                    duration={0.6}
                    as="h2"
                    className="text-2xl md:text-4xl font-bold text-primary mb-4"
                >
                    Message From Our CEO
                </TextAnimate>
                <img src="/assets/arrow.png" alt="Decorative arrow" className="w-[250px] text-center mx-auto mb-2" />


                {/* Subheading */}
                <p className="text-accent text-sm md:text-base font-medium italic mb-6 relative">
                    Commitment, Integrity, and Innovation drive every step we take.
                    <Quote className="text-accent fill-accent absolute right-0 md:top-0 -top-10 max-w-[30px]" size={50} />
                </p>

                {/* Message */}
                <p className="text-gray-700 text-sm leading-relaxed md:text-base xl:text-[18px]  max-w-4xl mx-auto mb-10">
                    As a company built on trust and technical excellence, we believe that
                    our responsibility extends beyond projects it reaches our people,
                    our clients, and the environment we operate in. At the heart of our
                    success lies a passionate team, always striving to push boundaries,
                    embrace challenges, and deliver results that truly make a difference.
                     With continuous improvement as our focus, we remain dedicated to setting higher
                    standards and building a future defined by professionalism and purpose.
                </p>

                {/* CEO Name */}
                {/* <div className="mt-8">
                    <h4 className="text-lg font-bold text-primary">CEO </h4>
                    <p className="text-gray-600 text-sm">Boiler Inspection Services Company</p>
                </div> */}
            </div>
        </section>
    );
}
