import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite, addToFavorites, removeFromFavorites, clearFavorites } from '../store/favoritesSlice';
import type { Movie } from '@/shared/types/movie.types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favoriteMovies);

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(movie => movie.id === movieId);
  };

  const addFavorite = (movie: Movie) => {
    dispatch(addToFavorites(movie));
  };

  const removeFavorite = (movieId: number) => {
    dispatch(removeFromFavorites(movieId));
  };

  const toggleMovieFavorite = (movie: Movie) => {
    dispatch(toggleFavorite(movie));
  };

  const clearAllFavorites = () => {
    dispatch(clearFavorites());
  };

  const getFavoriteById = (movieId: number): Movie | undefined => {
    return favorites.find(movie => movie.id === movieId);
  };

  return {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleMovieFavorite,
    clearAllFavorites,
    getFavoriteById,
  };
};