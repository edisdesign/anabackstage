import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdminContent } from '@/app/context/AdminContentContext';

// New hero images from Ana's request (same background series)
import imgHeroNew1 from 'figma:asset/c02797b619e3a1b9d4d2ed2317f5f1cff237bc8f.png';
import imgHeroNew2 from 'figma:asset/98fc163c88dd1f52266b8afe7c777ca2e8a5ad03.png';
import imgHeroNew3 from 'figma:asset/639df58608f8a8d0263a3c6885cdd951f201795d.png';

// Retaining one existing image (assuming the cleanest one without logo)
import imgHeroLegacy from 'figma:asset/913cea61dd5b253eece2b7692bb454b9494f798e.png';

const heroImages = [
  imgHeroNew1,
  imgHeroNew2,
  imgHeroNew3,
  imgHeroLegacy
];

export const Hero = () => {
  const { t } = useTranslation();
  const { adminContent } = useAdminContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use admin images if available, otherwise fall back to Figma images
  const adminImages = adminContent.hero.images.filter(Boolean);
  const displayImages = adminImages.length > 0 ? adminImages : heroImages;
  const adminHero = adminContent.hero;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <section className="relative min-h-screen md:h-screen max-h-[1050px] w-full bg-white dark:bg-[#050505] flex items-center pt-8 md:pt-32 transition-colors duration-500 pr-[0px] pb-[0px] pl-[0px] p-[0px]">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-6 md:left-24 top-0 bottom-0 w-[1px] bg-black/5 dark:bg-white/10" />
        <div className="absolute right-6 md:right-24 top-0 bottom-0 w-[1px] bg-black/5 dark:bg-white/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full mt-[0px] mb-[20px] pt-[0px] pb-[20px]">
        <div className="relative flex flex-col md:flex-row items-stretch min-h-[80vh] md:min-h-0 md:h-[80vh] md:max-h-[850px] border border-black/10 dark:border-white/10">
          
          {/* Certificate Style Inner Frame */}
          <div className="absolute -inset-4 border border-black/5 dark:border-white/5 pointer-events-none z-0" />
          <div className="hidden md:block absolute -top-4 -left-4 w-[100px] h-[100px] border-t border-l border-black dark:border-white z-20 opacity-70" />
          <div className="hidden md:block absolute -top-4 -right-4 w-[100px] h-[100px] border-t border-r border-black dark:border-white z-20 opacity-70" />
          <div className="hidden md:block absolute -bottom-4 -left-4 w-[100px] h-[100px] border-b border-l border-black dark:border-white z-20 opacity-70" />
          <div className="hidden md:block absolute -bottom-4 -right-4 w-[100px] h-[100px] border-b border-r border-black dark:border-white z-20 opacity-70" />

          {/* Text Content - Left Panel */}
          <div className="w-full md:w-1/2 flex-1 flex flex-col justify-center border border-black/10 dark:border-white/10 md:border-y-0 md:border-l-0 relative p-4 md:px-[96px] md:py-[36px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hidden md:flex items-center gap-4 mb-2 md:mb-4">
                <div className="h-[1px] w-12 bg-black/50 dark:bg-white/50" />
                <span className="text-black/60 dark:text-white/60 uppercase tracking-[0.3em] text-xs">
                  {adminHero.subtitle || t('hero.subtitle')}
                </span>
              </div>
              
              <h1 className="text-[8vw] md:text-[min(5vw,80px)] font-serif text-black dark:text-white leading-tight mb-4 md:mb-8 min-h-[2.5em]">
                {adminHero.title || t('hero.title')} <br/>
                <span className="italic font-light text-[#d4af37]">{adminHero.beauty || t('hero.beauty')}</span>
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed max-w-md mb-4 border-l border-black/20 dark:border-white/20 pl-6">
                {adminHero.description || t('hero.description')}
              </p>

              {/* Mobile Image */}
              <div className="block md:hidden mb-4 w-full aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <motion.img 
                  key={currentIndex}
                  src={displayImages[currentIndex]} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col md:flex-row w-full gap-4 mt-4">
                <a 
                  href="#contact" 
                  className="w-full md:w-auto px-10 py-4 bg-black dark:bg-white text-white dark:text-black uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] dark:hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-3"
                >
                  {t('hero.cta_primary')} <ArrowRight size={14} />
                </a>
                <a 
                  href="#academy" 
                  className="w-full md:w-auto px-10 py-4 border border-black/20 dark:border-white/20 text-black dark:text-white uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center"
                >
                  {t('hero.cta_secondary')}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Image - Right Panel */}
          <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden group bg-gray-100 dark:bg-[#111]">
            <div className="absolute inset-0 m-4 md:m-8 border border-black/5 dark:border-white/5 z-20 pointer-events-none" /> {/* Inner Frame */}
            
            <div className="absolute inset-4 md:inset-8 overflow-hidden bg-gray-200 dark:bg-gray-800">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img 
                  key={currentIndex}
                  src={displayImages[currentIndex]} 
                  alt="Ana Make Up" 
                  initial={{ x: '100%', filter: 'grayscale(100%)' }}
                  animate={{ x: 0, filter: 'grayscale(0%)' }}
                  exit={{ x: '-100%', filter: 'grayscale(100%)' }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-black dark:border-white z-30" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-black dark:border-white z-30" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-black dark:border-white z-30" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-black dark:border-white z-30" />
            
            {/* Slide Indicator */}
            <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-2">
               {displayImages.map((_, idx) => (
                 <div 
                   key={idx} 
                   className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#d4af37]' : 'w-2 bg-black/20 dark:bg-white/20'}`}
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
