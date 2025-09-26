
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '@/shared/types/movie.types';

interface FavoritesState {
  favoriteMovies: Movie[];
}

const loadFavoritesFromStorage = (): Movie[] => {
  try {
    const stored = localStorage.getItem('movie-dashboard-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const initialState: FavoritesState = {
  favoriteMovies: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const exists = state.favoriteMovies.find(m => m.id === movie.id);
      if (!exists) {
        state.favoriteMovies.push(movie);
        try {
          localStorage.setItem('movie-dashboard-favorites', JSON.stringify(state.favoriteMovies));
        } catch (error) {
          console.warn('Failed to save to localStorage:', error);
        }
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movie => movie.id !== action.payload
      );
      try {
        localStorage.setItem('movie-dashboard-favorites', JSON.stringify(state.favoriteMovies));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    },
    clearFavorites: (state) => {
      state.favoriteMovies = [];
      try {
        localStorage.setItem('movie-dashboard-favorites', JSON.stringify(state.favoriteMovies));
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    },
    loadFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.favoriteMovies = action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavorites } = favoritesSlice.actions;

export const toggleFavorite = (movie: Movie) => (dispatch: any, getState: any) => {
  const state = getState();
  const exists = state.favorites.favoriteMovies.find((m: Movie) => m.id === movie.id);

  if (exists) {
    dispatch(removeFromFavorites(movie.id));
  } else {
    dispatch(addToFavorites(movie));
  }
};

export default favoritesSlice.reducer;