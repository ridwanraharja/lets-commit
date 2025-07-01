import { Sparkles } from "lucide-react";
import { visionPoints } from "../constants/visionpoints";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OurVision() {
    // Refs untuk setiap section
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    // Create refs array for all cards OUTSIDE of map
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // useInView hooks
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-50px" });
    const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

    // Create individual useInView hooks for each card
    const cardInViewStates = visionPoints.map((_, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const cardRef = useRef<HTMLDivElement>(null);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isInView = useInView(cardRef, { once: true, margin: "-50px" });
        
        // Store ref in array
        cardRefs.current[index] = cardRef.current;
        
        return { cardRef, isInView };
    });

    return (
        <>
            {/* Vision Section - Enhanced */}
            <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header Section */}
                    <div ref={headerRef} className="text-center mb-16 md:mb-20">
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-4 py-2 rounded-full font-medium shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Sparkles className="w-4 h-4" />
                            Our Vision
                        </motion.div>
                        
                        <motion.h2 
                            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            The Future of{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Commitment-Based
                            </span>{" "}
                            Learning
                        </motion.h2>
                        
                        <motion.p 
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            We believe that the best learning happens when there's genuine commitment. 
                            By combining blockchain technology with behavioral psychology, we create an 
                            ecosystem where everyone can reach their maximum potential.
                        </motion.p>
                    </div>

                    {/* Enhanced Timeline Design */}
                    <div ref={timelineRef} className="relative max-w-5xl mx-auto mb-16 md:mb-20">
                        {/* Animated Timeline line */}
                        <motion.div 
                            className="absolute left-6 md:left-8 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                            initial={{ height: 0 }}
                            animate={isTimelineInView ? { height: "100%" } : { height: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                        
                        {/* Timeline dots animation */}
                        <motion.div 
                            className="absolute left-4 md:left-6 top-0 w-5 h-5 bg-blue-500 rounded-full shadow-lg animate-pulse"
                            initial={{ scale: 0 }}
                            animate={isTimelineInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        />
                        
                        <div className="space-y-8 md:space-y-12">
                            {visionPoints.map((point, index) => {
                                const { cardRef, isInView: isCardInView } = cardInViewStates[index];
                                
                                return (
                                    <motion.div
                                        key={index}
                                        ref={cardRef}
                                        className="relative flex items-start gap-6 md:gap-8 group"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                    >
                                        {/* Enhanced Timeline dot with number */}
                                        <div className="relative flex-shrink-0">
                                            <motion.div 
                                                className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-white dark:border-gray-800"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={isCardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <point.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                                            </motion.div>
                                            
                                            {/* Step number */}
                                            <motion.div 
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400"
                                                initial={{ scale: 0 }}
                                                animate={isCardInView ? { scale: 1 } : { scale: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                                            >
                                                {index + 1}
                                            </motion.div>
                                        </div>
                                        
                                        {/* Enhanced Content Card */}
                                        <motion.div 
                                            className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 overflow-hidden relative"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                                            whileHover={{ y: -4 }}
                                        >
                                            {/* Background gradient on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            {/* Top decorative element */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-3xl" />
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                                        {point.title}
                                                    </h3>
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base mb-4">
                                                    {point.description}
                                                </p>
                                                
                                                {/* Progress indicator */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={isCardInView ? { width: "100%" } : { width: 0 }}
                                                            transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                        Step {index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        
                        {/* End dot */}
                        <motion.div 
                            className="absolute left-4 md:left-6 bottom-0 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
                            initial={{ scale: 0 }}
                            animate={isTimelineInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.5, delay: visionPoints.length * 0.2 + 1 }}
                        />
                    </div>

                    {/* Enhanced CTA Section */}
                    <motion.div 
                        ref={ctaRef}
                        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80">
                            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <div className="absolute top-12 left-8 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                                <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-2 mb-6 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
                                    <Sparkles className="w-4 h-4" />
                                    Ready to Begin?
                                </div>
                                
                                <h3 className="text-2xl md:text-4xl font-bold mb-4">
                                    Transform Your Learning{" "}
                                    <span className="text-yellow-300">Today</span>
                                </h3>
                                
                                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Join thousands who have already started their commitment-based learning journey. 
                                    Your transformation begins with a single step.
                                </p>
                            </motion.div>
                            
                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Link
                                    to="/about"
                                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Start Your Journey
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/join-community"
                                    className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                                >
                                    Explore Features
                                </Link>
                            </motion.div>
                            
                            {/* Stats */}
                            <motion.div 
                                className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20"
                                initial={{ opacity: 0 }}
                                animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                {[
                                    { number: "10K+", label: "Active Learners" },
                                    { number: "95%", label: "Success Rate" },
                                    { number: "50+", label: "Countries" }
                                ].map((stat, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                    >
                                        <div className="text-2xl md:text-3xl font-bold text-yellow-300">
                                            {stat.number}
                                        </div>
                                        <div className="text-blue-100 text-sm">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}