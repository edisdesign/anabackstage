import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ArrowLeft, Play } from 'lucide-react';
import { blogPosts, LocalizedString } from '@/app/data/blogPosts';
import { useAdminContent } from '@/app/context/AdminContentContext';
import { ContactForm } from '@/app/components/ContactForm';

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const BlogPostPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { adminContent } = useAdminContent();
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    setIsPlaying(false);
  }, [id]);
  
  // Find post from both hardcoded and admin posts
  const allPosts = [...blogPosts, ...(adminContent.blogPosts || [])];
  const post = allPosts.find(p => p.id === id);
  const displayPost = post || allPosts[0];

  const getLocalized = (content: LocalizedString) => {
    const lang = i18n.language.split('-')[0] as keyof LocalizedString;
    return content[lang] || content['en'];
  };

  const youtubeId = displayPost.video ? getYouTubeId(displayPost.video) : null;

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500 text-black dark:text-white">
      <Navbar />
      
      <article className="pt-32 pb-24">
        {/* Hero Image or Video */}
        <div className="w-full h-[50vh] md:h-[70vh] relative mb-12 bg-black overflow-hidden group">
          {displayPost.video && youtubeId ? (
            isPlaying ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={getLocalized(displayPost.title)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={displayPost.image} 
                  alt={getLocalized(displayPost.title)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            )
          ) : displayPost.video ? (
            <video 
              src={displayPost.video} 
              controls
              className="w-full h-full object-cover"
              poster={displayPost.image}
            />
          ) : (
            <img 
              src={displayPost.image} 
              alt={getLocalized(displayPost.title)} 
              className="w-full h-full object-cover"
            />
          )}
          
          {!displayPost.video && (
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          )}
        </div>

        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#d4af37] mb-8 hover:underline">
            <ArrowLeft size={16} /> {t('blog.title')}
          </Link>

          <div className="flex justify-between items-center mb-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              {getLocalized(displayPost.category)}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {displayPost.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            {getLocalized(displayPost.title)}
          </h1>

          <div className="prose dark:prose-invert prose-lg max-w-none font-light leading-relaxed whitespace-pre-wrap">
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              {getLocalized(displayPost.content)}
            </p>
          </div>
        </div>
      </article>

      <ContactForm />

      <Footer />
    </div>
  );
};
