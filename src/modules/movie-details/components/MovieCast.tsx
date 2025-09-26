import React from 'react';
import type { CastMember } from '../types/movieDetails.types';

interface MovieCastProps {
    cast: CastMember[];
}

const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
    const mainCast = cast.slice(0, 10);

    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Elenco Principal</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {mainCast.map((member) => (
                        <div key={member.id} className="text-center">
                            <div className="relative mb-4">
                                {member.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                        alt={member.name}
                                        className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full aspect-[3/4] bg-gray-700 dark:bg-gray-600 rounded-lg shadow-lg flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-1 line-clamp-2">
                                {member.name}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
                                {member.character}
                            </p>
                        </div>
                    ))}
                </div>

                {cast.length > 10 && (
                    <div className="text-center mt-8">
                        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors">
                            Ver Elenco Completo ({cast.length} atores)
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MovieCast;