import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import logoImg from 'figma:asset/31186f88f34539b6048c57361bd1b32bea0f6290.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.academy'), href: '/#academy' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.shop'), href: '/#shop' },
    { name: t('nav.blog'), href: '/blog' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b md:-mb-14 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-black/5 dark:border-white/20 py-3 md:py-4' 
            : 'bg-white dark:bg-[#050505] border-black/10 dark:border-white/10 py-3 md:py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" className="relative z-50 group">
            <img 
              src={logoImg} 
              alt="Ana Backstage" 
              className={`transition-all duration-300 ${isScrolled ? 'h-12' : 'h-20'} dark:invert`} 
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-light"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-6 border-l border-black/10 dark:border-white/10 pl-6">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <a 
              href="#contact"
              className="px-8 py-3 border border-black/30 dark:border-white/30 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium"
            >
              {t('nav.book')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <button 
              className="text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden border-l border-black/10 dark:border-white/10 ml-12"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl text-black dark:text-white font-serif italic border-b border-transparent hover:border-[#d4af37] transition-all"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex gap-8 mt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

             <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-12 py-4 border border-black dark:border-white text-black dark:text-white uppercase tracking-widest font-bold"
            >
              {t('nav.book')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
