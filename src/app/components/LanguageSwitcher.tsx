import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const current = i18n.language;
    if (current === 'sr') i18n.changeLanguage('en');
    else if (current === 'en') i18n.changeLanguage('de');
    else i18n.changeLanguage('sr');
  };

  return (
    <button 
      onClick={toggleLang}
      className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#d4af37] transition-colors"
    >
      <Globe size={14} />
      <span>{i18n.language}</span>
    </button>
  );
};
