import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { FavoritesProvider } from '@/app/context/FavoritesContext';
import { AdminContentProvider } from '@/app/context/AdminContentContext';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { SocialProof } from '@/app/components/SocialProof';
import { About } from '@/app/components/About';
import { Academy } from '@/app/components/Academy';
import { Services } from '@/app/components/Services';
import { Shop } from '@/app/components/Shop';
import { Blog } from '@/app/components/Blog';
import { InstagramFeed } from '@/app/components/InstagramFeed';
import { ContactForm } from '@/app/components/ContactForm';
import { Footer } from '@/app/components/Footer';
import { WhatsAppButton } from '@/app/components/WhatsAppButton';
import { LegalModal } from '@/app/components/LegalModal';
import { BlogPage } from '@/app/pages/BlogPage';
import { BlogPostPage } from '@/app/pages/BlogPostPage';
import { AdminPage } from '@/app/pages/AdminPage';
import { Loader } from '@/app/components/Loader';
import '@/i18n';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <SocialProof />
    <About />
    <Academy />
    <Services />
    <Shop />
    <Blog limit={6} />
    <InstagramFeed />
    <ContactForm />
    <Footer />
    <WhatsAppButton />
    <LegalModal />
  </>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for fonts/images)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AdminContentProvider>
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" />
            ) : (
              <Router>
                <div className="bg-white dark:bg-[#050505] min-h-screen text-black dark:text-white selection:bg-[#d4af37] selection:text-black transition-colors duration-500">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </div>
              </Router>
            )}
          </AnimatePresence>
        </AdminContentProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
