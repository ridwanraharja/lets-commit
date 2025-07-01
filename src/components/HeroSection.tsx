import { Sparkles, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <>
            {/* Hero Section - Enhanced with Moving Blurs */}
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 xl:py-48 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10">
                {/* Animated Moving Background Blurs - Responsive */}
                <div className="absolute inset-0">
                    {/* Large moving blurs - Responsive sizes */}
                    <motion.div 
                        className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl sm:blur-3xl"
                        animate={{
                            x: [0, 50, -25, 0],
                            y: [0, -40, 30, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ top: '5%', left: '5%' }}
                    />
                    
                    <motion.div 
                        className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-2xl sm:blur-3xl"
                        animate={{
                            x: [0, -60, 40, 0],
                            y: [0, 45, -35, 0],
                            scale: [1, 0.8, 1.2, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 5
                        }}
                        style={{ top: '15%', right: '5%' }}
                    />
                    
                    <motion.div 
                        className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl sm:blur-3xl"
                        animate={{
                            x: [0, 30, -45, 0],
                            y: [0, -30, 20, 0],
                            scale: [1, 1.05, 0.95, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 10
                        }}
                        style={{ bottom: '10%', left: '15%' }}
                    />

                    {/* Medium floating elements - Mobile optimized */}
                    <motion.div 
                        className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-xl sm:blur-2xl"
                        animate={{
                            x: [0, 20, -15, 0],
                            y: [0, -25, 15, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3
                        }}
                        style={{ top: '50%', right: '20%' }}
                    />

                    {/* Small orbital elements - Mobile friendly */}
                    <motion.div 
                        className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-lg sm:blur-xl"
                        animate={{
                            x: [0, 15, -10, 0],
                            y: [0, -20, 12, 0],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 7
                        }}
                        style={{ top: '35%', left: '70%' }}
                    />

                    {/* Dynamic Grid Overlay - Responsive */}
                    <motion.div 
                        className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] lg:opacity-[0.04] dark:opacity-[0.01] dark:sm:opacity-[0.015] dark:lg:opacity-[0.02]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-7xl">
                    {/* Animated Badge - Responsive */}
                    <motion.div 
                        className="inline-flex items-center gap-2 mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/50 dark:to-purple-900/50 backdrop-blur-xl text-blue-700 dark:text-blue-300 text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-lg sm:shadow-2xl border border-blue-200/50 dark:border-blue-700/50"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="hidden sm:inline">Revolutionary Learning Platform</span>
                        <span className="sm:hidden">Revolutionary Platform</span>
                        <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Enhanced Main Heading - Better Mobile Responsive */}
                    <motion.div
                        className="mb-6 sm:mb-8 lg:mb-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <motion.h1 
                            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <motion.span 
                                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                                initial={{ backgroundPosition: "0% 50%" }}
                                animate={{ backgroundPosition: "100% 50%" }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                Let's Commit
                            </motion.span>
                            
                            <motion.span 
                                className="block text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-1 sm:mt-2 lg:mt-4 relative"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                To Your Success!
                                {/* Decorative underline - Responsive */}
                                <motion.div 
                                    className="absolute -bottom-2 sm:-bottom-2 lg:-bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-0.5 lg:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "60%" }}
                                    transition={{ duration: 1, delay: 1.5 }}
                                />
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    {/* Enhanced Supporting Text - Mobile Optimized */}
                    <motion.div
                        className="mb-8 sm:mb-10 lg:mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-sm xs:max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
                            A revolutionary commitment-based learning platform that secures both organizers and participants through{" "}
                            <motion.span 
                                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent relative"
                                whileHover={{ scale: 1.05 }}
                            >
                                escrow smart contracts
                                <motion.div 
                                    className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 1.8 }}
                                />
                            </motion.span>{" "}
                            with session-based rewards.
                        </p>
                    </motion.div>

                    {/* Enhanced CTA Section - Mobile First */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-4 sm:px-0"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Link
                                to="/explore"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-sm sm:text-base lg:text-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-500"
                            >
                                {/* Animated background gradient */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                                
                                {/* Shine effect */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                />
                                
                                <span className="relative z-10 flex items-center">
                                    Explore Events
                                    <motion.div
                                        className="ml-2 sm:ml-3"
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </motion.div>
                                </span>
                            </Link>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <button className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm sm:text-base lg:text-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                                {/* Hover background */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                
                                <span className="relative z-10 flex items-center">
                                    <motion.div
                                        className="mr-2 sm:mr-3"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </motion.div>
                                    How It Works
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Floating Particles - Responsive */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                                i % 4 === 0 ? 'bg-blue-500' :
                                i % 4 === 1 ? 'bg-purple-500' :
                                i % 4 === 2 ? 'bg-pink-500' : 'bg-indigo-500'
                            }`}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.2, 0.6, 0.2],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Electric Effect Lines - Mobile Optimized */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-px h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{ 
                        scaleY: [0, 1, 0],
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 3 
                    }}
                />
                
                <motion.div 
                    className="absolute bottom-1/3 right-1/3 w-12 sm:w-16 lg:w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                    animate={{ 
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatDelay: 4,
                        delay: 1 
                    }}
                />
            </section>    
        </>
    )
}