import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie } from '@/shared/types/movie.types';

interface MorphingMovieCardProps {
    movie: Movie;
}

const MorphingMovieCard: React.FC<MorphingMovieCardProps> = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Memoize expensive calculations
    const { posterUrl, backdropUrl, releaseYear, rating } = useMemo(() => {
        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : '/placeholder-movie.jpg';

        const backdrop = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : poster;

        const year = movie.release_date 
            ? new Date(movie.release_date).getFullYear()
            : 'N/A';

        const rate = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0';

        return {
            posterUrl: poster,
            backdropUrl: backdrop,
            releaseYear: year,
            rating: rate
        };
    }, [movie.poster_path, movie.backdrop_path, movie.release_date, movie.vote_average]);

    return (
        <motion.div
            className="relative bg-slate-800 dark:bg-slate-700 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl dark:shadow-slate-900/50"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
            animate={{
                boxShadow: isHovered 
                    ? "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(59, 130, 246, 0.2)"
                    : "0 4px 6px rgba(0,0,0,0.1)"
            }}
        >
            <Link to={`/movie/${movie.id}`} className="block">
                <motion.div
                    className="relative w-full aspect-[2/3] bg-slate-700 dark:bg-slate-600 rounded-t-lg overflow-hidden"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.img
                        src={isHovered ? backdropUrl : posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        animate={{
                            opacity: 1,
                            filter: isHovered ? "brightness(0.7)" : "brightness(1)"
                        }}
                        transition={{ duration: 0.5 }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                        animate={{
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                    />

                    <motion.div
                        className="absolute bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-yellow-400 flex items-center gap-1 z-10"
                        animate={{
                            top: isHovered ? 20 : 12,
                            right: isHovered ? 20 : 12,
                            scale: isHovered ? 1.08 : 1,
                            backgroundColor: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.7)"
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        style={{
                            filter: isHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : "none"
                        }}
                    >
                        <motion.span
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            ⭐
                        </motion.span>
                        {rating}
                    </motion.div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute inset-0 p-6 text-white flex flex-col justify-end"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {movie.overview && (
                                    <motion.p
                                        className="text-xs text-gray-300 line-clamp-3 mb-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                    >
                                        {movie.overview}
                                    </motion.p>
                                )}

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                >
                                    <motion.button
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Ver Detalhes</span>
                                        <motion.span
                                            animate={{ x: isHovered ? 3 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="p-4" >
                    <h3 className="font-semibold text-sm text-white dark:text-gray-100 truncate mb-1" title={movie.title}>
                        {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-300">
                        {releaseYear}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default MorphingMovieCard;