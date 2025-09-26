import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '@/shared/types/movie.types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block bg-slate-800 dark:bg-slate-700 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg hover:shadow-xl dark:shadow-slate-900/50"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-auto aspect-[2/3] object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-yellow-400 flex items-center">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm truncate mb-1 text-white dark:text-gray-100" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-300">
          {new Date(movie.release_date).getFullYear() || 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;