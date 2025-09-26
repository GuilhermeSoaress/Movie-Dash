import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteButton } from '../components/FavoriteButton';
import type { Movie } from '@/shared/types/movie.types';

interface MovieCardProps {
  movie: Movie;
}

const FavoriteMovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-slate-900/50 overflow-hidden group hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
      <div className="relative aspect-[2/3]">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleCardClick}
          loading="lazy"
        />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
          ⭐ {rating}
        </div>

        {/* Favorite button */}
        <div className="absolute top-2 right-2">
          <FavoriteButton
            movie={movie}
            size="sm"
          />
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 cursor-pointer"
          onClick={handleCardClick}
        />
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title={movie.title}
          onClick={handleCardClick}
        >
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {releaseYear}
        </p>
        {movie.overview && (
          <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-3">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export const FavoritesPage = () => {
  const { favorites, favoritesCount, clearAllFavorites } = useFavorites();

  if (favoritesCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Favoritos
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Seus filmes favoritos salvos no Movie Dashboard
            </p>
          </div>

          {/* Empty state */}
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-6">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Nenhum filme favorito ainda
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Explore filmes e adicione aos seus favoritos clicando no ícone de coração
            </p>
            <div className="space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                🏠 Ir para Início
              </a>
              <a
                href="/search"
                className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                🔍 Buscar Filmes
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Favoritos
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {favoritesCount} filme{favoritesCount !== 1 ? 's' : ''} favorito{favoritesCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Clear all button */}
          {favoritesCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja remover todos os favoritos?')) {
                  clearAllFavorites();
                }
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Limpar Todos
            </button>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((movie) => (
            <FavoriteMovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};