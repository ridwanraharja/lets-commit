import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Users, 
  MessageCircle, 
  ArrowRight, 
  Heart,
  Trophy,
  Crown,

} from "lucide-react";

export default function JoinCommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const communityPlatforms = [
    {
      id: "discord",
      name: "Discord",
      icon: "🎮",
      tagline: "Game, Learn & Chill",
      description: "Join our vibrant Discord community where learning meets fun! Chat with fellow learners, participate in study groups, and enjoy game nights.",
      stats: { members: "5.2K", online: "1.2K", activity: "Very Active" },
      features: [
        "💬 Study chat rooms",
        "🎯 Weekly challenges", 
        "🎮 Game nights",
        "🎤 Voice study sessions",
        "🏆 Leaderboards",
        "🎭 Fun events"
      ],
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/30",
      buttonColor: "bg-[#5865F2] hover:bg-[#4752C4]",
      link: "https://discord.gg/letscommit",
      special: "Most Active"
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: "✈️",
      tagline: "Quick Updates & Tips",
      description: "Get instant notifications, daily learning tips, and connect with mentors. Perfect for busy learners who want quick, valuable insights.",
      stats: { members: "8.7K", online: "2.1K", activity: "24/7 Active" },
      features: [
        "⚡ Instant notifications",
        "📚 Daily learning tips",
        "🎯 Quick polls & quizzes",
        "🤝 Mentor connections",
        "📈 Progress tracking",
        "💡 Exclusive content"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/30",
      buttonColor: "bg-[#0088cc] hover:bg-[#006699]",
      link: "https://t.me/letscommit",
      special: "Fastest Growing"
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: "🐦",
      tagline: "Trends & Inspiration",
      description: "Follow the latest in education tech, get inspired by success stories, and join conversations that shape the future of learning.",
      stats: { members: "12.3K", online: "3.5K", activity: "Trending" },
      features: [
        "🔥 Latest trends",
        "💡 Success stories",
        "🎯 Live discussions",
        "📱 Mobile-first",
        "🌟 Inspiration daily",
        "🚀 Industry insights"
      ],
      color: "from-gray-800 to-black",
      bgColor: "bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/30",
      buttonColor: "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
      link: "https://twitter.com/letscommit",
      special: "Most Inspiring"
    }
  ];

  const communityStats = [
    { icon: Users, value: "25K+", label: "Total Members", color: "text-blue-500" },
    { icon: MessageCircle, value: "50K+", label: "Messages Daily", color: "text-green-500" },
    { icon: Trophy, value: "1.2K", label: "Success Stories", color: "text-yellow-500" },
    { icon: Heart, value: "98%", label: "Satisfaction Rate", color: "text-pink-500" }
  ];

  const handleJoinClick = (platform: string) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    // Here you would handle the actual join logic
    console.log(platform)
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10 transition-colors duration-700 ease-in-out"
    >
      {/* Confetti Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        animate={showConfetti ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {showConfetti && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 100],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              scale: [1, 1.5, 0],
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Community Icons */}
        <motion.div 
          className="absolute top-20 left-1/4 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0 }}
        >
          🎉
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-1/3 text-5xl"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -15, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          🚀
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-1/3 text-4xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 20, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          💫
        </motion.div>

        <motion.div 
          className="absolute top-1/2 right-1/4 text-5xl"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -5, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 3 }}
        >
          🎯
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Users className="w-4 h-4" />
            Join the Movement
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join Our Amazing{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Community
              </span>
              <motion.div
                className="absolute -top-8 -right-8 text-4xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎊
              </motion.div>
            </span>
            <br />Where Learning is Fun!
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-700 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Connect with thousands of learners, share your journey, get support, and celebrate wins together. Choose your favorite platform to get started!
          </motion.p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 md:p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-in-out hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-700 ease-in-out">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Platforms */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityPlatforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                className="group relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredPlatform(platform.id)}
                onHoverEnd={() => setHoveredPlatform(null)}
              >
                <div className={`relative h-full ${platform.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex flex-col transition-colors duration-700 ease-in-out`}>
                  {/* Special Badge */}
                  {platform.special && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-3xl flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        {platform.special}
                      </div>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 ease-in-out`} />
                  
                  {/* Top Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left`} />
                  
                  {/* Content Container */}
                  <div className="relative p-6 md:p-8 flex flex-col flex-grow">
                    {/* Platform Header */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ 
                          scale: hoveredPlatform === platform.id ? 1.1 : 1,
                          rotate: hoveredPlatform === platform.id ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {platform.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-700 ease-in-out">
                        {platform.name}
                      </h3>
                      
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-700 ease-in-out">
                        {platform.tagline}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-700 ease-in-out">
                        {platform.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl transition-colors duration-700 ease-in-out">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                            {platform.stats.members}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                            Members
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
                            {platform.stats.online}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                            Online
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-700 ease-in-out">
                            <motion.div
                              className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            Live
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-700 ease-in-out">
                            Status
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8 flex-grow">
                      <div className="grid grid-cols-2 gap-2">
                        {platform.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="text-xs text-gray-700 dark:text-gray-300 p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg transition-colors duration-700 ease-in-out"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, delay: 1.2 + featureIndex * 0.05 }}
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Join Button */}
                    <div className="mt-auto">
                      <motion.a
                        href={platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleJoinClick(platform.id)}
                        className={`block w-full px-6 py-4 ${platform.buttonColor} text-white font-bold rounded-xl transition-all duration-700 ease-in-out text-center overflow-hidden group/btn relative`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Join {platform.name}
                          <motion.div
                            animate={{ x: hoveredPlatform === platform.id ? 4 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl p-8 md:p-12 transition-colors duration-700 ease-in-out">
            <motion.div
              className="text-5xl mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🎉🚀✨
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-700 ease-in-out">
              Can't Decide? Join Them All!
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto transition-colors duration-700 ease-in-out">
              Each platform offers unique experiences. Discord for deep connections, Telegram for quick updates, and X for inspiration. Why not experience them all?
            </p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              {communityPlatforms.map((platform) => (
                <motion.a
                  key={platform.id}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 ${platform.buttonColor} text-white font-semibold rounded-xl transition-all duration-700 ease-in-out hover:scale-105 flex items-center gap-2`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{platform.icon}</span>
                  {platform.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}