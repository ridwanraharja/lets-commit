import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Sparkles, Heart, Coffee, Star } from "lucide-react";
import { MouseEvent, KeyboardEvent } from "react";

export default function NotFoundPage() {
  const handleRocketClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    
    const rocket = document.querySelector('.rocket') as HTMLElement;
    if (rocket) {
      rocket.style.transform = 'translateY(-100vh) rotate(45deg)';
      rocket.style.transition = 'transform 2s ease-out';
      
      setTimeout(() => {
        rocket.style.transform = 'translateY(0) rotate(0deg)';
        rocket.style.transition = 'transform 2s ease-in-out';
      }, 2000);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Create a mock MouseEvent for consistency
      const mockEvent = {
        preventDefault: () => {},
        target: event.target,
        currentTarget: event.currentTarget
      } as MouseEvent<HTMLDivElement>;
      
      handleRocketClick(mockEvent);
    }
  };

  // Animation variants for better performance
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.3, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0 }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 10, -10, 0],
    scale: [1, 1.15, 1]
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 dark:from-slate-900 dark:via-purple-900/10 dark:to-rose-900/10 transition-colors duration-700 ease-in-out relative overflow-hidden">
      {/* Cozy Background Elements */}
      <div className="absolute inset-0">
        {/* Soft Floating Orbs */}
        <motion.div 
          className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-r from-amber-300/15 to-orange-300/15 rounded-full blur-2xl"
          animate={{ 
            x: [0, 25, -25, 0],
            y: [0, -30, 15, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        
        <motion.div 
          className="absolute bottom-16 right-8 w-32 h-32 bg-gradient-to-r from-rose-300/15 to-pink-300/15 rounded-full blur-2xl"
          animate={{ 
            x: [0, -35, 35, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          aria-hidden="true"
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-300/10 to-indigo-300/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.3, 0.7, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2.5, ease: "easeInOut" }}
          aria-hidden="true"
        />
        
        {/* Cozy Floating Icons */}
        <motion.div 
          className="absolute top-1/4 left-1/6 text-amber-400/40"
          animate={floatingAnimation}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Heart className="w-10 h-10" />
        </motion.div>
        
        <motion.div 
          className="absolute top-2/5 right-1/5 text-rose-400/35"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Coffee className="w-8 h-8" />
        </motion.div>

        <motion.div 
          className="absolute bottom-1/3 left-1/5 text-purple-400/30"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Star className="w-9 h-9" />
        </motion.div>

        <motion.div 
          className="absolute top-3/5 left-2/3 text-indigo-400/25"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -12, 12, 0],
            scale: [1, 0.85, 1]
          }}
          transition={{ duration: 11, repeat: Infinity, delay: 3.5, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Sparkles className="w-7 h-7" />
        </motion.div>

        {/* Subtle Particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 xl:py-20 relative z-10 text-center">
        {/* Cozy 404 Design */}
        <motion.div 
          className="relative inline-block mb-8"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2, ease: "backOut", delay: 0.2 }}
        >
          <div className="text-7xl md:text-8xl lg:text-[10rem] font-black bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 bg-clip-text text-transparent leading-none relative drop-shadow-sm">
            4
            <motion.span
              className="inline-block relative"
              animate={{ 
                rotate: [0, 8, -8, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative">
                0
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-rose-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
              </span>
            </motion.span>
            4
          </div>
          
          {/* Soft glow effect */}
          <motion.div
            className="absolute inset-0 text-7xl md:text-8xl lg:text-[10rem] font-black text-rose-300/90 leading-none blur-sm"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            404
          </motion.div>
        </motion.div>

        {/* Warm and Cozy Title */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6 leading-tight"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span className="inline-flex items-center gap-2 flex-wrap justify-center">
            Oops! You've wandered off the path

          </motion.span>
        </motion.h1>

        {/* Cozy Supporting Text */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 transition-colors duration-700 ease-in-out"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Don't worry, even the best explorers sometimes take a wrong turn! 
          <span className="text-rose-500 dark:text-rose-400 font-medium"> Let's get you back</span> 
          to somewhere cozy and familiar. 
          <motion.span
            className="inline-block ml-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
            role="img"
            aria-label="coffee"
          >
            ☕
          </motion.span>
        </motion.p>

        {/* Cozy Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 hover:from-amber-600 hover:via-rose-600 hover:to-purple-600 text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
            aria-label="Go back to homepage"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <Home className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            <span className="relative z-10">Take me home</span>
            <Heart className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true" />
          </Link>

          <Link
            to="/explore"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-rose-200 dark:border-rose-700/50 hover:border-rose-400 dark:hover:border-rose-500 text-rose-600 dark:text-rose-300 font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
            aria-label="Search the website"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
            Explore instead
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Interactive Cozy Element */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="inline-block cursor-pointer group focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800 rounded-xl p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRocketClick}
            role="button"
            tabIndex={0}
            aria-label="Launch rocket animation"
            onKeyDown={handleKeyDown}
          >
            <motion.div
              className="text-5xl mb-3 rocket transition-all duration-2000 ease-out"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              role="img"
              aria-label="rocket"
            >
              🚀
            </motion.div>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Launch me to space! ✨
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Cozy Footer Message */}
        <motion.div
          className="mt-12 text-xs text-gray-400 dark:text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p>Made with 💝 to make your day a little brighter</p>
        </motion.div>
      </div>
    </div>
  );
}