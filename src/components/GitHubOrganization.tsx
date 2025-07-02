import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Building,
  ArrowRight,
} from "lucide-react";

export default function GitHubOrganization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <motion.div
        ref={sectionRef}
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 transition-colors duration-700 ease-in-out relative overflow-hidden max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              rotate: [0, 5, -5, 0]
            } : { 
              opacity: 0, 
              scale: 0.8 
            }}
            transition={{ 
              duration: 0.6,
              delay: 0.1,
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            🏢
          </motion.div>
          
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 transition-colors duration-700 ease-in-out relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dive Into Our Code Universe
          </motion.h3>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto transition-colors duration-700 ease-in-out relative z-10 px-2 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Curious about how we build the magic? Explore our GitHub organization to see the cutting-edge tech stack, 
            smart contracts, and beautiful interfaces that power CommitLearn. Every commit tells a story! 
          </motion.p>
          
          <motion.a
            href="https://github.com/LetsCommit-BlockDevId"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white text-white dark:text-black font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl relative z-10 group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Building className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">Explore Our Organization</span>
            <span className="sm:hidden">GitHub Org</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.a>



          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl md:rounded-3xl"></div>
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-2xl md:rounded-tr-3xl pointer-events-none"></div>
        </div>
      </motion.div>
    </div>
  );
}