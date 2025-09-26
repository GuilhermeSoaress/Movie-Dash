import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchService } from '../services/searchService';
import type { Movie } from '@/shared/types/movie.types';

interface SearchState {
  query: string;
  results: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isLoading: false,
  error: null,
  hasSearched: false,
  currentPage: 1,
  totalPages: 0,
  totalResults: 0
};

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await searchService.searchMovies(query);
      return response;
    } catch (error) {
      return rejectWithValue('Erro ao buscar filmes. Tente novamente.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.hasSearched = false;
      state.error = null;
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalResults = 0;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
        state.hasSearched = true;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.hasSearched = true;
      });
  }
});

export const { setQuery, clearSearch, clearError } = searchSlice.actions;
export default searchSlice.reducer;