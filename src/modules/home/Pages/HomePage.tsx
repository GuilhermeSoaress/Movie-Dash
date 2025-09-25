import React, { useEffect, useState } from 'react';
import { homeService } from '../services/homeService';
import type { Movie } from '@/shared/types/movie.types';
import MovieSection from '../components/MovieSection';
import LoadingSpinner from '../../../components/Loading';

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const [popularResponse, topRatedResponse, upcomingResponse] = await Promise.all([
          homeService.getPopular(),
          homeService.getTopRated(),
          homeService.getUpcoming()
        ]);

        setPopularMovies(popularResponse.data.results.slice(0, 12));
        setTopRatedMovies(topRatedResponse.data.results.slice(0, 12));
        setUpcomingMovies(upcomingResponse.data.results.slice(0, 12));

      } catch (error) {
        setError('Erro ao carregar filmes. Verifique sua conexão e tente novamente.');
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-400 font-semibold mb-2">Oops! Algo deu errado</h3>
          <p className="text-gray-300 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo ao MovieDash</h1>
        <p className="text-gray-300">Descubra, explore e organize seus filmes favoritos</p>
      </div>

      {/* Seções de Filmes */}
      <MovieSection 
        title="Filmes Populares" 
        movies={popularMovies}
        icon="🔥"
      />

      <MovieSection 
        title="Mais Bem Avaliados" 
        movies={topRatedMovies}
        icon="⭐"
      />

      <MovieSection 
        title="Próximos Lançamentos" 
        movies={upcomingMovies}
        icon="🎭"
      />
    </div>
  );
};

export default HomePage;