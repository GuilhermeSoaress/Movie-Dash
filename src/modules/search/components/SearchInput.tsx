import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery, searchMovies, clearSearch } from '../store/searchSlice';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder = "Pesquisar filmes..." }: SearchInputProps) => {
  const dispatch = useAppDispatch();
  const { query, isLoading } = useAppSelector((state) => state.search);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localQuery.trim() !== query) {
        dispatch(setQuery(localQuery));
        
        if (localQuery.trim()) {
          dispatch(searchMovies(localQuery.trim()));
        } else {
          dispatch(clearSearch());
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localQuery, query, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(clearSearch());
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isLoading}
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Clear Button */}
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-12">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};