import React from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

export const SocialProof = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-black border-y border-black/10 dark:border-white/20 py-0 transition-colors duration-500">
      <div className="flex">
        <div className="w-32 md:w-64 bg-black/5 dark:bg-white/5 border-r border-black/10 dark:border-white/20 flex items-center justify-center py-6 z-10 relative px-4">
          <span className="text-[#d4af37] text-xs md:text-sm font-serif italic text-center leading-tight">{t('social.featured')}</span>
        </div>
        <div className="flex-1 overflow-hidden relative flex items-center">
          <Marquee gradient={false} speed={40} className="py-4 md:py-6">
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Al Jazeera</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Prva TV</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">OBN</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Sandzak TV</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">RTV Novi Pazar</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <span className="mx-12 text-lg md:text-xl uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Podcast IslamEDU</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
          </Marquee>
        </div>
      </div>
    </section>
  );
};
