import React from 'react';
import { Instagram, Facebook, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoImg from 'figma:asset/31186f88f34539b6048c57361bd1b32bea0f6290.png';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-black text-white pt-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 pb-20 p-[0px]">
          
          {/* Brand Column */}
          <div className="md:col-span-4 pr-12 mb-12 md:mb-0 border-r border-white/10 border-r-0 md:border-r border-dashed md:border-solid">
            <div className="mb-8">
              <img src={logoImg} alt="Ana Backstage" className="h-40 mb-4 invert opacity-90" />
              <p className="text-[#d4af37] italic font-serif text-lg tracking-wide">
                {t('footer.tagline')}
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ana_make_up_backstage/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/Taiba87" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-2 pl-0 md:pl-12 mb-12 md:mb-0">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-8">{t('footer.menu')}</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-light">
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#academy" className="hover:text-white transition-colors">{t('nav.academy')}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t('nav.services')}</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">{t('nav.shop')}</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 mb-12 md:mb-0">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-8">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-light">
              <li className="flex gap-3 items-start">
                <span className="text-white block w-20 shrink-0">{t('footer.address')}:</span>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Back+Stage+by+Ana+Muratovic+Igmanska+3+Novi+Pazar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors group flex flex-col items-start gap-2"
                >
                  <span>Back Stage by Ana Muratovic<br/>Igmanska 3<br/>Novi Pazar 36300, Serbia</span>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#d4af37] border-b border-[#d4af37] pb-0.5">
                    {t('footer.get_directions')} <ExternalLink size={10} />
                  </span>
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-white block w-20 shrink-0">Email:</span>
                <span>Taiba87@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 pl-0 md:pl-8 border-l border-white/10 border-l-0 md:border-l">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-8">{t('footer.newsletter')}</h4>
            <p className="text-gray-500 text-xs mb-6 font-light">{t('footer.newsletter_desc')}</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')} 
                className="bg-transparent text-white placeholder-gray-700 w-full outline-none text-xs tracking-widest uppercase"
              />
              <button className="text-white uppercase text-xs font-bold tracking-widest hover:text-[#d4af37] transition-colors">→</button>
            </div>
            <div className="mt-4 text-[10px] text-gray-700 uppercase tracking-[0.2em] font-light">
              <p>Design by: Edis Muminovic</p>
              <a href="mailto:edis.design@outlook.com" className="hover:text-[#d4af37] transition-colors">edis.design@outlook.com</a>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-700">
          <p>&copy; {new Date().getFullYear()} Ana Muratović. {t('footer.rights')}</p>
          <div className="flex gap-8">
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' }))} className="hover:text-white transition-colors cursor-pointer">{t('footer.privacy')}</button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'impresum' }))} className="hover:text-white transition-colors cursor-pointer">{t('footer.impresum')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
