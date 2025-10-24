"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/lib/constants/menuItems";
import { usePathname } from "next/navigation";
import Link from "next/link";

const useScrollManager = () => {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) observer.observe(element);
    });

    return () => {
      menuItems.forEach((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
    }
    window.history.pushState(null, "", href);
    setActiveSection(href);
  };

  return { activeSection, handleScrollTo };
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection, handleScrollTo } = useScrollManager();
  const pathname = usePathname(); // ✅ Call at top

  // ✅ Always call all hooks first — never inside conditions
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Now safely return null after hooks
  if (pathname !== "/") return null;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    handleScrollTo(e, href);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent">
      <div className="w-full flex justify-center">
        <div
          className={`w-full rounded-none shadow-lg transition-all backdrop-blur-2xl duration-300 ${
            isScrolled ? "bg-[#ffffffb9]" : "bg-[#ffffff25]"
          }`}
        >
          <div className="container py-2">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex items-center justify-between py-1 px-4 md:px-5"
            >
              {/* Logo */}
              <motion.div variants={item}>
                <p
                  className={`${
                    !isScrolled
                      ? "text-accent hover:text-white"
                      : "text-gray-900 hover:text-primary"
                  } hover:cursor-pointer text-accent md:text-xl font-bold`}
                >
                  Let’s Encrypt
                </p>
              </motion.div>

              {/* Desktop Nav */}
              <motion.nav
                variants={container}
                className="hidden md:flex gap-8 text-gray-600"
              >
                {menuItems.map((itemData) => {
                  const isActive = activeSection === itemData.href;
                  return (
                    <motion.div key={itemData.label} variants={item}>
                      <a
                        href={itemData.href}
                        onClick={(e) => handleScrollTo(e, itemData.href)}
                        className={`flex flex-col items-center gap-1 transition ${
                          isActive
                            ? "text-accent"
                            : `${
                                !isScrolled
                                  ? "text-gray-200 hover:text-white"
                                  : "text-gray-500 hover:text-primary"
                              } hover:scale-[1.02]`
                        }`}
                      >
                        <span className="text-sm">{itemData.label}</span>
                      </a>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* CTA Button */}
              <motion.div variants={item}>
                <a href="/dashboard">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`hover:bg-transparent ${
                      !isScrolled
                        ? "hidden md:flex text-accent bg-transparent border-accent hover:scale-105 font-normal text-sm md:px-6"
                        : "hidden md:flex bg-transparent border-black text-primary hover:scale-105"
                    }`}
                  >
                    Let's get you encrypted!
                  </Button>
                </a>
              </motion.div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      size="icon"
                      className={`${
                        !isScrolled
                          ? "bg-accent text-primary"
                          : "bg-accent text-primary"
                      }`}
                    >
                      <Menu size={30} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[80%] sm:w-[400px] px-10">
                    <SheetHeader />
                    <SheetTitle></SheetTitle>
                    <div className="mt-6 space-y-4">
                      {/* Mobile Nav */}
                      <nav className="flex flex-col gap-4">
                        {menuItems.map((itemData) => {
                          const isActive = activeSection === itemData.href;
                          return (
                            <a
                              key={itemData.label}
                              href={itemData.href}
                              onClick={(e) =>
                                handleMobileLinkClick(e, itemData.href)
                              }
                              className={`flex items-center gap-3 transition ${
                                isActive
                                  ? "text-accent"
                                  : "text-gray-600 hover:text-primary"
                              }`}
                            >
                              {itemData.label}
                            </a>
                          );
                        })}
                      </nav>

                      {/* CTA */}
                      <Link href="/dashboard">
                        <Button className="w-full rounded-full bg-primary hover:bg-primary-hover">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
