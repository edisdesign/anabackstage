import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type FavoriteItem = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  type: 'product' | 'service';
};

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('ana-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ana-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      toast.success(`${item.name} added to favorites`);
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: string | number) => {
    setFavorites((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) toast.info(`${item.name} removed from favorites`);
      return prev.filter((i) => i.id !== id);
    });
  };

  const isFavorite = (id: string | number) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info("Favorites cleared");
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
