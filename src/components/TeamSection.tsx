import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Star,
  Zap,
  Sparkles
} from "lucide-react";
import { teamMembers } from "../constants/aboutus";

export default function TeamSection() {
  const teamRef = useRef<HTMLDivElement>(null);
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <div className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/8 to-orange-400/8 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        ref={teamRef}
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isTeamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Meet Our Amazing Team</span>
            <motion.div
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The {" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
             Dream  {" "}

            </span>
            Team

          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Four brilliant minds, one shared passion: creating extraordinary learning experiences 
            that inspire and transform lives through technology.
          </motion.p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative h-full" // Added h-full
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isTeamInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.6 + index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              {/* Card Container */}
              <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 flex flex-col">
                
                {/* Animated Background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${member.color.replace('from-', 'from-').replace('to-', 'to-')} opacity-0 group-hover:opacity-5`}
                  transition={{ duration: 0.5 }}
                />

                {/* Top Gradient Bar */}
                <motion.div 
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.color}`}
                  initial={{ scaleX: 0 }}
                  animate={isTeamInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                />

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 text-2xl opacity-20"
                  animate={hoveredMember === member.id ? { 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.3, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: hoveredMember === member.id ? Infinity : 0 }}
                >
                  ✨
                </motion.div>

                <div className="relative z-10 p-6 flex flex-col h-full"> {/* Changed to flex flex-col h-full and reduced padding */}
                  {/* Avatar Section */}
                  <div className="text-center mb-4"> {/* Reduced margin */}
                    <motion.div
                      className="relative inline-block"
                      animate={{ 
                        scale: hoveredMember === member.id ? 1.1 : 1,
                        rotate: hoveredMember === member.id ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-5xl md:text-6xl mb-3 relative"> {/* Reduced size and margin */}
                        {member.avatar}
                        {hoveredMember === member.id && (
                          <motion.div
                            className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4"> {/* Reduced margin */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2"> {/* Reduced font size */}
                      {member.name}
                    </h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${member.color} text-white shadow-lg`}> {/* Reduced text size */}
                      <Star className="w-3 h-3" />
                      {member.role}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium"> {/* Reduced text size */}
                      {member.realRole}
                    </p>
                  </div>

                  {/* Quote */}
                  <motion.div 
                    className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl border border-gray-200/30 dark:border-gray-700/30 relative" // Reduced padding and margin
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute -top-1 -left-1 text-sm opacity-30">💭</div> {/* Reduced size */}
                    <p className="text-xs italic text-gray-700 dark:text-gray-300 leading-relaxed"> {/* Reduced text size */}
                      "{member.quote}"
                    </p>
                  </motion.div>

                  {/* Skills */}
                  <div className="mb-4 flex-grow"> {/* Added flex-grow and reduced margin */}
                    <div className="flex items-center gap-2 mb-2"> {/* Reduced margin */}
                      <Zap className="w-3 h-3 text-yellow-500" /> {/* Reduced size */}
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Skills</span> {/* Reduced text size */}
                    </div>
                    <div className="flex flex-wrap gap-1.5"> {/* Reduced gap */}
                      {member.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skillIndex}
                          className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium" // Reduced padding
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Fun Elements */}
                  <div className="space-y-2 mb-4"> {/* Reduced spacing and margin */}
                    <motion.div 
                      className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200/50 dark:border-yellow-700/50" // Reduced padding
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium flex items-center gap-2">
                        <span className="text-sm">🎯</span> {/* Reduced size */}
                        {member.funFact}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50" // Reduced padding
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium flex items-center gap-2">
                        <span className="text-sm">🦸‍♂️</span> {/* Reduced size */}
                        {member.superpower}
                      </p>
                    </motion.div>
                  </div>

                  {/* GitHub Button - This will stick to bottom */}
                  <div className="mt-auto"> {/* Added mt-auto to push to bottom */}
                    <motion.a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${member.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`} // Reduced padding and gap
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                      <span className="text-sm">View GitHub</span> {/* Reduced text size */}
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" /> {/* Reduced size */}
                    </motion.a>
                  </div>
                </div>

                {/* Bottom Glow Effect */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.5 }}
                />

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-3xl pointer-events-none"></div> {/* Reduced size */}
              </div>
            </motion.div>
          ))}
        </div>


      </motion.div>
    </div>
  );
}