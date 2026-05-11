import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ArrowUpRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { blogPosts, LocalizedString } from '@/app/data/blogPosts';
import { useAdminContent } from '@/app/context/AdminContentContext';

interface BlogProps {
  limit?: number;
  hideHeader?: boolean;
  disableMobileLimit?: boolean;
}

export const Blog = ({ limit, hideHeader, disableMobileLimit }: BlogProps) => {
  const { t, i18n } = useTranslation();
  const { adminContent } = useAdminContent();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Helper to get localized content
  const getLocalized = (content: LocalizedString) => {
    const lang = i18n.language.split('-')[0] as keyof LocalizedString;
    return content[lang] || content['en'];
  };

  // Merge original hardcoded posts + admin-managed posts, sort by date
  const allPosts = [...blogPosts, ...(adminContent.blogPosts || [])];
  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit || allPosts.length);

  // On mobile, show only top 3 posts to save space, unless disabled
  const displayPosts = (isMobile && !disableMobileLimit) ? sortedPosts.slice(0, 3) : sortedPosts;

  return (
    <section id="blog" className="bg-white dark:bg-[#050505] py-32 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {!hideHeader && (
          <div className="flex justify-between items-end mb-16 pt-12">
            <h2 className="text-4xl md:text-6xl font-serif text-black dark:text-white">{t('blog.title')}</h2>
            <Link to="/blog" className="hidden md:block text-gray-500 text-xs uppercase tracking-widest hover:text-[#d4af37]">{t('blog.read_more')}</Link>
          </div>
        )}

        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
          <Masonry gutter="2rem">
            {displayPosts.map((post, index) => {
              // Create a fixed layout pattern: Tall, Short, Tall, Short...
              // This ensures perfectly aligned columns in a 3-column layout
              // Col 1: Tall + Short
              // Col 2: Short + Tall
              // Col 3: Tall + Short
              const isTall = index % 2 === 0;
              
              return (
                <Link to={`/blog/${post.id}`} key={post.id} className="group cursor-pointer block">
                  <div className="relative border border-black/10 dark:border-white/10 p-2 transition-colors hover:border-black/40 dark:hover:border-white/40 mb-8">
                    <div className={`overflow-hidden relative ${isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                      <img 
                        src={post.image} 
                        alt={getLocalized(post.title)} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      
                      {/* Video Indicator */}
                      {post.video && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50">
                            <Play size={20} className="text-white ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}

                      <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                    
                    <div className="pt-6 pb-2 px-2">
                      <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">{getLocalized(post.category)}</span>
                      <h3 className="text-black dark:text-white text-2xl font-serif leading-tight group-hover:underline underline-offset-4 decoration-1 decoration-black/30 dark:decoration-white/30">
                        {getLocalized(post.title)}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
        
        {/* Mobile View All Button */}
        {!hideHeader && (
          <div className="mt-12 text-center md:hidden">
              <Link to="/blog" className="text-black dark:text-white text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1">
                  {t('blog.read_more')}
              </Link>
          </div>
        )}
      </div>
    </section>
  );
};
