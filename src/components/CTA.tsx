"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function CTA() {
  const { t } = useLanguage();
  const events = t.events.items;
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-momento-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12 px-[5vw]">
        <div className="max-w-[1440px] mx-auto w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm text-white/50 font-medium tracking-wide uppercase mb-4">
              {t.events.badge}
            </p>
            <h2 className="font-display font-medium text-[clamp(40px,6vw,80px)] leading-none tracking-[-0.04em] text-white">
              {t.events.title}
            </h2>
          </div>
          <p className="text-xl text-white/60 max-w-sm">
            {t.events.subtitle}
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[5vw]">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="group relative h-[400px] md:h-[500px] w-[85vw] sm:w-[400px] lg:w-[600px] shrink-0 overflow-hidden rounded-[32px] bg-momento-deep"
            >
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex flex-col gap-4">
                <div className="inline-block self-start px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                  <span className="text-white font-bold text-sm tracking-wide">{event.date}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-white font-medium mb-3">{event.title}</h3>
                  <p className="text-white/80 line-clamp-2 text-lg mb-6">{event.description}</p>
                </div>
                <div className="overflow-hidden">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start bg-white text-black rounded-full px-6 py-3 text-sm font-bold hover:bg-momento-accent hover:text-white transition-all shadow-sm translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500"
                  >
                    {event.linkText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
