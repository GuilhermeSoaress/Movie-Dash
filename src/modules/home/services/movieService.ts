import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    'Content-Type': 'application/json'
  },
  params: {
    language: 'pt-BR'
  }
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string;
  imdb_id: string;
  status: string;
  adult: boolean;
  original_title: string;
  original_language: string;
  popularity: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const movieService = {
  getPopular: () => api.get<TMDBResponse>('/movie/popular'),
  getTopRated: () => api.get<TMDBResponse>('/movie/top_rated'),
  getUpcoming: () => api.get<TMDBResponse>('/movie/upcoming'),
  getMovieDetails: (movieId: number) => api.get<MovieDetails>(`/movie/${movieId}`),
  getMovieCredits: (movieId: number) => api.get<Credits>(`/movie/${movieId}/credits`),
  getMovieVideos: (movieId: number) => api.get<VideosResponse>(`/movie/${movieId}/videos`),
  getSimilarMovies: (movieId: number) => api.get<TMDBResponse>(`/movie/${movieId}/similar`),
  getRecommendedMovies: (movieId: number) => api.get<TMDBResponse>(`/movie/${movieId}/recommendations`),
};

export default api;