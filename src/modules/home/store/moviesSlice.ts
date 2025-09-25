import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../services/movieService';

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.error = null;
    },
  },
});

export const { 
  setLoading, 
  setMovies, 
  setError, 
  setSearchQuery, 
  clearMovies 
} = moviesSlice.actions;

export default moviesSlice.reducer;