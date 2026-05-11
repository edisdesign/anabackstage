import React from 'react';
import { Instagram, Heart, MessageCircle, Send, Bookmark, Play, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import classicMakeupImg from "figma:asset/8d4a3bd67ac9e1b47b5686675a910be734d46f48.png";
import newInstaImage from "figma:asset/eb0db58679b29cfbfa9f4e1d889c52b9ef76d32d.png";
import profilePic from "figma:asset/350a15eb137bc36685590f4ef187dc66e3f1cde7.png";

export const InstagramFeed = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-[#050505] py-24 md:py-32 border-b border-black/10 dark:border-white/10 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Mockup Section - Enhanced with Double Card & Floating Elements */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-2 md:order-1 relative">
            
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-yellow-500/10 blur-3xl rounded-full opacity-0 md:opacity-100 pointer-events-none"></div>

            <div className="relative w-[320px] md:w-[380px] h-[500px] md:h-[600px] flex items-center justify-center">
                
                {/* Back Card (Static/Previous Post) */}
                <div className="absolute top-0 left-4 w-full h-auto bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl transform -rotate-6 scale-95 opacity-60 md:opacity-80 transition-all duration-500 hover:rotate-[-8deg] hover:translate-x-[-10px] z-0">
                    <div className="aspect-[4/5] bg-gray-100 relative">
                        <img src={classicMakeupImg} alt="Previous Look" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 bg-white dark:bg-black">
                        <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
                        <div className="h-2 w-32 bg-gray-100 dark:bg-white/5 rounded"></div>
                    </div>
                </div>

                {/* Front Card (Active Post) */}
                <div className="absolute top-8 right-4 w-full bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transform rotate-3 transition-all duration-500 hover:rotate-6 hover:translate-y-[-5px] hover:shadow-3xl z-10">
                    {/* Status Bar Mock */}
                    <div className="h-1 bg-gray-100 dark:bg-white/5 mx-auto w-1/3 rounded-b-lg mb-2"></div>
                    
                    {/* IG Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black/5 overflow-hidden border border-black/10 p-0.5">
                            <img src={profilePic} alt="Profile" className="w-full h-full object-contain rounded-full bg-black" />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-black dark:text-white block">ana_make_up_backstage</span>
                        </div>
                        </div>
                        <MoreHorizontal size={16} className="text-black dark:text-white" />
                    </div>
                    
                    {/* IG Image */}
                    <div className="relative aspect-[4/5] bg-gray-100">
                        <img src={newInstaImage} alt="Makeup" className="w-full h-full object-cover" />
                        <a 
                        href="https://www.instagram.com/ana_make_up_backstage/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/10 flex items-center justify-center group cursor-pointer"
                        >
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-lg">
                            <Play size={28} className="text-white fill-white ml-1" />
                        </div>
                        </a>
                    </div>
                    
                    {/* IG Actions */}
                    <div className="p-4">
                        <div className="flex justify-between mb-3">
                        <div className="flex gap-4">
                            <Heart size={22} className="text-black dark:text-white hover:text-red-500 transition-colors cursor-pointer" />
                            <MessageCircle size={22} className="text-black dark:text-white cursor-pointer" />
                            <Send size={22} className="text-black dark:text-white cursor-pointer" />
                        </div>
                        <Bookmark size={22} className="text-black dark:text-white cursor-pointer" />
                        </div>
                        <div className="text-sm font-semibold text-black dark:text-white mb-1">1,245 {t('instagram.likes')}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">{t('instagram.view_comments')}</div>
                    </div>
                </div>

                {/* Floating Notification Bubbles */}
                
                {/* Comment 1 - Bottom Left */}
                <div className="absolute bottom-12 -left-4 md:-left-12 bg-white dark:bg-[#111] p-3 md:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 animate-bounce-slow z-20 max-w-[180px] md:max-w-[200px]">
                    <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 italic">"{t('instagram.comments.c1')}"</p>
                </div>
                
                {/* Comment 3 - Middle Left (Floating) */}
                <div className="absolute top-1/3 -left-8 md:-left-16 bg-white dark:bg-[#111] p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 animate-float-delayed z-20 max-w-[160px] hidden md:block">
                    <p className="text-[10px] text-gray-600 dark:text-gray-300 italic">"{t('instagram.comments.c3')}"</p>
                </div>

            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 z-10">
            
            {/* Header from Figma */}
            <div className="flex flex-col items-center md:items-start gap-4 mb-8">
                <div className="relative shrink-0 size-[32px]">
                     <Instagram size={32} strokeWidth={2.5} className="text-black dark:text-white" />
                </div>
                <h2 className="font-serif text-[30px] leading-[36px] text-black dark:text-white font-normal">
                    @ana_make_up_backstage
                </h2>
                <a 
                    href="https://www.instagram.com/ana_make_up_backstage/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-sans font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#d4af37] hover:underline"
                >
                    {t('instagram.follow_link')}
                </a>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white mb-8">
              {t('instagram.title')}
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
                <p>
                    {t('instagram.p1')}
                </p>
                <p>
                    {t('instagram.p2')}
                </p>
            </div>
            
            <a 
              href="https://www.instagram.com/ana_make_up_backstage/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border border-black dark:border-white text-black dark:text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              <Instagram size={18} />
              <span>{t('instagram.follow_btn')}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
