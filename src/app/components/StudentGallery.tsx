import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdminContent } from '@/app/context/AdminContentContext';
import { galImg1, galImg2, galImg3, galImg4, galImg5, galImg6, galImg7, galImg8, galImg9, galImg10, galImg11, galImg12, galImg13 } from '@/app/data/staticImages';

interface StudentGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const staticGalleryImages = [galImg12, galImg3, galImg8, galImg11, galImg5, galImg9, galImg13, galImg7, galImg1, galImg10, galImg4, galImg2, galImg6];

export const StudentGallery = ({ isOpen, onClose }: StudentGalleryProps) => {
  const { t } = useTranslation();
  const { adminContent } = useAdminContent();
  const [columns, setColumns] = useState(1);

  const hiddenIds = adminContent.hiddenGalleryIds || [];
  const visibleStaticImages = staticGalleryImages.filter((_, idx) => !hiddenIds.includes(idx));
  
  // Merge admin-uploaded images with static images (admin first = newest first)
  const allImages = [
    ...(adminContent.galleryImages || []),
    ...visibleStaticImages,
  ];

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(3);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columnImages = Array.from({ length: columns }, (_, i) => 
    allImages.filter((_, index) => index % columns === i)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 dark:bg-black/95 overflow-y-auto backdrop-blur-sm"
        >
          <div className="min-h-screen container mx-auto px-4 py-20 relative">
            <button
              onClick={onClose}
              className="fixed top-8 right-8 p-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:scale-110 transition-transform z-50"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-16 max-w-2xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-black dark:text-white">
                {t('academy.gallery_title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {t('academy.gallery_desc')}
              </p>
            </motion.div>

            <div className="flex gap-8 justify-center items-start">
              {columnImages.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 space-y-8 flex flex-col">
                  {col.map((src, imgIndex) => {
                    // Calculate global index for staggering
                    const globalIndex = imgIndex * columns + colIndex;
                    return (
                      <motion.div
                        key={`${colIndex}-${imgIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: globalIndex * 0.1 }}
                        className="relative overflow-hidden"
                      >
                        <motion.img
                          src={src}
                          alt={`Student work`}
                          initial={{ filter: 'grayscale(100%)' }}
                          animate={{ filter: 'grayscale(0%)' }}
                          transition={{ 
                            duration: 2,
                            delay: 0.5 + (globalIndex * 0.2),
                            ease: "easeOut"
                          }}
                          className="w-full h-auto object-cover block"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-20">
               <button 
                 onClick={onClose}
                 className="px-8 py-3 border border-black dark:border-white text-black dark:text-white uppercase text-xs tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
               >
                 {t('academy.close_gallery')}
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
