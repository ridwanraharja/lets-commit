import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ourStory } from "../constants/aboutus";

export default function OurJourney() {
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-12 md:pt-16 lg:pt-18">
      {/* Our Story Section */}
      <motion.div
        ref={storyRef}
        className="mb-16 md:mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
             {" "} Journey 

            </span>
            : From  
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
             {" "} Idea to Impact  

            </span>
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto transition-colors duration-700 ease-in-out px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every great product has a story. Here's how we went from a simple idea to transforming how people learn.
          </motion.p>
        </div>

        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {/* Desktop Timeline Layout */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
            
            {ourStory.map((story, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              >
                {/* Story Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-in-out relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -8 }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 1px)`,
                          backgroundSize: '24px 24px'
                        }}
                      />
                    </div>

                    <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} relative z-10`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        {story.icon}
                      </div>
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Step {story.step}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed transition-colors duration-700 ease-in-out">
                        {story.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 italic leading-relaxed transition-colors duration-700 ease-in-out">
                        {story.details}
                      </p>
                      
                      <div className={`mt-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="inline-flex items-center gap-2 text-xs px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200/50 dark:border-purple-700/50">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          {story.emotion}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg -z-10"
                  initial={{ scale: 0 }}
                  animate={isStoryInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                />
                
                {/* Step Number */}
                <div className="w-2/12 flex justify-center">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isStoryInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  >
                    {story.step}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {ourStory.map((story, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 sm:gap-4"
                initial={{ opacity: 0, x: -30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                {/* Step Circle */}
                <motion.div 
                  className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-10 flex-shrink-0"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isStoryInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                >
                  <span className="text-white font-bold text-sm sm:text-lg">{story.step}</span>
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-in-out relative overflow-hidden"
                  whileHover={{ y: -3, scale: 1.01 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 relative z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-md">
                      {story.icon}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 block">
                        Step {story.step}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-3 transition-colors duration-700 ease-in-out">
                      {story.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 italic leading-relaxed mb-3 sm:mb-4 transition-colors duration-700 ease-in-out">
                      {story.details}
                    </p>
                    
                    {/* Emotion Badge */}
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200/50 dark:border-purple-700/50">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                        {story.emotion}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-tr-xl sm:rounded-tr-2xl pointer-events-none"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}