import api from '@/shared/services/api';
import type { TMDBResponse } from '@/shared/types/movie.types';

export const homeService = {
    getPopular: () => api.get<TMDBResponse>('/movie/popular'),
    getTopRated: () => api.get<TMDBResponse>('/movie/top_rated'),
    getUpcoming: () => api.get<TMDBResponse>('/movie/upcoming'),
};

export default homeService;