import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/app/data/blogPosts';

export interface HeroContent {
  images: string[];
  subtitle: string;
  title: string;
  beauty: string;
  description: string;
}

export interface AdminContent {
  hero: HeroContent;
  blogPosts: BlogPost[];
}

interface AdminContentContextValue {
  adminContent: AdminContent;
  setAdminContent: (content: AdminContent) => void;
  refreshContent: () => Promise<void>;
  isLoaded: boolean;
}

const defaultHero: HeroContent = {
  images: [],
  subtitle: '',
  title: '',
  beauty: '',
  description: '',
};

const defaultContent: AdminContent = {
  hero: defaultHero,
  blogPosts: [],
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
      // Fetch with cache-bust to always get fresh data after admin commits
      const res = await fetch(`/admin-content.json?v=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setAdminContentState({
          hero: data.hero || defaultHero,
          blogPosts: data.blogPosts || [],
        });
      }
    } catch {
      // If fetch fails, use empty defaults (graceful degradation)
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

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
