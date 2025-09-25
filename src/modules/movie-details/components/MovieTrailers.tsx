import React, { useState } from 'react';
import type { Video } from '../../home/services/movieService';

interface MovieTrailersProps {
    videos: Video[];
}

const MovieTrailers: React.FC<MovieTrailersProps> = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const trailers = videos.filter(
        (video) => video.site === 'YouTube' &&
            (video.type === 'Trailer' || video.type === 'Teaser')
    );

    if (trailers.length === 0) {
        return null;
    }

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <>
            <section className="py-12 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-8">Trailers e Teasers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trailers.map((video) => (
                            <div key={video.id} className="relative group cursor-pointer">
                                <div
                                    className="relative overflow-hidden rounded-lg"
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    {/* Thumbnail do YouTube */}
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                        alt={video.name}
                                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-colors">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                                        {video.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {video.type} • YouTube
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal para reproduzir vídeo */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <div className="relative w-full max-w-4xl mx-4">
                        {/* Botão fechar */}
                        <button
                            onClick={closeModal}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Player do YouTube responsivo */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                                title={selectedVideo.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        <div className="mt-4 text-center">
                            <h3 className="text-white text-lg font-semibold">{selectedVideo.name}</h3>
                            <p className="text-gray-400 text-sm">{selectedVideo.type}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieTrailers;