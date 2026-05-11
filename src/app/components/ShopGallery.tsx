import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '@/app/data/products';

interface ShopGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopGallery = ({ isOpen, onClose }: ShopGalleryProps) => {
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1100) setColumns(3);
      else if (window.innerWidth >= 850) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute products into columns
  const columnProducts = Array.from({ length: columns }, (_, i) => 
    products.filter((_, index) => index % columns === i)
  );

  const handleWhatsApp = (productName: string) => {
    const isSr = i18n.language.startsWith('sr');
    const text = isSr
      ? `Zdravo Ana, zainteresovana sam za proizvod: ${productName}. Možete li mi reći cenu i više detalja?`
      : `Hello Ana, I am interested in your product: ${productName}. Could you tell me the price and more details?`;
    
    window.open(`https://wa.me/38169602602?text=${encodeURIComponent(text)}`, '_blank');
  };

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
                {t('shop.gallery_title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {t('shop.gallery_desc')}
              </p>
            </motion.div>

            <div className="flex gap-8 justify-center items-start">
              {columnProducts.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 space-y-8 flex flex-col">
                  {col.map((product, index) => {
                    // Calculate global index
                    const globalIndex = index * columns + colIndex;
                    const isTall = globalIndex % 2 === 0;

                    return (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                        onClick={() => handleWhatsApp(product.name)}
                      >
                        {/* The "Thin Ultra Modern Frame" */}
                        <div className="border border-black/10 dark:border-white/10 p-2 transition-all duration-500 group-hover:border-[#d4af37] dark:group-hover:border-[#d4af37]">
                          
                          <div className={`relative overflow-hidden ${isTall ? 'aspect-[3/4]' : 'aspect-[1/1]'}`}>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-all duration-700"
                            />
                            
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 dark:bg-black/90 text-black dark:text-white px-6 py-3 flex items-center gap-2 uppercase text-xs tracking-widest font-bold backdrop-blur-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                 <MessageCircle size={14} />
                                 <span>{t('shop.inquire_btn')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 pb-2 px-2 flex justify-between items-end">
                            <div>
                              <h3 className="text-lg font-serif text-black dark:text-white leading-tight mb-1">{product.name}</h3>
                              <p className="text-[#d4af37] text-xs uppercase tracking-widest font-bold opacity-60">
                                {t('shop.on_request')}
                              </p>
                            </div>
                          </div>

                        </div>
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
                 {t('shop.close')}
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
