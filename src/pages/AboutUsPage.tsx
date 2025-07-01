import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Heart, 
  Github, 
  ExternalLink, 
  Building,
  ArrowRight,
} from "lucide-react";
import { ourStory } from "../constants/aboutus";
import { teamMembers } from "../constants/aboutus";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">
      {/* Dynamic Background Constellation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Constellation Lines */}
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

        {/* Floating Particles */}
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

        {/* Gradient Orbs */}
        <div className="absolute top-10 right-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24 relative z-10">
        {/* Hero Section */}
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight transition-colors duration-700 ease-in-out"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Four passionate souls who believe that learning should be an adventure, not a chore. 
            We're building <span className="font-semibold text-purple-600 dark:text-purple-400">CommitLearn</span> because 
            we know that with the right motivation, anyone can achieve anything.
          </motion.p>
        </motion.div>

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
              Our Journey: From Idea to Impact
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
                      <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
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
                    </motion.div>
                  </div>

                 

                  
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

        {/* Team Section */}
        <motion.div
          ref={teamRef}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Meet the Dream Team 🌟
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto transition-colors duration-700 ease-in-out px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Four unique personalities, one shared obsession: making learning irresistibly engaging.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-700 ease-in-out"
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredMember(member.id)}
                onHoverEnd={() => setHoveredMember(null)}
              >
                <div className={`relative h-full ${member.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 sm:p-6 transition-colors duration-700 ease-in-out`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out`} />
                  
                  {/* Top Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left`} />
                  
                  <div className="relative z-10 text-center">
                    {/* Avatar */}
                    <motion.div
                      className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
                      animate={{ 
                        scale: hoveredMember === member.id ? 1.1 : 1,
                        rotate: hoveredMember === member.id ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {member.avatar}
                    </motion.div>
                    
                    {/* Name & Role */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-700 ease-in-out">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-purple-600 dark:text-purple-400 mb-1 transition-colors duration-700 ease-in-out">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-3 sm:mb-4 transition-colors duration-700 ease-in-out">
                      {member.realRole}
                    </p>
                    
                    {/* Quote */}
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                      <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 transition-colors duration-700 ease-in-out">
                        "{member.quote}"
                      </p>
                    </div>
                    
                    {/* Personality - Truncated on mobile */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed transition-colors duration-700 ease-in-out line-clamp-2 sm:line-clamp-none">
                      {member.personality}
                    </p>
                    
                    {/* Fun Fact */}
                    <div className="mb-3 sm:mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200/50 dark:border-yellow-700/50">
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                        {member.funFact}
                      </p>
                    </div>
                    
                    {/* Superpower */}
                    <div className="mb-4 sm:mb-6 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                        🦸‍♀️ {member.superpower}
                      </p>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4 sm:mb-6 justify-center">
                      {member.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs px-2 py-1 bg-white/60 dark:bg-gray-800/60 rounded-full text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-700 ease-in-out"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* GitHub Link */}
                    <motion.a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${member.color} text-white rounded-lg sm:rounded-xl font-medium transition-all duration-700 ease-in-out hover:shadow-lg text-xs sm:text-sm`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </motion.a>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Organization Link */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 transition-colors duration-700 ease-in-out relative overflow-hidden">
            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🏢
            </motion.div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 transition-colors duration-700 ease-in-out relative z-10">
              Dive Into Our Code Universe
            </h3>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto transition-colors duration-700 ease-in-out relative z-10 px-2">
              Curious about how we build the magic? Explore our GitHub organization to see the cutting-edge tech stack, 
              smart contracts, and beautiful interfaces that power CommitLearn. Every commit tells a story! 
            </p>
            
            <motion.a
              href="https://github.com/LetsCommit-BlockDevId"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white text-white dark:text-black font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl relative z-10 group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
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
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4">
            <motion.div
              className="text-3xl sm:text-4xl mb-4 md:mb-6"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🎉
            </motion.div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 transition-colors duration-700 ease-in-out">
              Ready to Join Our Learning Revolution?
            </h3>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8 transition-colors duration-700 ease-in-out leading-relaxed">
              We're just getting started! Come be part of the future where learning is engaging, 
              accountable, and incredibly rewarding. Your journey begins with a single commitment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-xl"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Today
              </motion.a>
              
              <motion.a
                href="/explore"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-700 ease-in-out hover:scale-105"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Events
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}