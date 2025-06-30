import { testimonials } from "../constants/testimonials";
import { Star, Quote, CheckCircle, Award } from "lucide-react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";

// Type definitions
interface Testimonial {
    id: string | number;
    name: string;
    role: string;
    company: string;
    text: string;
    image: string;
    rating: number;
    course: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
    cardWidth: number;
}

export default function Testimonials() {
    // Create enough duplicates for seamless infinite scroll
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    const controls = useAnimationControls();
    const animationRef = useRef<HTMLDivElement>(null);

    // Responsive card dimensions and speed
    const getResponsiveSettings = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width >= 1024) { // Desktop/PC
                return { 
                    cardWidth: 380, 
                    gap: 24, 
                    pixelsPerSecond: 60 // Slower for desktop
                };
            } else if (width >= 768) { // Tablet
                return { 
                    cardWidth: 320, 
                    gap: 20, 
                    pixelsPerSecond: 50 // Medium speed for tablet
                };
            } else { // Mobile
                return { 
                    cardWidth: 280, 
                    gap: 16, 
                    pixelsPerSecond: 40 // Slowest for mobile
                };
            }
        }
        return { cardWidth: 380, gap: 24, pixelsPerSecond: 60 }; // Default
    };

    const [settings, setSettings] = useState(getResponsiveSettings());
    const { cardWidth, gap, pixelsPerSecond } = settings;
    const totalCardWidth = cardWidth + gap;
    const originalSetWidth = testimonials.length * totalCardWidth;

    // Update settings on window resize
    useEffect(() => {
        const handleResize = () => {
            setSettings(getResponsiveSettings());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Start infinite animation - continuous without pause
    const startAnimation = useCallback(() => {
        const duration = originalSetWidth / pixelsPerSecond;

        controls.start({
            x: [0, -originalSetWidth],
            transition: {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
            }
        });
    }, [originalSetWidth, pixelsPerSecond, controls]);

    // Start animation on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            startAnimation();
        }, 500);

        return () => {
            clearTimeout(timer);
            controls.stop();
        };
    }, [startAnimation]);

    // Restart animation when settings change
    useEffect(() => {
        controls.stop();
        const timer = setTimeout(() => {
            startAnimation();
        }, 100);

        return () => clearTimeout(timer);
    }, [settings, startAnimation]);

    // Handle visibility change (pause when tab is not visible)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                controls.stop();
            } else {
                startAnimation();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [startAnimation]);

    return (
        <>
            {/* Testimonials Section - Enhanced with Motion */}
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div 
                            className="inline-flex items-center gap-2 mb-4 md:mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold shadow-xl border border-blue-200/50 dark:border-blue-700/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Star className="w-3 h-3 md:w-4 md:h-4" />
                            Testimonials
                        </motion.div>
                        <motion.h2 
                            className="text-2xl md:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Apa Kata Mereka?
                        </motion.h2>
                        <motion.p 
                            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Dengarkan pengalaman nyata dari learners yang telah merasakan
                            manfaat sistem commitment-based learning kami
                        </motion.p>
                    </div>

                    {/* Moving Testimonials Container */}
                    <div className="relative py-4 md:py-6 lg:py-8">
                        {/* Animated scrolling wrapper */}
                        <motion.div
                            ref={animationRef}
                            className="flex will-change-transform testimonial-wrapper"
                            animate={controls}
                            initial={{ x: 0 }}
                            style={{
                                gap: `${gap}px`,
                                width: `${duplicatedTestimonials.length * totalCardWidth}px`,
                            }}
                        >
                            {duplicatedTestimonials.map((testimonial, index) => {
                                // Calculate which set this card belongs to (0, 1, or 2)
                                const setIndex = Math.floor(index / testimonials.length);
                                // Calculate position within the set
                                const positionInSet = index % testimonials.length;
                                
                                return (
                                    <TestimonialCard
                                        key={`${testimonial.id}-set${setIndex}-${positionInSet}`}
                                        testimonial={testimonial}
                                        index={index}
                                        cardWidth={cardWidth}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Enhanced info section */}
                    <motion.div 
                        className="text-center mt-12 md:mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                            <motion.div 
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Moving at {pixelsPerSecond}px/sec - Smooth scroll
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

// Optimized testimonial card component with consistent sizing
const TestimonialCard = React.memo<TestimonialCardProps>(({ testimonial, cardWidth }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
        once: false,
        margin: "-20px"
    });

    return (
        <motion.div
            ref={ref}
            className="group flex-shrink-0 relative will-change-transform"
            whileHover={{ 
                scale: 1.02,
                y: -6,
                transition: { 
                    duration: 0.2,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }
            }}
            style={{
                backfaceVisibility: 'hidden',
                width: `${cardWidth}px`,
                minHeight: '320px' // Consistent minimum height for all cards
            }}
        >
            {/* Card with consistent design across all screen sizes */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden h-full p-6">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                {/* Top decorative element - consistent size */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-2xl md:rounded-bl-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                    {/* Header with user info - consistent spacing */}
                    <div className="flex items-center mb-5">
                        <motion.div
                            className="relative flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.15 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                alt={testimonial.name}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-lg"
                                loading="lazy"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                <CheckCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                        </motion.div>
                        <div className="flex-1 ml-3 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1 truncate">
                                {testimonial.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm truncate">
                                {testimonial.role}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold truncate">
                                {testimonial.company}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                    transition={{ 
                                        duration: 0.25,
                                        delay: isInView ? (i * 0.05) : 0,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25
                                    }}
                                >
                                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 fill-current drop-shadow-sm" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quote section - flexible height */}
                    <div className="relative flex-1 mb-5">
                        <Quote className="absolute -top-2 -left-2 w-7 h-7 md:w-8 md:h-8 text-blue-500/20 dark:text-blue-400/20" />
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-900/50 dark:to-blue-900/20 rounded-xl md:rounded-2xl h-full flex items-center p-4 ml-3">
                            <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed font-medium text-xs md:text-sm line-clamp-4">
                                "{testimonial.text}"
                            </p>
                        </div>
                    </div>

                    {/* Course badge - consistent bottom section */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                                <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Course Completed</p>
                                <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold truncate">
                                    {testimonial.course}
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                            <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

TestimonialCard.displayName = 'TestimonialCard';