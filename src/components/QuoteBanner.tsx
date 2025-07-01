import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function QuoteBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <>
            {/* Quote Banner - More Compact */}
            <section 
                ref={sectionRef}
                className="py-10 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div 
                        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center text-white shadow-2xl overflow-hidden max-w-3xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    >
                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0">
                            {/* Base Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-pink-600/95" />
                            
                            {/* Animated Grid Pattern */}
                            <motion.div 
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                                    backgroundSize: '25px 25px'
                                }}
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Moving Gradient Overlay */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                        
                        {/* Enhanced Floating Particles */}
                        <div className="absolute inset-0 opacity-40">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-white rounded-full"
                                    style={{
                                        width: Math.random() * 2 + 1,
                                        height: Math.random() * 2 + 1,
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, -15, 0],
                                        x: [0, Math.random() * 8 - 4, 0],
                                        opacity: [0.3, 0.8, 0.3],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: Math.random() * 3 + 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Improved Decorative Blurs */}
                        <motion.div 
                            className="absolute top-2 left-2 w-12 md:w-16 h-12 md:h-16 bg-white/10 rounded-full blur-xl"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.15, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div 
                            className="absolute bottom-2 right-2 w-16 md:w-20 h-16 md:h-20 bg-white/10 rounded-full blur-2xl"
                            animate={{ 
                                scale: [1.1, 1, 1.1],
                                opacity: [0.15, 0.1, 0.15]
                            }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        />

                        {/* Content */}
                        <div className="relative z-10 space-y-4 md:space-y-5">
                            {/* Main Quote - Enhanced Animation */}
                            <motion.h2 
                                className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold max-w-2xl mx-auto leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.span 
                                    className="text-yellow-300 font-semibold"
                                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
                                    transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                                >
                                    "Commit to Win"
                                </motion.span>
                                <span className="text-white/80 font-medium"> - </span>
                                <span className="text-white font-semibold">Get your money back by completing what you </span>
                                <span className="relative text-yellow-300 font-semibold">
                                    started
                                    <motion.div 
                                        className="absolute -bottom-0.5 left-0 w-full h-0.5 md:h-1 bg-yellow-300 rounded-full"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={isInView ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
                                        transition={{ duration: 1.2, delay: 0.8 }}
                                    />
                                    <motion.div 
                                        className="absolute -bottom-0.5 left-0 w-full h-0.5 md:h-1 bg-yellow-200 rounded-full blur-sm"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={isInView ? { width: "100%", opacity: 0.6 } : { width: 0, opacity: 0 }}
                                        transition={{ duration: 1.2, delay: 0.9 }}
                                    />
                                </span>
                                <span className="text-white font-semibold">.</span>
                            </motion.h2>

                            {/* Supporting Text - Enhanced */}
                            <motion.p 
                                className="text-sm md:text-base text-blue-100 max-w-xl mx-auto leading-relaxed font-medium"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                Put your money where your commitment is. Complete your learning journey and get a{" "}
                                <motion.span 
                                    className="text-yellow-200 font-semibold"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    full refund
                                </motion.span>
                                {" "}- it's our way of betting on your success.
                            </motion.p>

                            {/* Decorative Elements - Smaller */}
                            <motion.div 
                                className="flex justify-center items-center gap-1.5 mt-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5 bg-yellow-300 rounded-full"
                                        animate={{ 
                                            scale: [1, 1.2, 1],
                                            opacity: [0.6, 1, 0.6]
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            delay: i * 0.3 
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Enhanced Corner Decorations - Smaller */}
                        <motion.div 
                            className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-yellow-300/30 rounded-tl-2xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.div 
                            className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-yellow-300/30 rounded-br-2xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />

                        {/* Bottom Glow Effect */}
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : { width: 0 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                        />
                    </motion.div>
                </div>
            </section>
        </>
    );
}