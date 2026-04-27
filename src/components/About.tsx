"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-[128px] px-[5vw]" id="sobre">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Main Dark Card (col-span-2) */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-momento-dark text-white rounded-[24px] p-10 lg:p-14 flex flex-col justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm font-medium mb-8">
                {t.about.badge}
              </span>
              <h2 className="font-display font-medium text-[40px] lg:text-[56px] leading-[1.1] tracking-[-0.03em] mb-8 uppercase">
                {t.about.title1} {t.about.title2}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-white/80 max-w-[90%]">
              {t.about.description}
            </p>
          </motion.article>

          {/* Card 2: Stat 1 (col-span-1) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-momento-lightest rounded-[24px] p-10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <p className="font-display text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
                {t.about.stat1Number}
              </p>
              <p className="text-neutral-500 text-lg leading-tight">{t.about.stat1Label}</p>
            </div>
            {t.about.stat1Link && (
              <div className="mt-16">
                <a href="#faq" className="inline-flex bg-white px-6 py-4 rounded-full text-sm font-medium text-black hover:shadow-md transition-shadow">
                  {t.about.stat1Link}
                </a>
              </div>
            )}
          </motion.article>

          {/* Card 3: Stat 2 (col-span-1) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-momento-lightest rounded-[24px] p-10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <p className="font-display text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
                {t.about.stat2Number}
              </p>
              <p className="text-neutral-500 text-lg leading-tight">{t.about.stat2Label}</p>
            </div>
            {t.about.stat2Link && (
              <div className="mt-16">
                <a href="#faq" className="inline-flex bg-white px-6 py-4 rounded-full text-sm font-medium text-black hover:shadow-md transition-shadow">
                  {t.about.stat2Link}
                </a>
              </div>
            )}
          </motion.article>

          {/* Card 4: Image (col-span-2) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 min-h-[400px] rounded-[24px] overflow-hidden relative"
          >
            <Image 
              src="/assets/hero-fig.png" 
              alt="Momento Community" 
              fill 
              className="object-cover" 
            />
          </motion.article>

          {/* Card 5: Stat 3 (col-span-1) */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-momento-lightest rounded-[24px] p-10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <p className="font-display text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
                {t.about.stat3Number}
              </p>
              <p className="text-neutral-500 text-lg leading-tight">{t.about.stat3Label}</p>
            </div>
            <div className="mt-16 flex -space-x-4">
              <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-neutral-200 relative z-30">
                <Image src="/assets/testimonial-jp.png" alt="Avatar" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-neutral-300 relative z-20">
                <Image src="/assets/testimonial-jp.png" alt="Avatar" width={56} height={56} className="object-cover w-full h-full grayscale opacity-80" />
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-momento-accent flex items-center justify-center text-white text-sm font-medium relative z-10">
                +1k
              </div>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}
