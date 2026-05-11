import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Real student images
import img1 from 'figma:asset/f499eb62d048785a2619bea32d84ae5590777c9a.png';
import img2 from 'figma:asset/899ac6259f8a5facbd97db994dd8d9f19ef96dc7.png';
import img3 from 'figma:asset/4952357cace1aebbd97f41d5ac051360e783a4a0.png';
import img4 from 'figma:asset/07205379ccfee6fd50f196a00b83fa4aeb108daa.png';
import img5 from 'figma:asset/ff4104f9d0dacce55b555ab0ae1f8cf2cb81ac42.png';
import img6 from 'figma:asset/3d879f3a62e942f79dcd338df316721297c96370.png';
import img7 from 'figma:asset/b06823f0b1b05775d3c9cc39ea1140b4a988b0f6.png';
import img8 from 'figma:asset/2847c7f8af621586a1662f9b6706938d1f7f9f4a.png';
import img9 from 'figma:asset/a1c1788611d28c3b09d2717382354c2d27d7a2e1.png';
import img10 from 'figma:asset/0e7c3845b31c3e472341ab5fa1e46a9a62b06671.png';
// Newest batch
import img11 from 'figma:asset/a89d1dc4bf7e886543bbca7f09c6e7bf4192f4cb.png';
import img12 from 'figma:asset/801f7147a5b9cf917f902234803df0281f22b43d.png';
import img13 from 'figma:asset/ebd7494d2ea9fc8ee8b17fdf82c93a961f557d68.png';

interface StudentGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

// Only unique images
const studentImages = [
  img12, img3, img8, img11, img5, 
  img9, img13, img7, img1, img10, 
  img4, img2, img6
];

export const StudentGallery = ({ isOpen, onClose }: StudentGalleryProps) => {
  const { t } = useTranslation();
  const [columns, setColumns] = useState(1);

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

  // Distribute images into columns
  const columnImages = Array.from({ length: columns }, (_, i) => 
    studentImages.filter((_, index) => index % columns === i)
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
