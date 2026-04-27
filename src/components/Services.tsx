"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const cardsWithDelay = t.services.cards.map((card, index) => ({
    ...card,
    delay: 0.1 * (index + 1)
  }));

  return (
    <section className="bg-momento-deep text-white py-[144px] px-[5vw]" id="servicos">
      <div className="max-w-[1440px] mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-lg mb-6 text-momento-accent font-medium"
        >
          {t.services.badge}
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[64px] leading-none tracking-[-0.04em] mb-24"
        >
          {t.services.title1}<br/>{t.services.title2}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsWithDelay.map((card, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: card.delay }}
              className="bg-white/5 backdrop-blur-sm rounded-[24px] p-10 flex flex-col gap-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-momento-accent/20 flex items-center justify-center text-momento-accent mb-4">
                {idx === 0 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                {idx === 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                {idx === 2 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>}
              </div>
              <h3 className="font-display text-[32px] font-medium leading-[1.2] tracking-[-0.02em]">{card.title}</h3>
              <p className="text-base leading-[1.6] text-white/80">
                {card.desc}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Badge marquee */}
        <div
          className="mt-20 overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
          }}
        >
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            {[...t.services.badges, ...t.services.badges].map((badge, i) => (
              <span
                key={`${badge}-${i}`}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/20 text-sm text-white/70 font-medium whitespace-nowrap shrink-0"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
