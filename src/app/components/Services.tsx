import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import custom images
import classicMakeupImg from "figma:asset/8d4a3bd67ac9e1b47b5686675a910be734d46f48.png";
import specialOccasionImg from "figma:asset/d2a684d0577f03fefde55f5505b7d71eba5713df.png";
import classicHairImg from "figma:asset/b47f5641b2ec062a35c7111aa47a9b7fb53a011c.png";
import hairWavesImg from "figma:asset/4c068c9ff6931a40f67147263f0a53312afebb64.png";
import specialHairImg from "figma:asset/e1d5bc7bd440bf7be3893e1d3f505042d69b4ead.png";
import hijabStylingImg from "figma:asset/213a1f938c6082e15c3e4c537a1d5193fe6f4de4.png";
import priceListImg from "figma:asset/eb1165e7903e4d9a7fafceb6855c6b2cc211f2e4.png";
import logoOverlay from "figma:asset/350a15eb137bc36685590f4ef187dc66e3f1cde7.png";

export const Services = () => {
  const { t, i18n } = useTranslation();
  const sliderRef = useRef<Slider>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [priceListOpen, setPriceListOpen] = useState(false);
  const [currentServiceIndex, setServiceIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 850) return 1;
      if (window.innerWidth < 1100) return 2;
    }
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 850) {
        setSlidesToShow(1);
      } else if (width < 1100) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      name: t('services.makeup_classic'),
      price: "3500 din",
      image: classicMakeupImg,
      gallery: [classicMakeupImg]
    },
    {
      name: t('services.makeup_special'),
      price: "6000 din",
      image: specialOccasionImg,
      gallery: [specialOccasionImg]
    },
    {
      name: t('services.hijab_styling'),
      price: "3000 din",
      image: hijabStylingImg,
      gallery: [hijabStylingImg]
    },
    {
      name: t('services.hair_classic'),
      price: "1000 - 2000 din",
      image: classicHairImg,
      gallery: [classicHairImg]
    },
    {
      name: t('services.hair_special'),
      price: "2000 - 5000 din",
      image: specialHairImg,
      gallery: [specialHairImg]
    },
    {
      name: t('services.hair_waves'),
      price: "1000 - 2500 din",
      image: hairWavesImg,
      gallery: [hairWavesImg]
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,
    adaptiveHeight: false,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)"
  };

  const handleWhatsApp = (serviceName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSr = i18n.language.startsWith('sr');
    const text = isSr
      ? `Zdravo Ana, zainteresovana sam za uslugu: ${serviceName}. Možete li mi reći više?`
      : `Hello Ana, I am interested in your ${serviceName} service. Could you tell me more?`;
    
    window.open(`https://wa.me/38169602602?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOpenLightbox = (index: number) => {
    setServiceIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="services" className="bg-white dark:bg-[#050505] py-24 md:py-32 border-b border-black/10 dark:border-white/10 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="mb-20 border-l-2 border-[#d4af37] pl-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-black/50 dark:text-white/50 uppercase tracking-widest text-xs font-bold block mb-2">{t('services.menu')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white">{t('services.title')}</h2>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setPriceListOpen(true)}
              className="px-6 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold h-12 flex items-center justify-center"
            >
              {t('services.price_list')}
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-12 h-12 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white flex items-center justify-center text-black dark:text-white transition-all"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="w-12 h-12 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white flex items-center justify-center text-black dark:text-white transition-all"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-[-12px]"> 
          <Slider key={slidesToShow} ref={sliderRef} {...settings} className="services-slider">
            {services.map((service, index) => (
              <div key={index} className="px-3 md:px-6 py-4">
                <div 
                  className="group relative cursor-pointer" 
                  onClick={() => handleOpenLightbox(index)}
                >
                  <div className="aspect-[3/4] overflow-hidden border border-black/10 dark:border-white/10 relative">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover animate-reveal-color"
                    />
                    <div className="absolute inset-4 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      {t('services.gallery_label')}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                      <img src={logoOverlay} alt="Ana Backstage" className="h-28 w-auto object-contain" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col border-b border-black/10 dark:border-white/10 pb-4 group-hover:border-[#d4af37] transition-colors gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-serif text-black dark:text-white group-hover:text-[#d4af37] transition-colors min-h-[3rem]">{service.name}</h3>
                      <p className="text-[#d4af37] font-medium text-lg mt-1">{service.price}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => handleWhatsApp(service.name, e)}
                      className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/20 dark:border-white/20 px-4 py-3 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all text-black dark:text-white"
                    >
                      <span>{t('services.book_btn')}</span>
                      <MessageCircle size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={services[currentServiceIndex].gallery.map(src => ({ src }))}
      />

      <Lightbox
        open={priceListOpen}
        close={() => setPriceListOpen(false)}
        slides={[{ src: priceListImg }]}
      />
      
      <style>{`
        @keyframes reveal-color {
          0% { filter: grayscale(100%); transform: scale(1.1); }
          100% { filter: grayscale(0%); transform: scale(1); }
        }
        .animate-reveal-color {
          animation: reveal-color 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .services-slider .slick-dots {
          bottom: -40px;
        }
        .services-slider .slick-dots li button:before {
          font-size: 8px;
          color: gray;
          opacity: 0.5;
        }
        .services-slider .slick-dots li.slick-active button:before {
          color: #d4af37;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
