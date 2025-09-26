import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { fetchMovieDetails, clearMovieDetails } from '../store/movieDetailsSlice';

import MovieHero from '../components/MovieHero';
import MovieCast from '../components/MovieCast';
import MovieTrailers from '../components/MovieTrailers';
import MovieRecommendations from '../components/MovieRecommendations';
import Loading from '../../../components/Loading';

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const {
        currentMovie,
        credits,
        videos,
        similarMovies,
        recommendedMovies,
        loading,
        error,
        hasFetched
    } = useSelector((state: RootState) => state.movieDetails);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        const movieId = Number(id);

        if (!movieId || isNaN(movieId)) {
            return;
        }

        // Limpa os dados do filme anterior se mudou de filme
        if (currentMovie && currentMovie.id !== movieId) {
            dispatch(clearMovieDetails());
        }

        // Busca dados apenas se não foram buscados ainda ou se mudou de filme
        if (!hasFetched || (currentMovie && currentMovie.id !== movieId)) {
            dispatch(fetchMovieDetails(movieId));
        }
    }, [id, dispatch, currentMovie, hasFetched]);

    // Limpa dados quando sai da página
    useEffect(() => {
        return () => {
            dispatch(clearMovieDetails());
        };
    }, [dispatch]);

    // Valida ID
    if (!id || isNaN(Number(id))) {
        return <Navigate to="/" replace />;
    }

    // Loading state
    if (loading) {
        return <Loading />;
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-400 mb-4">Ops!</h1>
                    <p className="text-gray-300 mb-8">{error}</p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors inline-block"
                    >
                        Voltar ao Início
                    </a>
                </div>
            </div>
        );
    }

    // Movie not found
    if (!currentMovie && hasFetched) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-400 mb-4">Filme não encontrado</h1>
                    <p className="text-gray-300 mb-8">O filme que você procura não existe ou foi removido.</p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors inline-block"
                    >
                        Voltar ao Início
                    </a>
                </div>
            </div>
        );
    }

    // Main content
    if (!currentMovie) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <MovieHero
                movie={currentMovie}
            />

            {/* Cast Section */}
            {credits && credits.cast.length > 0 && (
                <MovieCast cast={credits.cast} />
            )}

            {/* Trailers Section */}
            {videos.length > 0 && (
                <MovieTrailers videos={videos} />
            )}

            {/* Similar Movies */}
            {similarMovies.length > 0 && (
                <MovieRecommendations
                    movies={similarMovies}
                    title="Filmes Similares"
                />
            )}

            {/* Recommended Movies */}
            {recommendedMovies.length > 0 && (
                <MovieRecommendations
                    movies={recommendedMovies}
                    title="Recomendações"
                />
            )}
        </div>
    );
};

export default MovieDetailsPage;