import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { clearError } from '../store/searchSlice';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';

export const SearchPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Buscar Filmes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Encontre seus filmes favoritos no Movie Dashboard. 
            Digite o nome do filme que você está procurando.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <SearchInput placeholder="Digite o nome do filme..." />
        </div>

        {/* Search Results */}
        <SearchResults />
      </div>
    </div>
  );
};