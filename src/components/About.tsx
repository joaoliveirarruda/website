"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-[128px] px-[5vw]" id="sobre">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        
        {/* Bloco 1: Texto + Imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Coluna Esquerda: Textos */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center py-10 lg:pr-10"
          >
            <span className="text-momento-accent font-bold mb-4 text-base uppercase tracking-wider">
              {t.about.badge}
            </span>
            <h2 className="font-display font-medium text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.03em] text-black mb-8">
              {t.about.title1}
            </h2>
            <div className="flex flex-col gap-6 text-[17px] text-neutral-800 leading-relaxed max-w-[95%]">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </motion.article>

          {/* Coluna Direita: Imagem Gigante */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="min-h-[300px] lg:min-h-[400px] rounded-[32px] overflow-hidden relative"
          >
            <Image 
              src="/assets/hero-fig.png" 
              alt="Momento Mentorship" 
              fill 
              className="object-cover" 
            />
          </motion.article>

        </div>

        {/* Bloco 2: 3 Cards de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Stat 1 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-momento-lightest rounded-[32px] p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <p className="font-display text-[56px] lg:text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
              {t.about.stat1Number}
            </p>
            <p className="text-neutral-600 text-lg">{t.about.stat1Label}</p>
          </motion.article>

          {/* Card Stat 2 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-momento-lightest rounded-[32px] p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <p className="font-display text-[56px] lg:text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
              {t.about.stat2Number}
            </p>
            <p className="text-neutral-600 text-lg">{t.about.stat2Label}</p>
          </motion.article>

          {/* Card Stat 3 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-momento-lightest rounded-[32px] p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <p className="font-display text-[56px] lg:text-[64px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4">
              {t.about.stat3Number}
            </p>
            <p className="text-neutral-600 text-lg">{t.about.stat3Label}</p>
          </motion.article>

        </div>
      </div>
    </section>
  );
}
