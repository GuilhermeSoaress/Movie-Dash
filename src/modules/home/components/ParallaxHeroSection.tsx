import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ParticleSystem from '../../../components/ParticleSystem';

const ParallaxHeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-slate-900">
      {/* Background Layers with Parallax */}
      
      {/* Layer 1 - Far background with animated gradient */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900"
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(119, 255, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Layer 2 - Floating shapes */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3 - Grid pattern */}
      <motion.div 
        style={{ y: y1, opacity: 0.1 }}
        className="absolute inset-0 bg-grid-pattern"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="text-center max-w-6xl mx-auto px-4">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
                  "0 0 25px rgba(147, 51, 234, 0.5), 0 0 45px rgba(147, 51, 234, 0.3)",
                  "0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                textShadow: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                backgroundSize: "200% 200%",
                filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))"
              }}
            >
              MovieDash
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6"
            />
          </motion.div>

          {/* Animated Subtitle with Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mb-12"
          >
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              Descubra, explore e organize seus filmes favoritos
            </motion.p>
            <motion.p 
              className="text-lg text-gray-400 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              Uma experiência cinematográfica única e moderna
            </motion.p>
          </motion.div>

          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.4), 0 10px 30px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.5), 0 10px 40px rgba(147, 51, 234, 0.4)",
                  "0 0 35px rgba(16, 185, 129, 0.4), 0 10px 35px rgba(16, 185, 129, 0.3)",
                  "0 0 30px rgba(59, 130, 246, 0.4), 0 10px 30px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))"
              }}
            >
              <span className="relative z-10">Explorar Filmes</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Saiba Mais
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center text-white/60"
            >
              <span className="text-sm mb-2 font-light">Role para explorar</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Advanced Particle System */}
      <motion.div style={{ y: y2 }}>
        <ParticleSystem 
          count={25}
          colors={[
            'rgba(59, 130, 246, 0.4)',
            'rgba(147, 51, 234, 0.4)', 
            'rgba(16, 185, 129, 0.4)',
            'rgba(244, 63, 94, 0.4)',
            'rgba(245, 158, 11, 0.4)'
          ]}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxHeroSection;