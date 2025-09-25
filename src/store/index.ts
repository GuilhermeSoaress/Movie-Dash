import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../modules/favorites/store/favoritesSlice';
import moviesReducer from '../modules/home/store/moviesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;