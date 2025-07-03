import { useState, useRef } from "react";
import { motion, useInView, PanInfo } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Star,
  Zap,
  Sparkles
} from "lucide-react";
import { teamMembers } from "../constants/aboutus";

// Define types for team member
interface TeamMember {
  id: string;
  name: string;
  role: string;
  realRole: string;
  avatar: string;
  color: string;
  quote: string;
  skills: string[];
  funFact: string;
  superpower: string;
  github: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isTeamInView: boolean;
  hoveredMember: string | null;
  setHoveredMember: (id: string | null) => void;
}

export default function TeamSection() {
  const teamRef = useRef<HTMLDivElement>(null);
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  return (
    <div className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background gradients */}
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
        {/* Header section */}
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

        {/* Mobile Swiper - Hidden on md and up */}
        <div className="md:hidden relative px-4 mb-8">
          <motion.div
            className="overflow-hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {teamMembers.map((member: TeamMember, index: number) => (
                <div key={member.id} className="w-full flex-shrink-0 px-2">
                  <TeamMemberCard 
                    member={member} 
                    index={index} 
                    isTeamInView={isTeamInView}
                    hoveredMember={hoveredMember}
                    setHoveredMember={setHoveredMember}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {teamMembers.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {teamMembers.map((member: TeamMember, index: number) => (
            <TeamMemberCard 
              key={member.id}
              member={member} 
              index={index} 
              isTeamInView={isTeamInView}
              hoveredMember={hoveredMember}
              setHoveredMember={setHoveredMember}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Extracted TeamMemberCard component to avoid duplication
function TeamMemberCard({ 
  member, 
  index, 
  isTeamInView, 
  hoveredMember, 
  setHoveredMember 
}: TeamMemberCardProps) {
  return (
    <motion.div
      className="group relative h-full" 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isTeamInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.6 + index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8 }} // Hanya mengangkat card ke atas tanpa scaling
      onHoverStart={() => setHoveredMember(member.id)}
      onHoverEnd={() => setHoveredMember(null)}
    >
      <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 flex flex-col">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${member.color.replace('from-', 'from-').replace('to-', 'to-')} opacity-0 group-hover:opacity-5`}
          transition={{ duration: 0.5 }}
        />

        <motion.div 
          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.color}`}
          initial={{ scaleX: 0 }}
          animate={isTeamInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
        />

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

        <div className="relative z-10 p-6 flex flex-col h-full">
          <div className="text-center mb-4">
            <motion.div
              className="relative inline-block"
              animate={{ 
                rotate: hoveredMember === member.id ? [0, 5, -5, 0] : 0 // Removed scale
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl md:text-6xl mb-3 relative">
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

          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {member.name}
            </h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${member.color} text-white shadow-lg`}>
              <Star className="w-3 h-3" />
              {member.role}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {member.realRole}
            </p>
          </div>

          <motion.div 
            className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl border border-gray-200/30 dark:border-gray-700/30 relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute -top-1 -left-1 text-sm opacity-30">💭</div>
            <p className="text-xs italic text-gray-700 dark:text-gray-300 leading-relaxed">
              "{member.quote}"
            </p>
          </motion.div>

          <div className="mb-4 flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill: string, skillIndex: number) => (
                <motion.span 
                  key={skillIndex}
                  className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <motion.div 
              className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200/50 dark:border-yellow-700/50"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium flex items-center gap-2">
                <span className="text-sm">🎯</span>
                {member.funFact}
              </p>
            </motion.div>
            
            <motion.div 
              className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-blue-700 dark:text-blue-400 font-medium flex items-center gap-2">
                <span className="text-sm">🦸‍♂️</span>
                {member.superpower}
              </p>
            </motion.div>
          </div>

          <div className="mt-auto">
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r ${member.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
              whileHover={{ y: -2 }} // Hanya mengangkat button tanpa scaling
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="text-sm">View GitHub</span>
              <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-100`}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-3xl pointer-events-none"></div>
      </div>
    </motion.div>
  );
}