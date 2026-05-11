import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
// signatureImg removed as it is no longer used
import aboutImage from 'figma:asset/80744b63060f86bb02770557bc3e94c2efc292fa.png';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-white dark:bg-[#050505] py-[50px] border-b border-black/10 dark:border-white/10 relative transition-colors duration-500 px-[0px]">
      {/* Center Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/5 dark:bg-white/5 hidden md:block" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with Frame */}
          <div className="relative p-6 md:p-12 md:border-r border-black/5 dark:border-white/5">
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-black/30 dark:bg-white/30" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-black/30 dark:bg-white/30" />
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] p-2 border border-black/10 dark:border-white/10"
            >
              <motion.img 
                src={aboutImage} 
                alt="Ana working backstage" 
                initial={{ filter: 'grayscale(100%)' }}
                whileInView={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-black/30 dark:bg-white/30" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-black/30 dark:bg-white/30" />
          </div>

          {/* Content Side */}
          <div className="space-y-8 pl-0 md:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[#d4af37] uppercase tracking-[0.3em] text-xs mb-6">{t('about.profession')}</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-8 leading-tight">
                {t('about.headline')} <br />
                <span className="border-b border-black/20 dark:border-white/20 pb-2">{t('about.subheadline')}</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-400 font-light text-sm md:text-base leading-7 mt-[0px] mr-[0px] mb-[24px] ml-[0px]">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
              </div>

              {/* Quote Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-8 border-t border-black/5 dark:border-white/5"
              >
                <div className="relative">
                  
                 
                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#d4af37]" />
                    <span className="text-xs uppercase tracking-widest text-gray-400">Ana Muratović</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
