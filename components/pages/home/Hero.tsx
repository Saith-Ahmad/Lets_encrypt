"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {

  const textVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative w-full md:min-h-[100vh] flex flex-col justify-center max-md:py-10 md:pb-10 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Image
          src={"/assets/encrypt1.png"}
          alt="Let's Encrypt background"
          unoptimized
          fill
          className={`object-cover transition-opacity duration-[3000ms] ease-in-out`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-black/80 opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative pt-20 z-10 flex flex-col md:flex-row items-center md:gap-10 justify-between h-full container text-white">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.3 }}
          className="w-full md:w-1/2 flex flex-col items-start text-left space-y-8"
        >
          <motion.h1
            variants={textVariants}
            className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight"
          >
            Protect What Matters with{" "}
            <span className="text-accent">Let’s Encrypt</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="max-w-xl text-base italic"
          >
            Secure your text and files with next-generation AES & RSA
            encryption. Privacy is not an option. It’s your right.
          </motion.p>

          <Link href={'/dashboard'}>
            <motion.div>
              <Button
                size={"sm"}
                variant={'outline'}
                className=" bg-transparent text-accent hover:bg-transparent hover:scale-105 border-accent font-normal md:py-4 py-2 md:px-6 px-6 text-base transition duration-100"
              >
                Sign Up for Free
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={imageVariants}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 relative"
        >
          {/* Glowing background */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-accent/40 to-accent/10 blur-3xl opacity-80 animate-pulse" />
          </div>

          {/* Image */}
          <img
            src="/assets/encrypt4.png"
            alt="Encryption Illustration"
            className="w-[75%] max-w-[350px] object-contain relative z-10"
          />
        </motion.div>
      </div>


    </section>
  );
}
