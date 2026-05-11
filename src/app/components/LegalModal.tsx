import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LegalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'privacy' | 'impresum'>('privacy');
  const { t } = useTranslation();

  useEffect(() => {
    const handleOpen = (e: any) => {
      setType(e.detail);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('open-legal', handleOpen);
    return () => window.removeEventListener('open-legal', handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative bg-white dark:bg-[#111] w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-none border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-2xl">
        <button 
          onClick={close}
          className="absolute top-6 right-6 text-black dark:text-white hover:text-[#d4af37] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {type === 'privacy' ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-[#d4af37] mb-8 uppercase tracking-widest">{t('legal.privacy.title')}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t('legal.privacy.updated')}</p>
              
              <section>
                <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.privacy.section1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('legal.privacy.section1.content')}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.privacy.section2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('legal.privacy.section2.content')}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.privacy.section3.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('legal.privacy.section3.content')}
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-[#d4af37] mb-8 uppercase tracking-widest">{t('legal.impresum.title')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                  <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.impresum.owner_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Back Stage by Ana Muratović</strong><br />
                    Igmanska 3<br />
                    36300 Novi Pazar, Serbia
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.impresum.contact_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: Taiba87@gmail.com<br />
                    Telefon: +381 69 602 602
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.impresum.design_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Design by: Edis Muminović<br />
                    Email: edis.design@outlook.com
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-serif text-black dark:text-white mb-4">{t('legal.impresum.liability_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {t('legal.impresum.liability_content')}
                  </p>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};