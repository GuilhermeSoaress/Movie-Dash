import api from '@/shared/services/api';
import type { Movie, TMDBResponse } from '@/shared/types/movie.types';

export interface SearchResponse extends TMDBResponse {
  results: Movie[];
}

export const searchService = {
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    if (!query.trim()) {
      return {
        page: 1,
        total_pages: 0,
        total_results: 0,
        results: []
      };
    }

    const response = await api.get<SearchResponse>('/search/movie', {
      params: {
        query: query.trim(),
        page,
        include_adult: false
      }
    });

    return response.data;
  }
};