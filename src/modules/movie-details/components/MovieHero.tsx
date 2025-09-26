import React from 'react';
import type { MovieDetails } from '../types/movieDetails.types';
import { FavoriteButton } from '@/modules/favorites/components/FavoriteButton';

interface MovieHeroProps {
    movie: MovieDetails;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 dark:bg-opacity-80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-64 md:w-80 rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 text-white dark:text-gray-100">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="text-xl text-gray-300 dark:text-gray-200 italic mb-6">{movie.tagline}</p>
                        )}

                        {/* Movie Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                            <span className="flex items-center gap-1">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votos)
                            </span>

                            <span>•</span>
                            <span>{formatDate(movie.release_date)}</span>

                            <span>•</span>
                            <span>{formatRuntime(movie.runtime)}</span>

                            <span>•</span>
                            <span className="px-2 py-1 bg-gray-700 dark:bg-gray-600 rounded text-xs">
                                {movie.status}
                            </span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Overview */}
                        <p className="text-lg leading-relaxed mb-8 max-w-4xl">
                            {movie.overview}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <FavoriteButton
                                movie={{
                                    id: movie.id,
                                    title: movie.title,
                                    poster_path: movie.poster_path,
                                    backdrop_path: movie.backdrop_path,
                                    overview: movie.overview,
                                    release_date: movie.release_date,
                                    vote_average: movie.vote_average,
                                    genre_ids: movie.genres?.map(g => g.id) || []
                                }}
                                size="lg"
                                showText={true}
                                className="bg-gray-700 hover:bg-gray-600"
                            />

                            {movie.homepage && (
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Site Oficial
                                </a>
                            )}
                        </div>

                        {/* Additional Info */}
                        {(movie.budget > 0 || movie.revenue > 0) && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {movie.budget > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 mb-1">Orçamento</h3>
                                        <p className="text-lg">{formatCurrency(movie.budget)}</p>
                                    </div>
                                )}
                                {movie.revenue > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 mb-1">Bilheteria</h3>
                                        <p className="text-lg">{formatCurrency(movie.revenue)}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;