import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdminContent } from '@/app/context/AdminContentContext';
import certificateImg from 'figma:asset/1c503511c89d045ac59026022b58cbca9b639121.png';
import { StudentGallery } from '@/app/components/StudentGallery';

export const Academy = () => {
  const { t, i18n } = useTranslation();
  const { adminContent } = useAdminContent();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const lang = i18n.language.split('-')[0] as 'sr' | 'en' | 'de';
  const getLocalized = (ls: any) => ls?.[lang] || ls?.sr;

  const baseCourses = [
    {
      id: 'self_makeup',
      title: t('academy.courses.self_makeup.title'),
      duration: t('academy.courses.self_makeup.duration'),
      description: t('academy.courses.self_makeup.description')
    },
    {
      id: 'basic',
      title: t('academy.courses.basic.title'),
      duration: t('academy.courses.basic.duration'),
      description: t('academy.courses.basic.description')
    },
    {
      id: 'pro',
      title: t('academy.courses.pro.title'),
      duration: t('academy.courses.pro.duration'),
      description: t('academy.courses.pro.description')
    }
  ];

  const adminCoursesMap = new Map((adminContent.academyCourses || []).map(c => [c.id, c]));

  const mergedCourses = baseCourses.map(base => {
    const override = adminCoursesMap.get(base.id);
    if (!override) return base;
    return {
      id: base.id,
      title: getLocalized(override.title) || base.title,
      duration: getLocalized(override.duration) || base.duration,
      description: getLocalized(override.description) || base.description,
    };
  });

  const customCourses = (adminContent.academyCourses || [])
    .filter(c => !baseCourses.some(b => b.id === c.id))
    .map(c => ({
      id: c.id,
      title: getLocalized(c.title),
      duration: getLocalized(c.duration),
      description: getLocalized(c.description),
    }));

  const courses = [...mergedCourses, ...customCourses];

  const handleEnroll = (courseTitle: string) => {
    const phoneNumber = "38169602602";
    const message = t('academy.courses.whatsapp_message', { courseName: courseTitle });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="academy" className="bg-white dark:bg-black py-[44px] border-b border-black/10 dark:border-white/10 transition-colors duration-500 px-[0px]">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-24 relative">
          <span className="absolute top-1/2 left-0 w-1/3 h-[1px] bg-black/10 dark:bg-white/10 hidden md:block" />
          <span className="absolute top-1/2 right-0 w-1/3 h-[1px] bg-black/10 dark:bg-white/10 hidden md:block" />
          <h2 className="text-5xl md:text-6xl font-serif text-black dark:text-white inline-block bg-white dark:bg-black px-8 relative z-10 transition-colors">{t('academy.title')}</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs mt-4">{t('academy.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors duration-500 bg-gray-50 dark:bg-[#080808] relative flex flex-col"
            >
              {/* Decorative Corners */}
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-[1px] -right-[1px] w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 md:p-10 flex flex-col h-full">
                <div className="mb-6">
                  <span className="inline-block border border-black/30 dark:border-white/30 px-3 py-1 text-[10px] uppercase tracking-wider text-black/70 dark:text-white/70 mb-4">
                    {course.duration}
                  </span>
                  <h3 className="text-2xl font-serif text-black dark:text-white leading-tight">{course.title}</h3>
                </div>
                
                <div className="space-y-4 border-t border-black/10 dark:border-white/10 pt-6 flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#d4af37]">
                    <Plus size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Program Majstorstva</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleEnroll(course.title)}
                  className="w-full mt-8 py-4 bg-black dark:bg-white text-white dark:text-black uppercase text-xs font-bold tracking-widest hover:bg-[#d4af37] dark:hover:bg-[#d4af37] transition-colors"
                >
                  {t('academy.enroll')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Display */}
        <div className="border border-[#d4af37]/30 p-2 md:p-4 bg-gray-50 dark:bg-[#0a0a0a] relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-black px-4 text-[#d4af37] uppercase tracking-[0.2em] text-xs border border-[#d4af37]/30 py-1">
            {t('academy.subtitle')}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 border border-black/5 dark:border-white/5">
            <div>
              <h3 className="text-2xl font-serif text-black dark:text-white mb-4">{t('academy.certificate_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {t('academy.certificate_desc')}
              </p>
              <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37] to-transparent mb-2" />
              <div className="h-[1px] w-2/3 bg-gradient-to-r from-[#d4af37] to-transparent" />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsGalleryOpen(true)}
                className="mt-8 px-8 py-3 bg-black dark:bg-white text-white dark:text-black uppercase text-xs font-bold tracking-widest hover:bg-[#d4af37] dark:hover:bg-[#d4af37] transition-colors"
              >
                {t('academy.view_student_works')}
              </motion.button>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative shadow-2xl"
            >
              <div className="absolute inset-0 border border-black/20 dark:border-white/20 translate-x-2 translate-y-2" />
              <img src={certificateImg} alt="Ana Backstage Certificate" className="relative z-10 w-full h-auto" />
            </motion.div>
          </div>
        </div>

      </div>
      <StudentGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </section>
  );
};
