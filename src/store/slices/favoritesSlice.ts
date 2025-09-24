import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

interface FavoritesState {
  favoriteMovies: Movie[];
}

const initialState: FavoritesState = {
  favoriteMovies: [],
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
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movie => movie.id !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favoriteMovies = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;