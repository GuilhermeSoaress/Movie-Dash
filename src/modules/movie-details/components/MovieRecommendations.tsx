import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '@/shared/types/movie.types';

interface MovieRecommendationsProps {
    movies: Movie[];
    title: string;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ movies, title }) => {
    if (movies.length === 0) {
        return null;
    }

    const displayMovies = movies.slice(0, 12);

    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {displayMovies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Overlay com informações */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                                            {movie.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-xs text-gray-300">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {movie.vote_average.toFixed(1)}
                                            </span>

                                            <span>•</span>

                                            <span>
                                                {new Date(movie.release_date).getFullYear()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {movies.length > 12 && (
                    <div className="text-center mt-8">
                        <p className="text-gray-400 text-sm">
                            Mostrando 12 de {movies.length} filmes recomendados
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MovieRecommendations;