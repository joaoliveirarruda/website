"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen text-white bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/assets/hero-fig.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      <div className="relative px-[5vw] pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-44 lg:pb-24 flex-1 flex flex-col w-full">
        <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-end">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-medium text-[clamp(56px,11vw,152px)] leading-[0.85] tracking-[-0.045em] max-w-[1100px] border-b border-white/40 pb-6 text-white"
        >
          {t.hero.title1}<br/>{t.hero.title2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-8 text-lg md:text-xl max-w-2xl text-white/90 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3 md:gap-4"
        >
          <Link href={t.links.mentee} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black border border-white rounded-full px-6 py-3 text-base md:px-8 md:py-4 md:text-lg font-medium hover:bg-transparent hover:text-white transition-all shadow-sm hover:-translate-y-1">
            {t.hero.btnPrimary}
          </Link>
          <Link href="#faq" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base md:px-8 md:py-4 md:text-lg font-medium text-white hover:bg-white hover:text-black transition-all">
            {t.hero.btnSecondary}
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
