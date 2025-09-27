import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="relative">
                {/* Outer ring */}
                <motion.div
                    className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                
                {/* Inner ring */}
                <motion.div
                    className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-purple-400 border-l-blue-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Center dot */}
                <motion.div
                    className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.span 
                className="text-lg text-gray-300 font-light"
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Carregando filmes...
            </motion.span>
        </div>
    );
};

export default LoadingSpinner;