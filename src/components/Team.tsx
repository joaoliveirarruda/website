"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Team() {
  const { t } = useLanguage();
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  return (
    <section className="px-[5vw] py-20 lg:py-28" id="time">
      <div className="max-w-[1440px] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-6 text-momento-accent font-medium uppercase tracking-wide"
        >
          {t.team.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[42px] md:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.04em] mb-16 md:mb-20"
        >
          {t.team.title1}<br />{t.team.title2}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {t.team.members.map((member, idx) => {
            const hasLink = Boolean(member.link);
            const Tag = hasLink ? motion.a : motion.div;

            return (
              <Tag
                key={idx}
                {...(hasLink
                  ? { href: member.link, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * (idx % 5) }}
                className="group relative flex flex-col rounded-[24px] overflow-hidden border border-momento-light bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-momento-accent"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-momento-light">
                  {!failed[idx] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[.35] saturate-[.85] transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105"
                      onError={() => setFailed((f) => ({ ...f, [idx]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-4xl font-medium text-momento-dark/60 select-none">
                      {initials(member.name)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-momento-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {hasLink && (
                    <span className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-momento-light text-momento-dark text-sm opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      ↗
                    </span>
                  )}
                </div>

                <div className="p-4 border-t border-momento-light">
                  <p className="font-display text-[17px] font-medium leading-tight text-black">
                    {member.name}
                  </p>
                  <p className="mt-1 text-momento-brand text-xs font-medium uppercase tracking-wide">
                    {member.role}
                  </p>
                  {member.company && (
                    <p className="mt-0.5 text-neutral-500 text-xs">{member.company}</p>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
