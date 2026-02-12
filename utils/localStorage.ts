import { FavoriteMovie } from '@/types/movie';

const FAVORITES_KEY = 'movie_explorer_favorites';

export const getFavorites = (): FavoriteMovie[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (favorites: FavoriteMovie[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const addFavorite = (movie: FavoriteMovie): FavoriteMovie[] => {
  const favorites = getFavorites();
  const updated = [...favorites, movie];
  saveFavorites(updated);
  return updated;
};

export const removeFavorite = (movieId: number): FavoriteMovie[] => {
  const favorites = getFavorites();
  const updated = favorites.filter(m => m.id !== movieId);
  saveFavorites(updated);
  return updated;
};

export const updateFavorite = (movieId: number, updates: Partial<FavoriteMovie>): FavoriteMovie[] => {
  const favorites = getFavorites();
  const updated = favorites.map(m =>
    m.id === movieId ? { ...m, ...updates } : m
  );
  saveFavorites(updated);
  return updated;
};

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some(m => m.id === movieId);
};
