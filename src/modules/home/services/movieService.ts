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
};

export default api;