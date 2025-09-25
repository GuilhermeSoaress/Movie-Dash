import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { movieService } from '../../home/services/movieService';
import type { MovieDetails, Credits, Video, Movie } from '../../home/services/movieService';

export const fetchMovieDetails = createAsyncThunk(
    'movieDetails/fetchMovieDetails',
    async (movieId: number) => {
        const [detailsResponse, creditsResponse, videosResponse, similarResponse, recommendationsResponse] = await Promise.all([
            movieService.getMovieDetails(movieId),
            movieService.getMovieCredits(movieId),
            movieService.getMovieVideos(movieId),
            movieService.getSimilarMovies(movieId),
            movieService.getRecommendedMovies(movieId),
        ]);

        return {
            details: detailsResponse.data,
            credits: creditsResponse.data,
            videos: videosResponse.data.results,
            similarMovies: similarResponse.data.results,
            recommendedMovies: recommendationsResponse.data.results,
        };
    }
);

interface MovieDetailsState {
    currentMovie: MovieDetails | null;
    credits: Credits | null;
    videos: Video[];
    similarMovies: Movie[];
    recommendedMovies: Movie[];
    loading: boolean;
    error: string | null;
    hasFetched: boolean;
}

const initialState: MovieDetailsState = {
    currentMovie: null,
    credits: null,
    videos: [],
    similarMovies: [],
    recommendedMovies: [],
    loading: false,
    error: null,
    hasFetched: false,
};

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {
        clearMovieDetails: (state) => {
            state.currentMovie = null;
            state.credits = null;
            state.videos = [];
            state.similarMovies = [];
            state.recommendedMovies = [];
            state.error = null;
            state.hasFetched = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentMovie = action.payload.details;
                state.credits = action.payload.credits;
                state.videos = action.payload.videos;
                state.similarMovies = action.payload.similarMovies;
                state.recommendedMovies = action.payload.recommendedMovies;
                state.hasFetched = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erro ao carregar detalhes do filme';
                state.hasFetched = false;
            });
    },
});

export const { clearMovieDetails, setError } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;