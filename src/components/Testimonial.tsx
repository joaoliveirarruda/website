"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonial() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const item = t.testimonials.items[active];

  return (
    <section className="bg-gradient-to-b from-momento-off-white to-momento-cream py-[128px] px-[5vw]" id="depoimentos">
      <div className="max-w-[1024px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-4 text-neutral-600 font-medium tracking-wide uppercase"
        >
          {t.testimonials.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[64px] leading-none tracking-[-0.04em] mb-16"
        >
          {t.testimonials.title1}<br/>{t.testimonials.title2}
        </motion.h2>

        <motion.article
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[24px] p-12 shadow-sm border border-black/5 flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="w-full md:w-[360px] h-[400px] relative rounded-2xl overflow-hidden shadow-inner shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-momento-accent font-display text-8xl leading-[0.5] mb-6 block">&ldquo;</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-[32px] font-medium leading-[1.2] tracking-[-0.02em] text-black mb-8">
                  {item.quote}
                </h3>
                <div>
                  <p className="font-display text-xl text-black">{item.name}</p>
                  <p className="text-momento-dark font-medium mt-1">{item.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
              {t.testimonials.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === active ? "bg-momento-dark scale-110" : "bg-black/15 hover:bg-black/30"}`}
                />
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
