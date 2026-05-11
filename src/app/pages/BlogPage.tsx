import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Blog } from '@/app/components/Blog';
import { ContactForm } from '@/app/components/ContactForm';
import { useTranslation } from 'react-i18next';

export const BlogPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500">
      <Navbar />
      
      <div className="pt-32 pb-16 border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-serif text-black dark:text-white mb-6">
            {t('blog.title')}
          </h1>
          <p className="text-black/60 dark:text-white/60 uppercase tracking-widest text-sm">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>

      <Blog hideHeader={true} disableMobileLimit={true} />

      <ContactForm />
      
      <Footer />
    </div>
  );
};
