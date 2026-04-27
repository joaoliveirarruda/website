"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Universities() {
  const { t } = useLanguage();

  return (
    <section id="universidades" className="py-20 px-[5vw] bg-white">
      <div className="max-w-[1440px] mx-auto text-center">
        <h3 className="font-display text-3xl font-bold text-black mb-12">
          {t.universities.title}
        </h3>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {t.universities.items.map((uni) => (
            <div key={uni.name} className="w-24">
              <Image
                src={uni.logo}
                alt={uni.name}
                width={96}
                height={96}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
