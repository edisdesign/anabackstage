import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { products } from '@/app/data/products';
import { ShopGallery } from '@/app/components/ShopGallery';

export const Shop = () => {
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState(1);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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

  // Show only first 6 products
  const displayProducts = products.slice(0, 6);

  // Distribute products into columns
  const columnProducts = Array.from({ length: columns }, (_, i) => 
    displayProducts.filter((_, index) => index % columns === i)
  );

  const handleWhatsApp = (productName: string) => {
    const isSr = i18n.language.startsWith('sr');
    const text = isSr
      ? `Zdravo Ana, zainteresovana sam za proizvod: ${productName}. Možete li mi reći cenu i više detalja?`
      : `Hello Ana, I am interested in your product: ${productName}. Could you tell me the price and more details?`;
    
    window.open(`https://wa.me/38169602602?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="shop" className="bg-white dark:bg-[#050505] py-[64px] border-b border-black/10 dark:border-white/10 transition-colors duration-500 px-[0px]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-black/10 dark:border-white/10 pb-6">
          <h2 className="text-4xl font-serif text-black dark:text-white">{t('shop.title')}</h2>
          <div className="flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-widest font-bold">
            {t('shop.subtitle')}
          </div>
        </div>

        <div className="flex gap-8 justify-center items-start mb-16">
          {columnProducts.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 space-y-8 flex flex-col">
              {col.map((product, index) => {
                // Calculate global index
                const globalIndex = index * columns + colIndex;
                // Alternate aspect ratios for collage effect
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
                        
                        {/* Overlay for better text visibility if needed, or just hover effect */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        {/* Hover Overlay Button */}
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

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsGalleryOpen(true)}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black uppercase text-xs font-bold tracking-widest hover:bg-[#d4af37] dark:hover:bg-[#d4af37] transition-colors flex items-center gap-2"
          >
            <span>{t('shop.view_all')}</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>

      <ShopGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </section>
  );
};
