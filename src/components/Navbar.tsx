"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage, registrationOpen } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      {/* Top bar */}
      <div className="h-[54px] bg-black text-white text-sm flex items-center justify-center font-medium">
        {registrationOpen ? t.navbar.topbarOpen : t.navbar.topbar}
      </div>

      {/* Navbar */}
      <motion.header
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottomColor: "rgba(255,255,255,0)" }}
        animate={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          borderBottomColor: isScrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
        }}
        style={{ WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-x-0 h-[72px] z-[1000] px-[5vw] flex items-center border-b border-transparent transition-all duration-300 ${isScrolled ? "top-0" : "top-[54px]"}`}
      >
        <div className="grid grid-cols-[200px_1fr_200px] gap-4 items-center max-w-[1440px] mx-auto w-full">
          <Image src="/assets/logo-fig.png" alt="Momento" width={64} height={64} className="h-16 w-auto rounded shadow-lg" />

          <nav className="flex justify-center gap-6 text-base font-medium">
            <Link href="#sobre" className={`transition-colors duration-300 hover:text-momento-accent ${isScrolled ? "text-black" : "text-white"}`}>
              {t.navbar.about}
            </Link>
            <Link href="#depoimentos" className={`transition-colors duration-300 hover:text-momento-accent ${isScrolled ? "text-black" : "text-white"}`}>
              {t.navbar.testimonials}
            </Link>
            <Link href="#servicos" className={`transition-colors duration-300 hover:text-momento-accent ${isScrolled ? "text-black" : "text-white"}`}>
              {t.navbar.services}
            </Link>
            <Link href="#faq" className={`transition-colors duration-300 hover:text-momento-accent ${isScrolled ? "text-black" : "text-white"}`}>
              {t.navbar.faq}
            </Link>
          </nav>

          <div className="justify-self-end flex items-center gap-6">
            <div className={`flex items-center rounded-full p-1 border transition-colors duration-300 ${isScrolled ? "border-momento-dark/20" : "border-white/20"}`}>
              <button 
                onClick={() => setLanguage("pt")}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${language === "pt" ? (isScrolled ? "text-white" : "text-black") : (isScrolled ? "text-momento-dark hover:text-momento-accent" : "text-white hover:text-white/80")}`}
              >
                {language === "pt" && (
                  <motion.div 
                    layoutId="active-lang"
                    className={`absolute inset-0 rounded-full ${isScrolled ? "bg-momento-dark" : "bg-white"}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">PT</span>
              </button>
              <button 
                onClick={() => setLanguage("en")}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${language === "en" ? (isScrolled ? "text-white" : "text-black") : (isScrolled ? "text-momento-dark hover:text-momento-accent" : "text-white hover:text-white/80")}`}
              >
                {language === "en" && (
                  <motion.div 
                    layoutId="active-lang"
                    className={`absolute inset-0 rounded-full ${isScrolled ? "bg-momento-dark" : "bg-white"}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>
            {registrationOpen ? (
              <Link
                href={t.links.mentee}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex justify-center border rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap min-w-[140px]
                  ${isScrolled ? "bg-momento-dark text-white border-momento-dark hover:bg-transparent hover:text-momento-dark" : "bg-white text-black border-white hover:bg-transparent hover:text-white"}
                `}
              >
                {t.navbar.cta}
              </Link>
            ) : (
              <span
                className={`inline-flex justify-center border rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap min-w-[140px] cursor-not-allowed opacity-50
                  ${isScrolled ? "bg-momento-dark/50 text-white/50 border-momento-dark/50" : "bg-white/20 text-white/50 border-white/20"}
                `}
              >
                {t.navbar.cta}
              </span>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
}
