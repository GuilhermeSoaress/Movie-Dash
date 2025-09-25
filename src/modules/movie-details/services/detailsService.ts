import api from '../../../shared/services/api';
import type { TMDBResponse } from '../../../shared/types/movie.types';
import type { MovieDetails, Credits, VideosResponse } from '../types/movieDetails.types';

export const detailsService = {
    getMovieDetails: (movieId: number) => api.get<MovieDetails>(`/movie/${movieId}`),
    getMovieCredits: (movieId: number) => api.get<Credits>(`/movie/${movieId}/credits`),
    getMovieVideos: (movieId: number) => api.get<VideosResponse>(`/movie/${movieId}/videos`),
    getSimilarMovies: (movieId: number) => api.get<TMDBResponse>(`/movie/${movieId}/similar`),
    getRecommendedMovies: (movieId: number) => api.get<TMDBResponse>(`/movie/${movieId}/recommendations`),
};

export default detailsService;