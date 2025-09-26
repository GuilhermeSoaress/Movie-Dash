import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const favoritesStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action === 'object' && action !== null && 'type' in action && 
      typeof action.type === 'string' && action.type.startsWith('favorites/')) {
    const state = store.getState();
    const favorites = state.favorites.favoriteMovies;

    try {
      localStorage.setItem('movie-dashboard-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }

  return result;
};