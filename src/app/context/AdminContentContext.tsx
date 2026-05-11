import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/app/data/blogPosts';

export interface LocalizedString {
  sr: string;
  en: string;
  de: string;
}

export interface HeroContent {
  images: string[];
  subtitle: string;
  title: string;
  beauty: string;
  description: string;
}

export interface ServiceItem {
  name: LocalizedString;
  price: string;
  image?: string;
}

export interface AcademyCourse {
  id: string;
  title: LocalizedString;
  duration: LocalizedString;
  description: LocalizedString;
}

export interface AdminContent {
  hero: HeroContent;
  blogPosts: BlogPost[];
  aboutImage: string;
  aboutBio: LocalizedString;
  galleryImages: string[];
  hiddenGalleryIds: number[];
  services: ServiceItem[];
  servicePrices: Record<string, string>;
  academyCourses: AcademyCourse[];
}

interface AdminContentContextValue {
  adminContent: AdminContent;
  setAdminContent: (content: AdminContent) => void;
  refreshContent: () => Promise<void>;
  isLoaded: boolean;
}

const defaultContent: AdminContent = {
  hero: { images: [], subtitle: '', title: '', beauty: '', description: '' },
  blogPosts: [],
  aboutImage: '',
  aboutBio: { sr: '', en: '', de: '' },
  galleryImages: [],
  hiddenGalleryIds: [],
  services: [],
  servicePrices: {},
  academyCourses: [],
};

const AdminContentContext = createContext<AdminContentContextValue>({
  adminContent: defaultContent,
  setAdminContent: () => {},
  refreshContent: async () => {},
  isLoaded: false,
});

export const AdminContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminContent, setAdminContentState] = useState<AdminContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch(`/admin-content.json?v=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setAdminContentState({
          hero: data.hero || defaultContent.hero,
          blogPosts: data.blogPosts || [],
          aboutImage: data.aboutImage || '',
          aboutBio: data.aboutBio || { sr: '', en: '', de: '' },
          galleryImages: data.galleryImages || [],
          hiddenGalleryIds: data.hiddenGalleryIds || [],
          services: data.services || [],
          servicePrices: data.servicePrices || {},
          academyCourses: data.academyCourses || [],
        });
      }
    } catch { /* graceful fallback */ }
    finally { setIsLoaded(true); }
  }, []);

  useEffect(() => { refreshContent(); }, [refreshContent]);

  const setAdminContent = useCallback((content: AdminContent) => {
    setAdminContentState(content);
  }, []);

  return (
    <AdminContentContext.Provider value={{ adminContent, setAdminContent, refreshContent, isLoaded }}>
      {children}
    </AdminContentContext.Provider>
  );
};

export const useAdminContent = () => useContext(AdminContentContext);
