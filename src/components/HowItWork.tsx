import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle, Zap, Sparkles } from "lucide-react";
import { howItWorksSteps } from "../constants/howitwork";
import { IHowItWorksStep } from "../types/constType";

export default function HowItWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const features = [
        { icon: Clock, text: "Real-time tracking", color: "text-blue-500" },
        { icon: CheckCircle, text: "Verified attendance", color: "text-green-500" },
        { icon: Zap, text: "Instant rewards", color: "text-yellow-500" }
    ];

    return (
        <>
            {/* How It Works - Alternative Design */}
            <section 
                ref={sectionRef}
                className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-white dark:bg-gray-950"
            >
                {/* Enhanced Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Multiple Floating Circles */}
                    <motion.div 
                        className="absolute top-16 left-1/4 w-3 h-3 bg-blue-400/25 rounded-full"
                        animate={{ 
                            y: [0, -25, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                        className="absolute top-24 right-1/3 w-5 h-5 bg-purple-400/20 rounded-full"
                        animate={{ 
                            y: [0, -35, 0],
                            scale: [1, 0.7, 1],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div 
                        className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400/40 rounded-full"
                        animate={{ 
                            y: [0, -20, 0],
                            scale: [1, 1.6, 1],
                            opacity: [0.4, 0.9, 0.4]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
                    />
                    <motion.div 
                        className="absolute top-40 left-1/5 w-4 h-4 bg-green-400/15 rounded-full"
                        animate={{ 
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.15, 0.5, 0.15]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                    />
                    <motion.div 
                        className="absolute bottom-20 right-1/4 w-3 h-3 bg-yellow-400/30 rounded-full"
                        animate={{ 
                            y: [0, -28, 0],
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ duration: 4.5, repeat: Infinity, delay: 4 }}
                    />

                    {/* Background Lines - Desktop Only */}
                    <svg className="absolute inset-0 w-full h-full hidden md:block" style={{ zIndex: 1 }}>
                        {/* Line 1 */}
                        <motion.path
                            d="M 50 150 Q 250 80 450 200 T 850 180"
                            stroke="url(#gradient1)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="4,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 3, delay: 0.5 }}
                        />
                        {/* Line 2 */}
                        <motion.path
                            d="M 100 300 Q 300 200 500 350 T 900 300"
                            stroke="url(#gradient2)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="3,6"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 4, delay: 1 }}
                        />
                        {/* Line 3 */}
                        <motion.path
                            d="M 0 250 Q 200 150 400 280 T 800 250"
                            stroke="url(#gradient3)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="2,8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 5, delay: 1.5 }}
                        />
                        
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Simple Mobile Background Lines */}
                    <svg className="absolute inset-0 w-full h-full md:hidden" style={{ zIndex: 1 }}>
                        <motion.path
                            d="M 20 100 Q 120 50 220 120 Q 300 180 380 140"
                            stroke="url(#mobileGradient1)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="3,3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                        <motion.path
                            d="M 50 250 Q 150 200 250 270 Q 320 320 400 280"
                            stroke="url(#mobileGradient2)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="2,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2.5, delay: 1 }}
                        />
                        
                        <defs>
                            <linearGradient id="mobileGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="mobileGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    {/* Header with Features */}
                    <motion.div 
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge - Fixed */}
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg border border-purple-200/50 dark:border-purple-700/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                                <Sparkles className="w-4 h-4" />
                            
                            How It Works

                        </motion.div>

                        <motion.h2 
                            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            How Our{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Commitment System
                                </span>

                            </span>{" "}
                            Works
                        </motion.h2>
                        
                        <motion.p 
                            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            A transparent and fair system that rewards commitment from both organizers and participants
                        </motion.p>

                        {/* Feature Pills */}
                        <motion.div 
                            className="flex flex-wrap justify-center gap-3 md:gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs md:text-sm font-medium"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <feature.icon className={`w-3 h-3 md:w-4 md:h-4 ${feature.color}`} />
                                    <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Timeline Layout - Mobile Optimized */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Central Vertical Line - Desktop Only */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden lg:block">
                            <motion.div 
                                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
                                initial={{ height: 0 }}
                                animate={isInView ? { height: "100%" } : { height: 0 }}
                                transition={{ duration: 2, delay: 1 }}
                            />
                        </div>

                        {/* Mobile Vertical Line - Clean and Simple */}
                        <div className="absolute left-6 top-12 w-0.5 lg:hidden" style={{ height: 'calc(100% - 6rem)' }}>
                            <motion.div 
                                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
                                initial={{ height: 0 }}
                                animate={isInView ? { height: "100%" } : { height: 0 }}
                                transition={{ duration: 2, delay: 1 }}
                            />
                        </div>

                        {/* Steps */}
                        <div className="space-y-6 md:space-y-12 lg:space-y-16">
                            {howItWorksSteps.map((item: IHowItWorksStep, index) => {
                                const isEven = index % 2 === 0;
                                
                                return (
                                    <motion.div
                                        key={item.step}
                                        className="relative"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.8, delay: 1 + index * 0.3 }}
                                    >
                                        {/* Mobile Layout - Simplified */}
                                        <div className="flex items-start gap-4 lg:hidden">
                                            {/* Step Circle - Mobile (NO PULSE) */}
                                            <motion.div 
                                                className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-10 flex-shrink-0"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                                transition={{ duration: 0.6, delay: 1.2 + index * 0.3 }}
                                            >
                                                <span className="text-white font-bold text-lg">{item.step}</span>
                                            </motion.div>

                                            {/* Content - Mobile */}
                                            <motion.div 
                                                className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-800"
                                                whileHover={{ y: -3 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                                        <item.icon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                            Step {item.step}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className={`hidden lg:flex items-center ${
                                            isEven ? 'flex-row' : 'flex-row-reverse'
                                        }`}>
                                            {/* Content Card - Desktop */}
                                            <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                                                <motion.div 
                                                    className="relative p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden group"
                                                    whileHover={{ y: -5, scale: 1.02 }}
                                                >
                                                    {/* Background Gradient */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    
                                                    {/* Corner Decoration */}
                                                    <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 ${isEven ? 'rounded-bl-3xl' : 'rounded-br-3xl'}`}></div>

                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                                                <item.icon className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                    Step {item.step}
                                                                </span>
                                                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                                                                    {item.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        
                                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                            {item.description}
                                                        </p>

                                                        {/* Progress Indicator */}
                                                        <div className="mt-6 flex items-center gap-2">
                                                            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                                <motion.div 
                                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                                    initial={{ width: 0 }}
                                                                    animate={isInView ? { width: `${(index + 1) * 33.33}%` } : { width: 0 }}
                                                                    transition={{ duration: 1, delay: 1.5 + index * 0.3 }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                                {Math.round((index + 1) * 33.33)}% 
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Central Circle - Desktop (NO PULSE) */}
                                            <div className="w-2/12 flex flex-col items-center">
                                                {/* Step Number Above Line */}
                                                <motion.div 
                                                    className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl z-10 mb-2"
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                                    transition={{ duration: 0.6, delay: 1.2 + index * 0.3 }}
                                                >
                                                    <span className="text-white font-bold text-xl">{item.step}</span>
                                                </motion.div>
                                            </div>

                                            {/* Illustration Side - Desktop */}
                                            <div className={`w-5/12 ${isEven ? 'pl-8' : 'pr-8'}`}>
                                                <motion.div 
                                                    className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center overflow-hidden"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.6, delay: 1.3 + index * 0.3 }}
                                                >
                                                    {/* Floating Elements */}
                                                    <motion.div 
                                                        className="absolute top-3 left-3 w-2 h-2 bg-blue-400 rounded-full"
                                                        animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                                    />
                                                    <motion.div 
                                                        className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full"
                                                        animate={{ y: [0, -6, 0], opacity: [0.3, 0.8, 0.3] }}
                                                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 + 0.5 }}
                                                    />
                                                    <motion.div 
                                                        className="absolute top-1/2 right-3 w-3 h-3 bg-pink-400 rounded-full"
                                                        animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
                                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 + 1 }}
                                                    />

                                                    {/* Central Icon */}
                                                    <motion.div 
                                                        className="w-12 h-12 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center shadow-lg"
                                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                                    >
                                                        <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary Section - Compact */}
                    <motion.div 
                        className="text-center mt-12 md:mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 2.5 }}
                    >
                        <div className="max-w-2xl mx-auto p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl md:rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                                Fair Rewards for Everyone
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                Both organizers and participants earn USDC rewards based on their actual participation. 
                                The more sessions you complete, the higher your cashback percentage.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}