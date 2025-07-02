import {  useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Heart, 

} from "lucide-react";

import OurJourney from "../components/OurJourney";
import TeamSection from "../components/TeamSection";
import GitHubOrganization from "../components/GitHubOrganization";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">

      <div className="absolute inset-0 overflow-hidden">

        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="url(#constellation1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M200,400 Q400,300 600,400 T1000,400"
            stroke="url(#constellation2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="2,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
          <defs>
            <linearGradient id="constellation1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="constellation2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

    
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="absolute top-10 right-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24 relative z-10">

        <motion.div 
          ref={sectionRef}
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-4 md:mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium shadow-lg border border-blue-200/50 dark:border-blue-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
            <span className="hidden sm:inline">The Humans Behind the Magic</span>
            <span className="sm:hidden">Behind the Magic</span>
            <motion.div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're Not Just Developers,{" "}
            <span className="relative block sm:inline">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                We're Dreamers
              </span>
              <motion.div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-xl sm:text-2xl md:text-3xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </span>
          </motion.h1>

          <motion.p 
            className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Four passionate souls who believe that learning should be an adventure, not a chore. 
            We're building <span className="font-semibold text-purple-600 dark:text-purple-400">CommitLearn</span> because 
            we know that with the right motivation, anyone can achieve anything.
          </motion.p>
        </motion.div>

        <OurJourney />
        <TeamSection />
        <GitHubOrganization />

      </div>
    </div>
  );
}