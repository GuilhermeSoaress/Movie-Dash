import React from 'react';
import type { Movie } from '../services/movieService';
import MovieCard from './MovieCard';

interface MovieSectionProps {
    title: string;
    movies: Movie[];
    icon?: string;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, icon = "🎬" }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>{icon}</span>
                {title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {movies.length === 0 && (
                <p className="text-gray-400 text-center py-8">Nenhum filme encontrado</p>
            )}
        </section>
    );
};

export default MovieSection;