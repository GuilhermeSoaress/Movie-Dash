import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../modules/favorites/store/favoritesSlice';
import moviesReducer from '../modules/home/store/moviesSlice';
import movieDetailsReducer from '../modules/movie-details/store/movieDetailsSlice';
import searchReducer from '../modules/search/store/searchSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;