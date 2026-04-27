"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Events() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-[128px] px-[5vw]">
      <div className="max-w-[1024px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-4 text-neutral-600 font-medium tracking-wide uppercase"
        >
          {t.events.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[64px] leading-none tracking-[-0.04em] mb-4"
        >
          {t.events.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center text-lg text-neutral-500 mb-16"
        >
          {t.events.subtitle}
        </motion.p>

        {t.events.items.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-momento-cream rounded-[24px] p-8 md:p-12 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 shrink-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="inline-block self-start px-4 py-2 bg-momento-dark/10 rounded-full">
                  <span className="text-momento-dark font-bold text-sm">{event.date}</span>
                </div>

                <h3 className="font-display text-3xl font-medium text-black">
                  {event.title}
                </h3>

                <p className="text-neutral-600 text-lg leading-relaxed">
                  {event.description}
                </p>

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex self-start items-center gap-2 px-6 py-3 bg-momento-dark text-white rounded-full font-medium hover:-translate-y-1 transition-transform shadow-sm"
                >
                  {event.linkText}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
