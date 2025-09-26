import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '@/shared/types/movie.types';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const FavoriteButton = ({ 
  movie, 
  size = 'md', 
  showText = false, 
  className = '' 
}: FavoriteButtonProps) => {
  const { isFavorite, toggleMovieFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMovieFavorite(movie);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        ${isMovieFavorite 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white/10 text-white hover:bg-white/20'
        }
        backdrop-blur-sm rounded-full flex items-center justify-center
        transition-all duration-200 transform hover:scale-110
        border border-white/20 shadow-lg
        ${showText ? 'px-4 w-auto gap-2' : ''}
        ${className}
      `}
      title={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isMovieFavorite ? (
        <svg className={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ) : (
        <svg className={iconSize[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
      
      {showText && (
        <span className="text-sm font-medium">
          {isMovieFavorite ? 'Favorito' : 'Favoritar'}
        </span>
      )}
    </button>
  );
};