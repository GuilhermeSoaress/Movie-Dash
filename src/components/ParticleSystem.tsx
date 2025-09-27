import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleSystemProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 30, 
  colors = ['rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(244, 63, 94, 0.6)'],
  className = "absolute inset-0 pointer-events-none"
}) => {
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 10
    }));
  }, [count, colors]);

  return (
    <div className={className}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: `blur(${particle.size * 0.3}px)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            y: [0, -200],
            x: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;