import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white dark:border-gray-300"></div>
            <span className="ml-3 text-lg text-white dark:text-gray-200">Carregando filmes...</span>
        </div>
    );
};

export default LoadingSpinner;